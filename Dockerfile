FROM node:10.18-stretch as builder

ENV DEBIAN_FRONTEND noninteractive


RUN apt-get update && \
    apt-get install -y \
        vim \
        build-essential \
        procps \
        lsb-release \
        apt-transport-https \
        wget \
        apt-utils \
        git

WORKDIR /app

RUN mkdir -p /tmp/build

COPY package*.json /tmp/build/


RUN npm --prefix /tmp/build install


# Final image
FROM node:10.18-stretch-slim

WORKDIR /app

COPY --from=builder /tmp/build/node_modules /app/node_modules
COPY . .

RUN chown -R node:node /app

RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    date

USER node

EXPOSE 3000:3000
