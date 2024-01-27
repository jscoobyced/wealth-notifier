FROM node:current-alpine AS base

RUN apk update
RUN apk upgrade
RUN apk add --update --no-cache tzdata busybox-suid
ENV TZ=Asia/Bangkok
COPY ./etc/config/crontab.txt /etc/crontabs/root

ENV APPDIR=/opt/wealth-notifier
WORKDIR /opt


FROM base AS build

RUN mkdir -p $APPDIR/build
COPY package.json tsconfig.json yarn.lock $APPDIR/build/
ADD src $APPDIR/build/src

RUN yarn --cwd $APPDIR/build
RUN yarn --cwd $APPDIR/build build

FROM base AS prod
COPY --from=build $APPDIR/build/bin $APPDIR/bin/
COPY --from=build $APPDIR/build/package.json $APPDIR/

CMD [ "crond", "-f"]