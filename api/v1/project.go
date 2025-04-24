package v1

import (
	"log"
	"net/http"
	"strings"

	"github.com/saschazar21/sascha.work/api/v1/utils"
)

func parseRepositoryFromPath(r *http.Request) (string, string) {
	// Parse the repository name and owner from the URL path
	// Example: /api/v1/repo/saschazar21/repo-name
	path := r.URL.Path
	parts := strings.Split(path, "/")

	// Filter out empty strings
	var filtered = []string{}
	for _, part := range parts {
		if part != "" {
			filtered = append(filtered, part)
		}
	}
	parts = filtered

	if len(parts) < 5 {
		return "", ""
	}

	owner := parts[len(parts)-2]
	repoName := parts[len(parts)-1]

	return owner, repoName
}

func HandleProject(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		errors := []utils.ResponseError{
			{
				Detail: nil,
				Status: "405",
				Title:  "Method Not Allowed",
			},
		}
		w.Header().Set("Allow", "GET")
		response := utils.NewJSONAPIResponse[any](r, nil, &errors)
		response.WriteResponse(w)

		log.Printf("Method Not Allowed: %s \n", r.Method)
		return
	}

	owner, repoName := parseRepositoryFromPath(r)

	data, err := utils.GetRepository(owner, repoName)

	if err != nil {
		responseErr := err.(utils.ResponseError)
		response := utils.NewJSONAPIResponse[any](r, nil, &[]utils.ResponseError{responseErr})
		response.WriteResponse(w)

		log.Printf("Error: %s \n", err)
		return
	}

	// Add caching header for 24 hours
	w.Header().Set("Cache-Control", "public, s-maxage=86400, max-age=86400")
	w.Header().Set("CDN-Cache-Control", "public, s-maxage=86400, max-age=86400, stale-while-revalidate=172800")
	w.Header().Set("Netlify-CDN-Cache-Control", "public, durable, s-maxage=86400, stale-while-revalidate=172800")

	response := utils.NewJSONAPIResponse(r, data, nil)
	response.WriteResponse(w)
	log.Printf("Data successfully fetched for repository: %s/%s \n", owner, repoName)
}
