package types

import "fmt"

type ErrorResponse struct {
	StatusCode int
	Message    string
	Errors     []string
}

func (e *ErrorResponse) Error() string {
	return fmt.Sprintf("Code: %d, Message: %s", e.StatusCode, e.Message)
}
