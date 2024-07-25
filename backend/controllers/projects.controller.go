package controllers

import (
	"strings"
	"time"

	"github.com/Vishal21121/ShowCaseIt/models"
	"github.com/Vishal21121/ShowCaseIt/types"
	"github.com/Vishal21121/ShowCaseIt/utils"
	"github.com/Vishal21121/ShowCaseIt/validators"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProjectHandler struct {
	ProjectCollection *mongo.Collection
}

func NewProject(collection *mongo.Collection) *ProjectHandler {
	return &ProjectHandler{
		ProjectCollection: collection,
	}
}

func (pr *ProjectHandler) CreateProject(c echo.Context) error {

	// bind the data
	var bodyData types.ProjectCreateBody
	bindError := c.Bind(&bodyData)
	if bindError != nil {
		return utils.ThrowError(500, bindError.Error(), []string{})
	}

	// validate the data
	if validateError := c.Validate(bodyData); validateError != nil {
		errorMessages := validators.ProjectCreateValidator(c, validateError)
		return utils.ThrowError(422, "Validation failed", errorMessages)
	}

	projectInsert := models.Project{
		Title:       bodyData.Title,
		Description: bodyData.Description,
		RepoLink:    bodyData.RepoLink,
		LiveLink:    bodyData.LiveLink,
		TechStack:   bodyData.TechStack,
		Domain:      bodyData.Domain,
		DemoVideo:   bodyData.DemoVideo,
		UserDetails: bodyData.UserDetails,
		Likes:       0,
		Watched:     0,
		CreatedAt:   time.Now().UTC(),
		UpdatedAt:   time.Now().UTC(),
	}

	// just dump the data
	_, insertionErr := pr.ProjectCollection.InsertOne(c.Request().Context(), projectInsert)
	if insertionErr != nil {
		return utils.ThrowError(500, insertionErr.Error(), []string{})
	}

	return c.JSON(201, types.ApiResponse{
		Success: true,
		Data: map[string]any{
			"StatusCode": 201,
		},
		Message: "Project created successfully",
	})
}

func (pr *ProjectHandler) GetProjects(c echo.Context) error {
	username := c.QueryParam("username")
	// check if username == empty then return 400
	if strings.TrimSpace(username) == "" {
		return utils.ThrowError(400, "Provided empty username", []string{})
	}

	// find the projects and return it
	cursor, findErr := pr.ProjectCollection.Find(c.Request().Context(), bson.M{"userDetails.username": username})

	if findErr != nil {
		return utils.ThrowError(500, findErr.Error(), []string{})
	}
	defer cursor.Close(c.Request().Context())

	var projects []bson.M
	if err := cursor.All(c.Request().Context(), &projects); err != nil {
		return utils.ThrowError(500, err.Error(), []string{})
	}

	if len(projects) == 0 {
		return utils.ThrowError(404, "Projects not found", []string{})
	}

	return c.JSON(200, types.ApiResponse{
		Message: "Projects found successfully",
		Data:    projects,
		Success: true,
	})

}
