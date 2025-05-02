package utils

const (
	EXPERIENCE_JSON_ENDPOINT = "/experience.json"
)

type TimeEntry struct {
	Month int `json:"month"`
	Year  int `json:"year"`
}

type Timeframe struct {
	Start TimeEntry `json:"start"`
	End   TimeEntry `json:"end"`
}

type EducationExperience struct {
	City        string `json:"city"`
	Graduation  string `json:"graduation"`
	Institution string `json:"institution"`
	Programme   string `json:"programme"`

	Timeframe
}

type WorkExperience struct {
	City        string `json:"city"`
	Institution string `json:"institution"`
	Position    string `json:"position"`
	Url         string `json:"url"`

	Timeframe
}

type Experience struct {
	Education []EducationExperience `json:"education"`
	Work      []WorkExperience      `json:"work"`
}
