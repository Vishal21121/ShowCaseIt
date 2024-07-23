package main

import (
	"log"
	"os"

	"github.com/Vishal21121/ShowCaseIt/storage"
	"github.com/Vishal21121/ShowCaseIt/types"
	"github.com/Vishal21121/ShowCaseIt/utils"
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

	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, types.ApiResponse{
			StatusCode: 200,
			Data:       nil,
			Message:    "Health is Ok",
			Success:    true,
		})
	})

	log.Fatal(e.Start(":8080"))
}
