FROM debian:buster-slim

ENV AWS_CLI_VERSION "2.1.19"
ENV AWS_CLI_URL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.1.19.zip"
ENV AWS_CLI_SHA256SUM "36fd8cb2ca82bfec27a25d23643de4879a9da88be7c44f5e0628d4fe159e8c2f"

# Download and extract serf and aws cli
RUN set -eux; \
    export DEBIAN_FRONTEND=noninteractive; \
    apt-get -qq update; \
    apt-get install -qq -y --no-install-recommends \
        ca-certificates \
        curl \
        unzip; \
    # install AWS CLI
    echo "installing aws cli..."; \
    cd /tmp; \
    curl $AWS_CLI_URL -o "awscliv2.zip"; \
    echo "$AWS_CLI_SHA256SUM /tmp/awscliv2.zip" | sha256sum -c -; \
    unzip -q awscliv2.zip; \
    rm awscliv2.zip; \
    cd aws; \
    ./install; \
    aws --version; \
    rm -rf aws; \
    echo "done installing aws cli"; \
    apt-get remove -y ca-certificates unzip; \
    rm -rf /var/lib/apt/lists/*; \
    echo "downloaded and extracted serf and aws cli";
