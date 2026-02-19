#!/bin/sh

export JAVA_HOME=/Users/tomschindl/SDKs/java/zulu21.48.15-ca-jdk21.0.10-macosx_aarch64/zulu-21.jdk/Contents/Home
./mvnw quarkus:dev -Dquarkus.http.port=3000
