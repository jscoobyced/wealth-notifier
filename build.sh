#!/bin/sh

docker buildx build --push --platform linux/arm64,linux/amd64 -t jscdroiddev/wealth-notifier:latest -t jscdroiddev/wealth-notifier:1.1.3 -f etc/docker/Dockerfile .
