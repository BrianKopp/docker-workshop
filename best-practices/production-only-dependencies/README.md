# Production-Only Dependencies

It is best practice to install only your productionn dependencies
into your docker image.

Check out the example in `multi-stage-typescript-express`.

```sh
# from project root
# build the non-prod deps image
docker build example-apps/multi-stage-typescript-express -f best-practices/production-only-dependencies/Dockerfile -t prod-only-deps:dev-deps

# build the prod-only deps
docker build example-apps/multi-stage-typescript-express -t prod-only-deps:prod-only-deps
```

Comparing the results:

TODO after jest tests
For now it's...

```txt
prod-only-deps  prod-only-deps                   97164cfd94f9   52 seconds ago       123MB
prod-only-deps  dev-deps                         9012d6a664b3   About a minute ago   283MB
```
