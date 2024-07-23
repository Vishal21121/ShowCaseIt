package types

import "github.com/Vishal21121/ShowCaseIt/models"

type ProjectCreateBody struct {
	Title       string      `json:"title" validate:"required"`
	Description string      `json:"description" validate:"required"`
	RepoLink    string      `json:"repoLink" validate:"required,url"`
	LiveLink    *string     `json:"liveLink" validate:"omitempty,url"`
	TechStack   []string    `json:"techStack" validate:"required,min=1,dive,required"`
	Domain      string      `json:"domain" validate:"domain"`
	DemoVideo   *string     `json:"demoVideo" validate:"omitempty,url"`
	UserDetails models.User `json:"userDetails" validate:"required"`
}
