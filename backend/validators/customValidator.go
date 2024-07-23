package validators

import "github.com/go-playground/validator/v10"

type CustomValidator struct {
	Validator *validator.Validate
}

func (cv *CustomValidator) Validate(i any) error {
	if err := cv.Validator.Struct(i); err != nil {
		return err
	}
	return nil
}

func CustomDomainValidator(fl validator.FieldLevel) bool {
	var validDomains = []string{
		"Web Development", "Mobile Development", "Data Science", "Machine Learning",
		"DevOps", "Cybersecurity", "Blockchain", "Game Development",
		"Cloud Computing", "Artificial Intelligence", "Augmented Reality (AR)",
		"Virtual Reality (VR)",
	}
	domain := fl.Field().String()
	for _, value := range validDomains {
		if domain == value {
			return true
		}
	}
	return false
}
