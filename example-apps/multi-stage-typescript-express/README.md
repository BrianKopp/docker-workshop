# Multi-Stage Typescript Express

This example shows a backend Express app written in Typescript.

It includes:

* prettier and eslint for formatting & linting
* docker-compose for building and running
* nodemon for hot-reloading
* jest for testing
* winston for logging
* tsyringe for a dependency-injection

It is largely based on the typescript starter found
[here](https://github.com/bitjson/typescript-starter).

## API

It has 3 API endpoints to get, add, and delete items from a set.
The API is backed by redis.

* `GET /items`
* `POST /items`
* `DELETE /items/:item`  
