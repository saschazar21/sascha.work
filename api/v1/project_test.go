package v1

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"testing"

	"github.com/jarcoal/httpmock"
	"github.com/saschazar21/sascha.work/api/v1/utils"
	"github.com/stretchr/testify/assert"
)

func TestProject(t *testing.T) {
	tests := []struct {
		name       string
		method     string
		owner      string
		repository string
		mock       string
		token      string
		status     string
		wantErr    bool
	}{
		{
			name:       "Valid Response",
			method:     "GET",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       `{"data":{"repository":{"url":"https://github.com/saschazar21/sascha.work","description":"The repository of my personal website","homepageUrl":"https://sascha.work","languages":{"edges":[{"node":{"name":"CSS","color":"#663399"},"size":40472},{"node":{"name":"Nunjucks","color":"#3d8137"},"size":34289},{"node":{"name":"TypeScript","color":"#3178c6"},"size":23304},{"node":{"name":"JavaScript","color":"#f1e05a"},"size":12630},{"node":{"name":"HTML","color":"#e34c26"},"size":10177}]},"name":"sascha.work","pushedAt":"2025-04-23T14:03:49Z","releases":{"nodes":[{"tagName":"v3.0.0","name":"v3.0.0","publishedAt":"2025-04-18T12:00:58Z"}]},"stargazerCount":1}}}`,
			token:      "valid-token",
			status:     "200",
			wantErr:    false,
		},
		{
			name:       "Missing API Token",
			method:     "GET",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": {\"description\": \"A test repository\", \"homepageUrl\": \"https://example.com\", \"languages\": {\"edges\": [{\"color\": \"#f00\", \"name\": \"Go\", \"size\": 100}]}, \"name\": \"test-repo\", \"releases\": {\"nodes\": [{\"name\": \"v1.0.0\", \"publishedAt\": \"2023-01-01T00:00:00Z\", \"tagName\": \"v1.0.0\"}]}, \"stargazersCount\": 10, \"url\": \"https://test.example.com\"}}}",
			token:      "",
			status:     "500",
			wantErr:    true,
		},
		{
			name:       "Invalid HTTP Method",
			method:     "POST",
			owner:      "saschazar21",
			repository: "test-repo",
			mock:       "{\"data\": {\"repository\": {\"description\": \"A test repository\", \"homepageUrl\": \"https://example.com\", \"languages\": {\"edges\": [{\"color\": \"#f00\", \"name\": \"Go\", \"size\": 100}]}, \"name\": \"test-repo\", \"releases\": {\"nodes\": [{\"name\": \"v1.0.0\", \"publishedAt\": \"2023-01-01T00:00:00Z\", \"tagName\": \"v1.0.0\"}]}, \"stargazersCount\": 10, \"url\": \"https://test.example.com\"}}}",
			token:      "valid-token",
			status:     "405",
			wantErr:    true,
		},
		{
			name:       "Empty repository",
			method:     "GET",
			owner:      "saschazar21",
			repository: "",
			mock:       "{\"data\": {\"repository\": null}}",
			token:      "valid-token",
			status:     "404",
			wantErr:    true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			os.Setenv(utils.GITHUB_TOKEN, tt.token)
			defer os.Unsetenv(utils.GITHUB_TOKEN)

			u, _ := url.Parse("/api/v1/project/" + tt.owner + "/" + tt.repository + "/")
			// Mock the HTTP request and response
			req := &http.Request{
				Method: tt.method,
				URL:    u,
			}

			w := httptest.NewRecorder()

			// Mock the HTTP response
			httpmock.Activate()
			defer httpmock.DeactivateAndReset()
			httpmock.RegisterResponder("POST", utils.GITHUB_GRAPHQL_API,
				httpmock.NewStringResponder(200, tt.mock))

			// Call the function to test
			HandleProject(w, req)

			// Check the response status code
			if (w.Code != http.StatusOK && !tt.wantErr) || (w.Code == http.StatusOK && tt.wantErr) {
				t.Errorf("HandleRepo() = %v, want %v", w.Code, tt.status)
			}

			// Check the response body
			var response utils.JSONAPIResponse[*utils.Repository]
			if err := json.NewDecoder(w.Body).Decode(&response); err != nil {
				t.Errorf("Failed to decode response: %v", err)
			}
			if response.Errors != nil && len(*response.Errors) > 0 {
				if (*response.Errors)[0].Status != tt.status {
					t.Errorf("HandleRepo() = %v, want %v", (*response.Errors)[0].Status, tt.status)
				}
			} else if response.Data == nil && !tt.wantErr {
				t.Errorf("HandleRepo() = %v, want %v", response.Data, tt.status)
			}

			if !tt.wantErr {
				assert.NotNil(t, response.Data, "Response data should not be nil")
				assert.NotNil(t, response.Data.Release, "Release data should not be nil")
				assert.NotEmpty(t, response.Data.PushedAt, "PushedAt should not be empty")
				assert.Equal(t, "sascha.work", response.Data.Name, "Repository name should match")
			}
		})
	}
}
