package models

type Project struct {
	Title       string
	Description string
	RepoLink    string
	LiveLink    *string
	TechStack   []string
	Domain      string
	DemoVideo   *string
	UserDetails User
	Likes       int
	Watched     int
	CreatedAt   string
	UpdatedAt   string
}

type User struct {
	Username string
	Github   string
	Twitter  *string
	LinkedIn *string
}
