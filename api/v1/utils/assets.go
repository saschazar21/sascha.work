package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func fetchAsset(path string) (io.ReadCloser, error) {
	// Fetch static asset path from website (e.g. fonts, images, etc...)
	req, err := http.NewRequest("GET", URL+path, nil)

	if err != nil {
		return nil, fmt.Errorf("failed to create request for fetching asset \"%s\"", path)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch asset \"%s\": %w", path, err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch asset \"%s\": received HTTP Status %s", path, resp.Status)
	}

	return resp.Body, nil
}

func FetchAsset(path string) ([]byte, error) {
	body, err := fetchAsset(path)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer body.Close()

	var respBody []byte

	// Read the response body into a byte slice
	respBody, err = io.ReadAll(body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body for asset \"%s\": %w", path, err)
	}

	return respBody, nil
}

func FetchJSON[T any](path string) (*JSONAPIResponse[T], error) {
	body, err := fetchAsset(path)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer body.Close()

	var respBody JSONAPIResponse[T]
	if err := json.NewDecoder(body).Decode(&respBody); err != nil {
		return nil, fmt.Errorf("failed to decode JSON \"%s\": %w", path, err)
	}

	return &respBody, nil
}
