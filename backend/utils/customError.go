package utils

import (
	"net/http"

	"github.com/Vishal21121/ShowCaseIt/types"
	"github.com/labstack/echo/v4"
)

func CustomErrorHandler(err error, c echo.Context) {
	if customError, ok := err.(*types.ErrorResponse); ok {
		c.JSON(customError.StatusCode, map[string]any{
			"success": false,
			"data": map[string]any{
				"message": customError.Message,
				"errors":  customError.Errors,
			},
		})
		return
	}
	c.JSON(http.StatusInternalServerError, map[string]any{
		"success": false,
		"data": map[string]any{
			"message": "Internal server error",
			"errors":  []string{err.Error()},
		},
	})
}

func ThrowError(StatusCode int, Message string, Errors []string) *types.ErrorResponse {
	return &types.ErrorResponse{
		StatusCode: StatusCode,
		Message:    Message,
		Errors:     Errors,
	}
}
