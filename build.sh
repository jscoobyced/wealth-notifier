#!/bin/sh

docker buildx build --push --platform linux/arm64,linux/amd64 -t jscdroiddev/wealth-notifier:latest -f etc/docker/Dockerfile .
