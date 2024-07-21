package types

type ApiResponse struct {
	StatusCode int
	Data       any
	Message    string
	Success    bool
}
