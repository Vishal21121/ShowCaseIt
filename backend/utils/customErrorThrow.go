package utils

import "github.com/Vishal21121/ShowCaseIt/types"

func ThrowError(StatusCode int, Message string, Errors []string) *types.ErrorResponse {
	return &types.ErrorResponse{
		StatusCode: StatusCode,
		Message:    Message,
		Errors:     Errors,
	}
}
