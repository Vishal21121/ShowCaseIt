package controllers

import "go.mongodb.org/mongo-driver/mongo"

type ProjectHandler struct {
	ProjectCollection *mongo.Collection
}
