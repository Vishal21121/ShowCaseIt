package storage

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectToMongo(connectionString string) error {
	clientOption := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOption)
	if err != nil {
		return err
	}
	pingErr := client.Ping(context.TODO(), nil)
	if pingErr != nil {
		return pingErr
	}
	DB = client
	fmt.Println("connected to MongoDB")
	return nil
}
