# Leaked Credentials

This example shows how writing secrets to a docker image
can cause those secrets to leak into the final docker
image, even when those secrets may appear to be purged.

```sh
>docker build . -t leaked-credentials:1.0

>docker images | grep leaked-credentials
REPOSITORY                           TAG       IMAGE ID       CREATED          SIZE
leaked-credentials                   1.0       1b072876542c   19 seconds ago   113MB

>docker history leaked-credentials:1.0
IMAGE          CREATED              CREATED BY                                      SIZE      COMMENT
dd086b42af4c   3 seconds ago   /bin/sh -c rm /home/node/shh.txt                0B        
6d557fb1c0fa   4 seconds ago   /bin/sh -c echo "super secret password" >> /…   22B       
a3c0a72e086a   26 hours ago    /bin/sh -c #(nop)  CMD ["node"]                 0B        
<missing>      26 hours ago    /bin/sh -c #(nop)  ENTRYPOINT ["docker-entry…   0B        
<missing>      26 hours ago    /bin/sh -c #(nop) COPY file:238737301d473041…   116B      
<missing>      26 hours ago    /bin/sh -c apk add --no-cache --virtual .bui…   7.76MB    
<missing>      26 hours ago    /bin/sh -c #(nop)  ENV YARN_VERSION=1.22.5      0B        
<missing>      26 hours ago    /bin/sh -c addgroup -g 1000 node     && addu…   99.8MB    
<missing>      26 hours ago    /bin/sh -c #(nop)  ENV NODE_VERSION=16.10.0     0B        
<missing>      3 weeks ago     /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B        
<missing>      3 weeks ago     /bin/sh -c #(nop) ADD file:ecdfb91a737d6c292…   5.61MB    


>docker run -it --rm 6d557fb1c0fa cat /home/node/shh.txt
super secret password
```

!!!!!!!!! You can see that the credential has been leaked!!!
