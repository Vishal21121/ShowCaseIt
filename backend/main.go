package main

import (
	"log"
	"os"

	"github.com/Vishal21121/ShowCaseIt/controllers"
	"github.com/Vishal21121/ShowCaseIt/storage"
	"github.com/Vishal21121/ShowCaseIt/types"
	"github.com/Vishal21121/ShowCaseIt/utils"
	"github.com/Vishal21121/ShowCaseIt/validators"
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("err loading env file")
	}
	dbConnectionErr := storage.ConnectToMongo(os.Getenv("MONGO_URI"))
	if dbConnectionErr != nil {
		log.Fatal("Err connecting to database: ", err.Error())
	}

	e := echo.New()

	// Middleware
	e.Use(middleware.CORS())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "time=${time_rfc3339}, method=${method}, uri=${uri}, status=${status}, latency=${latency_human}",
	}))
	e.Use(middleware.Recover())
	e.HTTPErrorHandler = utils.CustomErrorHandler
	validate := validator.New()
	validate.RegisterValidation("domain", validators.CustomDomainValidator)
	e.Validator = &validators.CustomValidator{Validator: validate}

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, types.ApiResponse{
			Data:    nil,
			Message: "Health is Ok",
			Success: true,
		})
	})

	projectHandler := controllers.NewProject(storage.DB.Database("showcaseIt").Collection("projects"))
	projectRouter := e.Group("/api/v1/project")
	projectRouter.POST("/create", projectHandler.CreateProject)
	projectRouter.GET("/get", projectHandler.GetProjects)

	log.Fatal(e.Start(":8080"))
}
