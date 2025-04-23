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
	go test -coverprofile=coverage.out ./...
	# go tool cover -html=coverage.out -o coverage.html
	@echo "Test run complete!"

clean:
	@echo "Cleaning up..."
	rm -rf public
	for d in $(shell ls functions); do rm -rf functions/$$d; done
	@echo "Cleaned up successfully!"