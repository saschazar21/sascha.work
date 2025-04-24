package utils

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestResponse(t *testing.T) {
	type test struct {
		name   string
		data   any
		errors *[]ResponseError
	}

	tests := []test{
		{
			name:   "Valid Response",
			data:   map[string]string{"key": "value"},
			errors: nil,
		},
		{
			name: "Error Response",
			data: nil,
			errors: &[]ResponseError{
				{
					Detail: nil,
					Status: "500",
					Title:  "Internal Server Error",
				},
			},
		},
		{
			name: "Error with Detail",
			data: nil,
			errors: &[]ResponseError{
				{
					Detail: nil,
					Status: "400",
					Title:  "Bad Request",
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := httptest.NewRequest("GET", "http://example.com", nil)
			response := NewJSONAPIResponse(r, tt.data, tt.errors)
			if response.Errors != tt.errors {
				t.Errorf("Expected errors %v, got %v", tt.errors, response.Errors)
			}

			w := httptest.NewRecorder()
			response.WriteResponse(w)

			assert.Equal(t, "application/vnd.api+json", w.Header().Get("Content-Type"))
			assert.Equal(t, "1.0", response.JsonApi.Version)

			if tt.errors != nil && len(*tt.errors) > 0 {
				assert.Equal(t, (*tt.errors)[0].Status, fmt.Sprintf("%d", w.Code))
			} else {
				assert.Equal(t, http.StatusOK, w.Code)
			}
		})
	}
}
