FROM kthregistry.azurecr.io/kth-nodejs-18:latest
LABEL maintainer="KTH StudAdm studadm.developers@kth.se"

RUN apk add --no-cache curl bash

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

COPY ["check-_paths.js", "check-_paths.js"]
COPY ["check-_paths.json", "check-_paths.json"]

CMD ["ash", "-c", "/wait && node check-_paths.js"]