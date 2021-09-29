FROM debian:buster-slim

ENV AWS_CLI_VERSION "2.1.19"
ENV AWS_CLI_URL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.1.19.zip"

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        unzip;
# install AWS CLI
WORKDIR /tmp

# Download
RUN curl $AWS_CLI_URL -o "awscliv2.zip"

# Extract
RUN unzip -q awscliv2.zip

WORKDIR /tmp/aws

# Install
RUN ./install

# Confirm install
RUN aws --version
