package utils

import (
	"os"
	"testing"

	"github.com/jarcoal/httpmock"
	"github.com/stretchr/testify/assert"
)

func TestRepository(t *testing.T) {
	type test struct {
		name       string
		owner      string
		repository string
		mock       string
		token      string
		status     string
		wantErr    bool
	}

	tests := []test{
		{
			name:       "Valid Repository",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": {\"description\": \"A test repository\", \"homepageUrl\": \"https://example.com\", \"languages\": {\"edges\": [{\"color\": \"#f00\", \"name\": \"Go\", \"size\": 100}]}, \"name\": \"test-repo\", \"owner\": { \"login\": \"saschazar21\" }, \"pushedAt\": \"1970-01-01T00:00:00.000Z\", \"releases\": {\"nodes\": [{\"name\": \"v1.0.0\", \"publishedAt\": \"2023-01-01T00:00:00Z\", \"tagName\": \"v1.0.0\"}]}, \"stargazersCount\": 10, \"url\": \"https://test.example.com\"}}}",
			token:      "valid-token",
			status:     "200",
			wantErr:    false,
		},
		{
			name:       "Missing API Token",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": {\"description\": \"A test repository\", \"homepageUrl\": \"https://example.com\", \"languages\": {\"edges\": [{\"color\": \"#f00\", \"name\": \"Go\", \"size\": 100}]}, \"name\": \"test-repo\", \"releases\": {\"nodes\": [{\"name\": \"v1.0.0\", \"publishedAt\": \"2023-01-01T00:00:00Z\", \"tagName\": \"v1.0.0\"}]}, \"stargazersCount\": 10, \"url\": \"https://test.example.com\"}}}",
			token:      "",
			status:     "500",
			wantErr:    true,
		},
		{
			name:       "Error Response",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": null}, \"errors\": [{\"message\": \"Not Found\"}]}",
			token:      "valid-token",
			status:     "500",
			wantErr:    true,
		},
		{
			name:       "Inexistent Repository",
			owner:      "saschazar21",
			repository: "nonexistent-repo",
			mock:       "{\"data\": {\"repository\": null}}",
			token:      "valid-token",
			status:     "404",
			wantErr:    true,
		},
		{
			name:       "Invalid JSON Response",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": null}, \"errors\": [{\"message\": \"Not Found\"}",
			token:      "valid-token",
			status:     "500",
			wantErr:    true,
		},
		{
			name:       "Invalid owner",
			owner:      "invalid-owner",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": null}, \"errors\": [{\"message\": \"Not Found\"}]}",
			token:      "valid-token",
			status:     "404",
			wantErr:    true,
		},
		{
			name:       "Empty owner",
			owner:      "",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": null}, \"errors\": [{\"message\": \"Not Found\"}]}",
			token:      "valid-token",
			status:     "404",
			wantErr:    true,
		},
		{
			name:       "Empty repo",
			owner:      "saschazar21",
			repository: "",
			mock:       "{\"data\": {\"repository\": null}, \"errors\": [{\"message\": \"Not Found\"}]}",
			token:      "valid-token",
			status:     "404",
			wantErr:    true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			os.Setenv(GITHUB_TOKEN, tt.token)

			httpmock.Activate()
			defer httpmock.DeactivateAndReset()

			httpmock.RegisterResponder("POST", "https://api.github.com/graphql",
				httpmock.NewStringResponder(200, tt.mock))

			repository, err := GetRepository(tt.owner, tt.repository)

			if (err != nil) != tt.wantErr {
				t.Errorf("GetRepository() error = %v, wantErr %v", err, tt.wantErr)
				return
			}

			if err == nil {
				assert.Equal(t, "A test repository", repository.Description)
				assert.Equal(t, "https://example.com", *repository.HomepageUrl)
				assert.Equal(t, "test-repo", repository.Name)
				assert.Equal(t, "saschazar21", repository.Owner)
				assert.Equal(t, "1970-01-01T00:00:00.000Z", repository.PushedAt)
				assert.Equal(t, "https://test.example.com", repository.Url)
				assert.Equal(t, 10, repository.StargazersCount)
			} else {
				e, ok := err.(ResponseError)

				if !ok {
					t.Errorf("Expected RepositoryResponseError, got %T", err)
					return
				}

				assert.Nil(t, repository)
				assert.Equal(t, e.Status, tt.status)
			}
		})
	}
}
