package models

import "time"

type Project struct {
	Title       string    `bson:"title"`
	Description string    `bson:"description"`
	RepoLink    string    `bson:"repoLink"`
	LiveLink    *string   `bson:"liveLink"`
	TechStack   []string  `bson:"techStack"`
	Domain      string    `bson:"domain"`
	DemoVideo   *string   `bson:"demoVideo"`
	UserDetails User      `bson:"userDetails"`
	Likes       int       `bson:"likes"`
	Watched     int       `bson:"watched"`
	CreatedAt   time.Time `bson:"createdAt"`
	UpdatedAt   time.Time `bson:"updatedAt"`
}

type User struct {
	Username   string  `bson:"username" json:"username" validate:"required"`
	GithubLink string  `bson:"gitHub" json:"gitHub" validate:"required,url"`
	Twitter    *string `bson:"twitter" json:"twitter" validate:"omitempty,url"`
	LinkedIn   *string `bson:"linkedIn" json:"linkedIn" validate:"omitempty,url"`
}
