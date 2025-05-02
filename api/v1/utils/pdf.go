package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/johnfercher/maroto/v2"
	"github.com/johnfercher/maroto/v2/pkg/components/code"
	"github.com/johnfercher/maroto/v2/pkg/components/col"
	"github.com/johnfercher/maroto/v2/pkg/components/image"
	"github.com/johnfercher/maroto/v2/pkg/components/row"
	"github.com/johnfercher/maroto/v2/pkg/components/text"
	"github.com/johnfercher/maroto/v2/pkg/config"
	"github.com/johnfercher/maroto/v2/pkg/consts/align"
	"github.com/johnfercher/maroto/v2/pkg/consts/extension"
	"github.com/johnfercher/maroto/v2/pkg/consts/fontstyle"
	"github.com/johnfercher/maroto/v2/pkg/core"
	"github.com/johnfercher/maroto/v2/pkg/core/entity"
	"github.com/johnfercher/maroto/v2/pkg/props"
)

func createHeaderImage() (*core.Row, error) {
	avatar, err := FetchAsset(ASSETS_AVATAR)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to fetch the avatar image asset")
	}

	r := row.New(50).Add(image.NewFromBytesCol(GRID_SIZE, avatar, extension.Jpg, props.Rect{Center: true, Percent: 100}))

	return &r, nil
}

func createHeaderText() *[]core.Row {
	hyperlink := fmt.Sprintf("mailto:%s", EMAIL)
	title := strings.Trim(strings.Split(TITLE, ", ")[1], " ")
	url := URL

	// Create the header text
	headerText := []core.Row{
		row.New(11).Add(
			col.New(GRID_SIZE).Add(
				text.New(AUTHOR, props.Text{
					Size:   22,
					Style:  fontstyle.Bold,
					Align:  align.Center,
					Family: "Space Grotesk",
				}),
			)),
		row.New(2).Add(
			col.New(GRID_SIZE),
		),
		row.New(8).Add(
			col.New(GRID_SIZE).Add(
				text.New(title, props.Text{
					Size:   18,
					Style:  fontstyle.Normal,
					Align:  align.Center,
					Family: "Overpass",
				}),
			),
		),
		row.New(5).Add(
			col.New(GRID_SIZE),
		),
		row.New(5).Add(
			col.New(11).Add(
				text.New(EMAIL, props.Text{
					Size:      12,
					Style:     fontstyle.Normal,
					Align:     align.Right,
					Family:    "Overpass",
					Hyperlink: &hyperlink,
				}),
			),
			col.New(2).Add(
				text.New(" • ", props.Text{
					Size:  12,
					Style: fontstyle.Normal,
					Align: align.Center,
				}),
			),
			col.New(11).Add(
				text.New(URL, props.Text{
					Size:      12,
					Style:     fontstyle.Normal,
					Align:     align.Left,
					Family:    "Overpass",
					Hyperlink: &url,
				}),
			),
		),
	}

	return &headerText
}

