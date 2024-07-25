package types

import (
	"github.com/Vishal21121/ShowCaseIt/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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

type ProjectUpdateBody struct {
	ID          primitive.ObjectID `json:"id" validate:"required"`
	Title       string             `json:"title" validate:"required"`
	Description string             `json:"description" validate:"required"`
	LiveLink    *string            `json:"liveLink" validate:"omitempty,url"`
	TechStack   []string           `json:"techStack" validate:"required,min=1,dive,required"`
	DemoVideo   *string            `json:"demoVideo" validate:"omitempty,url"`
}
