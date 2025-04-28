export GITHUB_TOKEN

.PHONY: test clean

build: build_website
	@echo "Compiling Go functions..."
	sh -c ./build.sh

build_website:
	@echo "Building website..."
	mkdir -p public
	npm run build
	@echo "Website built successfully!"

test:
	@echo "Running tests..."
	mkdir -p coverage
	go test -coverprofile=coverage/coverage.out ./...
	go tool cover -html=coverage/coverage.out -o coverage/index.html
	@echo "Test run complete!"

clean:
	@echo "Cleaning up..."
	rm -rf public coverage
	for d in $(shell ls functions); do rm -rf functions/$$d; done
	@echo "Cleaned up successfully!"