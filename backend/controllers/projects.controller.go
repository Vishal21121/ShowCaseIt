package controllers

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/Vishal21121/ShowCaseIt/models"
	"github.com/Vishal21121/ShowCaseIt/types"
	"github.com/Vishal21121/ShowCaseIt/utils"
	"github.com/Vishal21121/ShowCaseIt/validators"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
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
		errorMessages := validators.ProjectCreateValidator(validateError)
		return utils.ThrowError(422, "Validation failed", errorMessages)
	}

	caser := cases.Title(language.English)

	projectInsert := models.ProjectInsert{
		Title:       bodyData.Title,
		Description: bodyData.Description,
		RepoLink:    bodyData.RepoLink,
		LiveLink:    bodyData.LiveLink,
		TechStack:   bodyData.TechStack,
		Domain:      caser.String(bodyData.Domain),
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

	var projects []models.ProjectSend
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

func (pr *ProjectHandler) UpdateProject(c echo.Context) error {

	var bodyData types.ProjectUpdateBody
	bindError := c.Bind(&bodyData)
	if bindError != nil {
		return utils.ThrowError(400, bindError.Error(), []string{})
	}

	// validate the data
	if validateError := c.Validate(bodyData); validateError != nil {
		errorMessages := validators.ProjectUpdateValidator(validateError)
		return utils.ThrowError(422, "Validation failed", errorMessages)
	}

	// updating the document if found and getting the updated data
	// if not found then will return error

	objectIdFromString, _ := primitive.ObjectIDFromHex(bodyData.ID)

	result := pr.ProjectCollection.FindOneAndUpdate(c.Request().Context(), bson.M{"_id": objectIdFromString}, bson.M{
		"$set": bson.M{
			"title":       bodyData.Title,
			"description": bodyData.Description,
			"liveLink":    bodyData.LiveLink,
			"techStack":   bodyData.TechStack,
		},
	}, options.FindOneAndUpdate().SetReturnDocument(options.After))

	// if document is not found
	if result.Err() != nil {
		return utils.ThrowError(404, "Nothing to update", []string{})
	}

	var decodedResult bson.M
	result.Decode(&decodedResult)
	return c.JSON(200, types.ApiResponse{
		Success: true,
		Message: "Project updated successfully",
		Data:    decodedResult,
	})
}

func (pr *ProjectHandler) DeleteProject(c echo.Context) error {
	var projectId types.ProjectId
	bindError := c.Bind(&projectId)
	if bindError != nil {
		return utils.ThrowError(400, bindError.Error(), []string{})
	}

	// validate the id
	validationError := validators.Validator.Struct(projectId)
	if validationError != nil {
		return utils.ThrowError(400, "Please provide valid MongoDB ID", []string{})
	}

	// id is valid mongodb ObjectId
	objectIdFromString, _ := primitive.ObjectIDFromHex(projectId.ID)
	result := pr.ProjectCollection.FindOneAndDelete(c.Request().Context(), bson.M{
		"_id": objectIdFromString,
	})

	if result.Err() != nil {
		return utils.ThrowError(404, "Nothing to delete", []string{})
	}

	return c.JSON(200, types.ApiResponse{
		Success: true,
		Message: "Project deleted successfully",
		Data:    nil,
	})
}

func (pr *ProjectHandler) GetProjectByFilter(c echo.Context) error {
	// it will have all the queryParams in map format
	queryObj := c.QueryParams()

	var knownKey1 = "page"
	var knownKey2 = "limit"
	page, _ := strconv.Atoi(queryObj.Get(knownKey1))
	limit, _ := strconv.Atoi(queryObj.Get(knownKey2))

	// finding the unknownKey and it's value
	var unknownKey, unknownValue string
	for k, v := range queryObj {
		if k != knownKey1 && k != knownKey2 {
			unknownKey = k
			unknownValue = v[0]
		}
	}
	startIndex := (page - 1) * limit
	endIndex := page * limit

	var result types.FilterProject
	result.CurrentPage = page

	filterKey := unknownKey

	if unknownKey == "username" {
		filterKey = "userDetails.username"
	}

	// finding the count of documents and setting the currentPage and nextPage property
	projectCount, countError := pr.ProjectCollection.CountDocuments(c.Request().Context(), bson.M{filterKey: bson.M{
		"$regex":   unknownValue,
		"$options": "i",
	}})
	if countError != nil {
		return utils.ThrowError(500, countError.Error(), []string{})
	}

	if endIndex < int(projectCount) {
		temp := page + 1
		result.NextPage = &temp
	} else {
		result.NextPage = nil
	}

	// finding all the elements based on the filter and the pagination
	findOptions := options.Find().SetLimit(int64(limit)).SetSkip(int64(startIndex))
	curr, findError := pr.ProjectCollection.Find(c.Request().Context(), bson.M{
		filterKey: bson.M{
			"$regex":   unknownValue,
			"$options": "i",
		}}, findOptions)

	if findError != nil {
		return utils.ThrowError(500, findError.Error(), []string{})
	}

	var filteredProjects []models.ProjectSend
	cursorErr := curr.All(c.Request().Context(), &filteredProjects)
	if cursorErr != nil {
		return utils.ThrowError(500, cursorErr.Error(), []string{})
	}

	if len(filteredProjects) == 0 {
		return utils.ThrowError(404, "Projects not found", []string{})
	}

	result.Data = filteredProjects

	return c.JSON(200, types.ApiResponse{
		Success: true,
		Message: "Projects found successfully",
		Data:    result,
	})
}

func (pr *ProjectHandler) GetProjectsBySort(c echo.Context) error {
	sorter := c.Param("sortProp")
	if sorter == "" {
		return utils.ThrowError(400, "Please provide valid sort parameter", []string{})
	}
	findOptions := options.Find().SetSort(bson.M{sorter: -1}).SetLimit(3)
	cursor, findError := pr.ProjectCollection.Find(c.Request().Context(), bson.M{}, findOptions)
	if findError != nil {
		return utils.ThrowError(500, findError.Error(), []string{})
	}

	var projects []models.ProjectSend
	cursorError := cursor.All(c.Request().Context(), &projects)
	if cursorError != nil {
		return utils.ThrowError(500, cursorError.Error(), []string{})
	}

	if len(projects) == 0 {
		return utils.ThrowError(404, "Projects not found", []string{})
	}

	return c.JSON(200, types.ApiResponse{
		Data:    projects,
		Message: "Projects fetched successfully",
		Success: true,
	})

}

func (pr *ProjectHandler) IncrementLikesOrViews(c echo.Context) error {
	var bodyData types.IncrementLikesOrViews

	bindError := c.Bind(&bodyData)

	if bindError != nil {
		utils.ThrowError(500, bindError.Error(), []string{})
	}

	if bodyData.Field == "" || bodyData.ID == "" {
		return utils.ThrowError(400, "Please provide field or Id", []string{})
	}

	objectIdFromString, _ := primitive.ObjectIDFromHex(bodyData.ID)

	var projectFound models.ProjectSend

	pr.ProjectCollection.FindOne(c.Request().Context(), bson.M{"_id": objectIdFromString}).Decode(&projectFound)

	if projectFound.ID == "" {
		return utils.ThrowError(404, "Project does not exist", []string{})
	}

	var updatedDocument models.ProjectSend
	pr.ProjectCollection.FindOneAndUpdate(
		c.Request().Context(),
		bson.M{"_id": objectIdFromString},
		bson.M{"$inc": bson.M{bodyData.Field: 1}},
		options.FindOneAndUpdate().SetReturnDocument(options.After),
	).Decode(&updatedDocument)

	return c.JSON(200, types.ApiResponse{
		Data:    nil,
		Message: fmt.Sprintf("%s incremented successfully", bodyData.Field),
		Success: true,
	})

}