func createFooterText() *[]core.Row {
	t := time.Now()
	year := t.Year()

	footerText := []core.Row{
		row.New(15).Add(
			col.New(8).Add(
				text.New("For more information, links to my social media accounts and my list of featured projects, visit my website by scanning the QR code.", props.Text{
					Top:    0,
					Size:   8,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
				text.New(fmt.Sprintf("© %d %s", year, AUTHOR), props.Text{
					Top:    11,
					Size:   10,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
			),
			col.New(8).Add(
				code.NewQr(URL, props.Rect{
					Percent: 100,
					Center:  true,
				}),
			),
			col.New(8).Add(
				text.New(fmt.Sprintf("Auto-generated on %s.", t.Format("02 January 2006")), props.Text{
					Top:    11,
					Size:   10,
					Style:  fontstyle.Normal,
					Align:  align.Right,
					Family: "Overpass",
				}),
			),
		),
	}

	return &footerText
}

func createExperienceBlocks() (*[]core.Row, error) {
	experience, err := FetchAsset("/experience.json")

	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to fetch experience data")
	}

	// Parse the JSON data
	var experienceResponse JSONAPIResponse[Experience]
	err = json.Unmarshal(experience, &experienceResponse)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to parse experience data")
	}

	experienceData := experienceResponse.Data

	if len(experienceData.Work) > 6 {
		experienceData.Work = experienceData.Work[:6]
	}
	if len(experienceData.Education) > 6 {
		experienceData.Education = experienceData.Education[:6]
	}
	work := experienceData.Work
	education := experienceData.Education

	experienceBlocks := []core.Row{
		row.New(20).Add(
			col.New(GRID_SIZE),
		),
		row.New(12).Add(
			col.New(11).Add(
				text.New("Experience", props.Text{
					Size:   18,
					Style:  fontstyle.Bold,
					Align:  align.Left,
					Family: "Space Grotesk",
				}),
			),
			col.New(2),
			col.New(11).Add(
				text.New("Education", props.Text{
					Size:   18,
					Style:  fontstyle.Bold,
					Align:  align.Left,
					Family: "Space Grotesk",
				}),
			),
		),
	}

	for i, item := range work {
		from := fmt.Sprintf("%02d/%d", item.Start.Month, item.Start.Year)
		to := "now"
		if item.End.Year != 0 {
			to = fmt.Sprintf("%02d/%d", item.End.Month, item.End.Year)
		}

		cols := []core.Col{
			col.New(11).Add(
				text.New(item.Institution, props.Text{
					Size:   12,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
				text.New(item.Position, props.Text{
					Top:    6,
					Size:   10,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
				text.New(fmt.Sprintf("%s - %s, %s", from, to, item.City), props.Text{
					Top:    10.5,
					Size:   10,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
			),
			col.New(2),
		}

		if i < len(education) {
			from := fmt.Sprintf("%02d/%d", education[i].Start.Month, education[i].Start.Year)
			to := "now"
			if education[i].End.Year != 0 {
				to = fmt.Sprintf("%02d/%d", education[i].End.Month, education[i].End.Year)
			}

			cols = append(cols, col.New(11).Add(
				text.New(education[i].Institution, props.Text{
					Size:   12,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
				text.New(fmt.Sprintf("%s, %s", education[i].Programme, education[i].Graduation), props.Text{
					Top:    6,
					Size:   10,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
				text.New(fmt.Sprintf("%s - %s, %s", from, to, education[i].City), props.Text{
					Top:    10.5,
					Size:   10,
					Style:  fontstyle.Normal,
					Align:  align.Left,
					Family: "Overpass",
				}),
			))
		} else {
			cols = append(cols, col.New(11))
		}

		experienceBlocks = append(experienceBlocks, row.New(20).Add(
			cols...,
		))
	}

	return &experienceBlocks, nil
}

func CreateCVPDF() (*core.Maroto, error) {
	// Fetch the assets
	headlineFont, err := FetchAsset(ASSETS_HEADLINE_FONT)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to fetch the headline font asset")
	}

	bodyFont, err := FetchAsset(ASSETS_BODY_FONT)
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to fetch the body font asset")
	}

	fonts := []*entity.CustomFont{
		{
			Family: "Space Grotesk",
			Style:  fontstyle.Bold,
			Bytes:  headlineFont,
		}, {
			Family: "Overpass",
			Style:  fontstyle.Normal,
			Bytes:  bodyFont,
		},
	}

	cfg := config.NewBuilder().
		// WithDebug(true).
		WithMaxGridSize(GRID_SIZE).
		WithAuthor(AUTHOR, true).
		WithTitle(fmt.Sprintf("CV of %s", AUTHOR), true).
		WithCustomFonts(fonts).
		WithTopMargin(15).
		WithLeftMargin(10).
		WithRightMargin(10).
		WithCreationDate(time.Now()).Build()

	m := maroto.New(cfg)

	r, err := createHeaderImage()
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to create the header image")
	}

	headerRows := []core.Row{
		*r,
		row.New(10).Add(col.New(GRID_SIZE)),
	}

	headerRows = append(headerRows, *createHeaderText()...)

	m.RegisterHeader(headerRows...)
	m.RegisterFooter(*createFooterText()...)

	experience, err := createExperienceBlocks()
	if err != nil {
		log.Println(err)
		return nil, fmt.Errorf("failed to create the experience blocks")
	}
	m.AddRows(*experience...)

	return &m, nil
}
