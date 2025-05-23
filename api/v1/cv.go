package v1

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/saschazar21/sascha.work/api/v1/utils"
)

func HandleCV(w http.ResponseWriter, r *http.Request) {
	// Handle the CV request here
	pdf, err := utils.CreateCVPDF()
	if err != nil {
		log.Println(err)
		http.Error(w, "Failed to create PDF", http.StatusInternalServerError)
		return
	}

	document, err := (*pdf).Generate()

	if err != nil {
		http.Error(w, "Failed to write PDF", http.StatusInternalServerError)
		return
	}

	b := document.GetBytes()

	filename := strings.ReplaceAll(fmt.Sprintf("%s_CV.pdf", utils.AUTHOR), " ", "_")

	// Set the content type and headers for the response
	w.Header().Set("Content-Length", fmt.Sprintf("%d", len(b)))
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filename))

	// Add caching header for 24 hours
	w.Header().Set("Cache-Control", "public, s-maxage=86400, max-age=86400")
	w.Header().Set("CDN-Cache-Control", "public, s-maxage=86400, max-age=86400, stale-while-revalidate=172800")
	w.Header().Set("Netlify-CDN-Cache-Control", "public, durable, s-maxage=86400, stale-while-revalidate=172800")

	w.WriteHeader(http.StatusOK)

	_, err = w.Write(b)
	if err != nil {
		http.Error(w, "Failed to write PDF", http.StatusInternalServerError)
		return
	}
}
