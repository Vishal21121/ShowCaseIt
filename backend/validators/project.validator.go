package validators

import (
	"fmt"
	"strings"

	"github.com/go-playground/validator/v10"
)

func ProjectCreateValidator(validateError any) []string {
	errorMessages := make([]string, 0)

	if validationError, ok := validateError.(validator.ValidationErrors); ok {
		for _, ve := range validationError {
			if ve.Tag() == "required" {
				if strings.HasPrefix(ve.Field(), "TechStack[") {
					errorMessages = append(errorMessages, "Tech stack element cannot be empty")
				} else {
					errorMessages = append(errorMessages, fmt.Sprintf("%s is required", strings.ToLower(ve.Field())))
				}
			} else if ve.Tag() == "url" {
				errorMessages = append(errorMessages, fmt.Sprintf("provide valid %s", strings.ToLower(ve.Field())))
			} else if ve.Tag() == "domain" {
				errorMessages = append(errorMessages, "Please provide valid domain")
			} else if ve.Tag() == "min" {
				errorMessages = append(errorMessages, "tech stack cannot be empty")
			}
		}
	}
	return errorMessages
}

func ProjectUpdateValidator(validateError any) []string {
	errorMessages := make([]string, 0)

	if validationError, ok := validateError.(validator.ValidationErrors); ok {
		for _, ve := range validationError {
			if ve.Tag() == "required" {
				if strings.HasPrefix(ve.Field(), "TechStack[") {
					errorMessages = append(errorMessages, "Tech stack element cannot be empty")
				} else {
					errorMessages = append(errorMessages, fmt.Sprintf("%s is required", strings.ToLower(ve.Field())))
				}
			} else if ve.Tag() == "url" {
				errorMessages = append(errorMessages, fmt.Sprintf("provide valid %s", strings.ToLower(ve.Field())))
			} else if ve.Tag() == "mongodb" {
				errorMessages = append(errorMessages, "Please provide valid mongodb Id")
			}
		}
	}
	return errorMessages
}
