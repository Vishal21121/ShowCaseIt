package types

import (
	"github.com/Vishal21121/ShowCaseIt/models"
)

type ProjectCreateBody struct {
	Title       string      `json:"title" bson:"title" validate:"required"`
	Description string      `json:"description" bson:"description" validate:"required"`
	RepoLink    string      `json:"repoLink" bson:"repoLink" validate:"required,url"`
	LiveLink    *string     `json:"liveLink"  bson:"liveLink" validate:"omitempty,url"`
	TechStack   []string    `json:"techStack" bson:"techStack" validate:"required,min=1,dive,required"`
	Domain      string      `json:"domain" bson:"domain" validate:"domain"`
	UserDetails models.User `json:"userDetails" bson:"userDetails" validate:"required"`
}

type ProjectUpdateBody struct {
	ID          string   `json:"id" validate:"required,mongodb"`
	Title       string   `json:"title" validate:"required"`
	Description string   `json:"description" validate:"required"`
	LiveLink    *string  `json:"liveLink" validate:"omitempty,url"`
	TechStack   []string `json:"techStack" validate:"required,min=1,dive,required"`
}

type ProjectId struct {
	ID string `json:"id"  validate:"required,mongodb"`
}

type FilterProject struct {
	CurrentPage int                  `json:"currentPage"`
	NextPage    *int                 `json:"nextPage"`
	Data        []models.ProjectSend `json:"data"`
}

type IncrementLikesOrViews struct {
	ID    string `json:"id"  validate:"required,mongodb"`
	Field string `json:"field"`
}
