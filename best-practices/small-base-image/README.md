# Use a small base image

The following are all node 14 base images, but have different programs
installed and different sizes.

```sh
>docker pull node:14 # the debian buster version with build dependencies
>docker pull node:14-slim # the debian buster version, slim
>docker pull node:14-alpine # the alpine version, super slim

>docker images | grep node
node                                 14          db40ea2d00ea   3 weeks ago      944MB
node                                 14-slim     155ab70ad942   3 weeks ago      168MB
node                                 14-alpine   1d909dafa77f   3 weeks ago      117MB
```
