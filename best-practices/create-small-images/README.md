# Create Small Images

This example is a hello world application that uses newrelic for
instrumentation. When installing newrelic, it wants to have node-gpy,
which requires python to be installed. Shipping a container image
with python installed would make you sad, so instead, build your image
using multiple commands in a single layer to clean up after yourself.

Examples are given in alpine- and debian-flavored versions.

```sh
docker build . -f alpine.Dockerfile -t create-small-images:alpine
docker build . -f alpine-not-optimized.Dockerfile -t create-small-images:alpine-sad

docker build . -f debian.Dockerfile -t create-small-images:debian
docker build . -f debian-not-optimized.Dockerfile -t create-small-images:debian-sad
```

Inspect the sizes:

```sh
>docker images | grep create-small-images
create-small-images                  debian-sad   7df029387505   55 seconds ago      377MB
create-small-images                  debian       51136d5c8dbc   3 minutes ago       206MB
create-small-images                  alpine-sad   ed95c2c49495   7 minutes ago       343MB
create-small-images                  alpine       ae3d609361ca   8 minutes ago       137MB
```
