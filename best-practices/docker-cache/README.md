# Docker Cache

The Docker image builder leverages a caching system to take advantage
of pre-built image layers.

Aside - the `docker buildx` builder (`mobykit`) is way better at doing this
than docker's OOTB image builder.

It looks at the following info (condensed) to see if it can use the cache:

* Previous layer hash.
* Relevant files (files that are COPY'd or the current context).
* Specific image build command (e.g. COPY, RUN).

This folder contains three examples of how to efficiently structure your Dockerfiles.

This docker image will have several debian apt dependencies as well as a handful of
npm dependencies.

## Dockerfile Tips

### Optimal Dockerfile

The optimal dockerfile is one which orders its commands in the Dockerfile in order,
from least-frequently-changing-commands to most-frequently-changing-commands.

In your application, this probably means that dependencies are installed first,
followed by code changes, and then build commands (if applicable).

```sh
docker build . -f optimal.Dockerfile
# took 41s

# made a change to the index.js file, reran command
# took 1s
```

### Sub-Optimal Dockerfile

A suboptimal dockerfile is one which cannot take advantage of the docker cache.

In this example, we copy the entire source code directory out to the docker container
first. This means that any changes to our source code will cause ALL downstream docker
build commands to re-run.

```sh
docker build . -f suboptimal.Dockerfile
# took 40s

# made a change to the index.js file, reran command

```

### Work-In-Progress Dockerfile

When you are developing an application, or changing its dependencies, I recommend
using a hybrid approach that isn't quite 100% optimal, but lets you develop faster.

A good example of this would be when you are trying to install a dependency whose
installation requires other dependencies that you otherwise don't need.

For example, consider the AWS CLI. In order to install the AWS CLI, you need something
like curl or wget, as well as unzip. You probably don't need those in
your final container, so you'd like to wrap the whole thing in a single RUN command
with multiple shell statements. However, during development, this can actually slow you
down, especially if the installation file or process is large.

Check out the `aws-wip.Dockerfile` and `aws-final.Dockerfile` for examples. When
developing, the `aws-wip.Dockerfile` gives you freedom to make mistakes quickly,
make modifications, and pick up at the very latest command that succeeded. Changing any
part of the `aws-final.Dockerfile` install `RUN` command would require re-running
the entire thing.

Once you are happy with the dependencies, you can come back and optimize it. That part
is still worth it. See the image sizes below:

* 361MB - aws-wip
* 308MB - aws-final

## Context Tips

The docker context is the first argument after a `docker build` command. Usually
the context is `.`, or the current working directory. Normally, you need all the
files in the current working directory, but there could be times where you need
to build a docker image that isn't based on your entire source tree. In this case,
if you can set your docker context somewhere that is separate from the rest of your
rapidly changing code, you might be able to make builds even faster.

Use your `.dockerignore` file to prevent files and folders from being copied to your
docker container during the image build. Example directories would be `.git`,
`node_modules`, etc.
