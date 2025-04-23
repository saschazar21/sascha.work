package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strconv"
)

const (
	CONTEXT    = "CONTEXT"
	DEPLOY_URL = "DEPLOY_URL"
	PRODUCTION = "production"
	URL        = "URL"
)

type ResponseError struct {
	Detail *string `json:"detail"`
	Status string  `json:"status"`
	Title  string  `json:"title"`
}

func (r ResponseError) Error() string {
	if r.Detail != nil {
		return fmt.Sprintf("Error %s, Title: %s, Detail: %s", r.Status, r.Title, *r.Detail)
	}
	return fmt.Sprintf("Error %s, Title: %s", r.Status, r.Title)
}

type JSONAPIResponse[T any] struct {
	Data    T                `json:"data"`
	Errors  *[]ResponseError `json:"errors"`
	JsonApi struct {
		Version string `json:"version"`
	} `json:"jsonapi"`
	Links struct {
		Self    string `json:"self"`
		Related string `json:"related"`
	} `json:"links"`
}

func (r *JSONAPIResponse[T]) WriteResponse(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/vnd.api+json")
	if r.Errors != nil && len(*r.Errors) > 0 {
		statusCode, err := strconv.Atoi((*r.Errors)[0].Status)
		if err != nil {
			statusCode = http.StatusInternalServerError
		}
		w.WriteHeader(statusCode)
	} else {
		w.WriteHeader(http.StatusOK)
	}
	if err := json.NewEncoder(w).Encode(r); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func NewJSONAPIResponse[T any](r *http.Request, data T, errors *[]ResponseError) JSONAPIResponse[T] {
	context := os.Getenv(CONTEXT)
	origin := os.Getenv(DEPLOY_URL)

	if context == PRODUCTION {
		origin = os.Getenv(URL)
	}

	self, _ := url.Parse(origin + r.URL.Path)

	return JSONAPIResponse[T]{
		Data:   data,
		Errors: errors,
		JsonApi: struct {
			Version string `json:"version"`
		}{
			Version: "1.0",
		},
		Links: struct {
			Self    string `json:"self"`
			Related string `json:"related"`
		}{
			Self:    self.String(),
			Related: origin,
		},
	}
}
