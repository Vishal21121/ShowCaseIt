FROM golang:1.22.0-alpine3.19 AS build-base

WORKDIR /app

COPY go.mod go.sum ./

ARG MONGO_URI
ARG CLIENT_ID
ARG CLIENT_SECRET
ARG KEY
ARG IS_PROD

ENV MONGO_URI=$MONGO_URI
ENV CLIENT_ID=$CLIENT_ID
ENV CLIENT_SECRET=$CLIENT_SECRET
ENV KEY=$KEY
ENV IS_PROD=$IS_PROD

RUN go mod download

COPY . .

RUN go build -o showcaseBackend

ENTRYPOINT [ "./showcaseBackend" ]
