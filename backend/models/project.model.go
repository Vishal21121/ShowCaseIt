package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	Id          primitive.ObjectID `bson:"_id" json:"_id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	RepoLink    string             `bson:"repoLink" json:"repoLink"`
	LiveLink    *string            `bson:"liveLink" json:"liveLink"`
	TechStack   []string           `bson:"techStack" json:"techStack"`
	Domain      string             `bson:"domain" json:"domain"`
	DemoVideo   *string            `bson:"demoVideo" json:"demoVideo"`
	UserDetails User               `bson:"userDetails" json:"userDetails"`
	Likes       int                `bson:"likes" json:"likes"`
	Watched     int                `bson:"watched" json:"watched"`
	CreatedAt   time.Time          `bson:"createdAt" json:"createdAt"`
	UpdatedAt   time.Time          `bson:"updatedAt" json:"updatedAt"`
}

type User struct {
	Username   string  `bson:"username" json:"username" validate:"required"`
	AvatarLink string  `bson:"avatar" json:"avatar" validate:"required,url"`
	GithubLink string  `bson:"gitHub" json:"gitHub" validate:"required,url"`
	Twitter    *string `bson:"twitter" json:"twitter" validate:"omitempty,url"`
	LinkedIn   *string `bson:"linkedIn" json:"linkedIn" validate:"omitempty,url"`
}
