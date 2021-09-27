# Minimal Express App

This directory includes a minimal express app example.

```sh
>docker build . -t minimal-express:1.0

>docker images | grep minimal-express
minimal-express                      1.0         e58a23f4a112   6 seconds ago    121MB

>docker run -it --rm -p "3000:3000" minimal-express:1.0
server listening on port 3000

# new shell
>curl http://localhost:3000
Hello, World!

# Original shell, hit CTRL+C
^Creceived signal to shutdown SIGINT
successfully closed server
```
