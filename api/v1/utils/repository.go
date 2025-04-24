package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"os"
)

const (
	GITHUB_GRAPHQL_API = "https://api.github.com/graphql"
	GITHUB_TOKEN       = "GITHUB_TOKEN"
)

const REPOSITORY_QUERY = `query repository($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    url
    description
    homepageUrl
    languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
      edges {
        node {
          name
          color
        }
        size
      }
    }
    name
    pushedAt
    releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
      nodes {
        tagName
        name
        publishedAt
      }
    }
    stargazerCount
  }
}`

var WHITELISTED_OWNERS = []string{
	"saschazar21",
	"vorchdorf-dot-media",
}

type GitHubLanguageEdgeNode struct {
	Color string `json:"color"`
	Name  string `json:"name"`
}

type GitHubLanguageEdge struct {
	Node GitHubLanguageEdgeNode `json:"node"`
	Size int                    `json:"size"`
}

type GitHubLanguage struct {
	Edges *[]GitHubLanguageEdge `json:"edges"`
}

type GitHubReleaseNode struct {
	Name        string `json:"name"`
	PublishedAt string `json:"publishedAt"`
	TagName     string `json:"tagName"`
}

type GitHubRelease struct {
	Nodes *[]GitHubReleaseNode `json:"nodes"`
}

type GitHubRepository struct {
	Description string         `json:"description"`
	HomepageUrl *string        `json:"homepageUrl"`
	Languages   GitHubLanguage `json:"languages"`
	Name        string         `json:"name"`
	Owner       struct {
		Login string `json:"login"`
	} `json:"owner"`
	Releases        GitHubRelease `json:"releases"`
	PushedAt        string        `json:"pushedAt"`
	StargazersCount int           `json:"stargazersCount"`
	Url             string        `json:"url"`
}

type GitHubRepositoryGraphQLQuery struct {
	Query     string `json:"query"`
	Variables struct {
		Owner string `json:"owner"`
		Name  string `json:"name"`
	} `json:"variables"`
}

type ParsedGitHubLanguageEdge struct {
	Color string `json:"color"`
	Name  string `json:"name"`
	Size  int    `json:"size"`
}

type Repository struct {
	Description     string                      `json:"description"`
	HomepageUrl     *string                     `json:"homepageUrl"`
	Languages       *[]ParsedGitHubLanguageEdge `json:"languages"`
	Name            string                      `json:"name"`
	Owner           string                      `json:"owner"`
	PushedAt        string                      `json:"pushedAt"`
	Release         *GitHubReleaseNode          `json:"release"`
	StargazersCount int                         `json:"stargazersCount"`
	Url             string                      `json:"url"`
}

func fetchRepositoryFromGitHubAPI(owner string, name string) (*GitHubRepository, error) {
	if os.Getenv(GITHUB_TOKEN) == "" {
		detail := "GITHUB_TOKEN is not set"
		return nil, ResponseError{
			Detail: &detail,
			Status: "500",
			Title:  "Internal Server Error",
		}
	}

	// Create a new HTTP request
	payload := GitHubRepositoryGraphQLQuery{
		Query: REPOSITORY_QUERY,
		Variables: struct {
			Owner string `json:"owner"`
			Name  string `json:"name"`
		}{
			Owner: owner,
			Name:  name,
		},
	}
	// Convert the payload to JSON
	body, err := json.Marshal(payload)
	if err != nil {
		detail := err.Error()
		return nil, ResponseError{
			Detail: &detail,
			Status: "500",
			Title:  "Internal Server Error",
		}
	}

	// Create a new request with the JSON payload
	req, err := http.NewRequest("POST", GITHUB_GRAPHQL_API, bytes.NewBuffer(body))

	if err != nil {
		detail := err.Error()
		return nil, ResponseError{
			Detail: &detail,
			Status: "500",
			Title:  "Internal Server Error",
		}
	}

	// Set the request headers
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", os.Getenv(GITHUB_TOKEN)))
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		detail := err.Error()
		return nil, ResponseError{
			Detail: &detail,
			Status: "500",
			Title:  "Internal Server Error",
		}
	}

	respBody, err := io.ReadAll(resp.Body)

	if err != nil {
		detail := err.Error()
		return nil, ResponseError{
			Detail: &detail,
			Status: "500",
			Title:  "Internal Server Error",
		}
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("GitHub API Error Response:\n%s", string(respBody))
		return nil, ResponseError{
			Detail: nil,
			Status: fmt.Sprintf("%d", resp.StatusCode),
			Title:  "GitHub API Response Error",
		}
	}

	// Parse the response
	var result struct {
		Data struct {
			GitHubRepository *GitHubRepository `json:"repository"`
		} `json:"data"`
		Errors *[]struct {
			Message string `json:"message"`
		} `json:"errors"`
	}

	err = json.Unmarshal(respBody, &result)
	if err != nil {
		detail := "Error parsing GitHub API response"
		return nil, ResponseError{
			Detail: &detail,
			Status: "500",
			Title:  "Internal Server Error",
		}
	}

	if result.Errors != nil && len(*result.Errors) > 0 {
		return nil, ResponseError{
			Detail: &(*result.Errors)[0].Message,
			Status: "500",
			Title:  "GitHub API Response Error",
		}
	}

	return result.Data.GitHubRepository, nil
}

func mapLanguages(languages *[]GitHubLanguageEdge) *[]ParsedGitHubLanguageEdge {
	if languages == nil {
		return nil
	}

	totalSize := 0
	for _, lang := range *languages {
		totalSize += lang.Size
	}

	var parsedLanguages []ParsedGitHubLanguageEdge
	for _, lang := range *languages {
		size := int(math.Round((float64(lang.Size) / float64(totalSize)) * 100))

		if size == 0 {
			continue
		}

		parsedLanguages = append(parsedLanguages, ParsedGitHubLanguageEdge{
			Color: lang.Node.Color,
			Name:  lang.Node.Name,
			Size:  size,
		})
	}
	return &parsedLanguages
}

func GetRepository(owner string, name string) (*Repository, error) {
	if owner == "" || name == "" {
		detail := "Owner or Repository name is empty"
		return nil, ResponseError{
			Detail: &detail,
			Status: "404",
			Title:  "Not Found",
		}
	}

	isOwnerWhitelisted := false
	for _, whitelistedOwner := range WHITELISTED_OWNERS {
		if owner == whitelistedOwner {
			isOwnerWhitelisted = true
			break
		}
	}

	if !isOwnerWhitelisted {
		detail := fmt.Sprintf("Owner %s is not whitelisted", owner)
		return nil, ResponseError{
			Detail: &detail,
			Status: "404",
			Title:  "Not Found",
		}
	}

	repo, err := fetchRepositoryFromGitHubAPI(owner, name)
	if err != nil {
		return nil, err
	}

	if repo == nil {
		detail := fmt.Sprintf("Repository not found: %s/%s", owner, name)
		return nil, ResponseError{
			Detail: &detail,
			Status: "404",
			Title:  "Not Found",
		}
	}

	var release *GitHubReleaseNode
	if repo.Releases.Nodes != nil && len(*repo.Releases.Nodes) > 0 {
		release = &(*repo.Releases.Nodes)[0]
	}

	repository := &Repository{
		Description:     repo.Description,
		HomepageUrl:     repo.HomepageUrl,
		Languages:       mapLanguages(repo.Languages.Edges),
		Name:            repo.Name,
		Owner:           repo.Owner.Login,
		Release:         release,
		PushedAt:        repo.PushedAt,
		StargazersCount: repo.StargazersCount,
		Url:             repo.Url,
	}

	return repository, nil
}
