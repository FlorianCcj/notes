FROM sublimino/alpine-base:insecure
RUN apk --update add nodejs python make g++ \
    curl wget build-base ca-certificates git
WORKDIR /usr/src/app
ADD ./package.json /usr/src/app/package.json
RUN npm install
ADD ./index.json /usr/src/app/
EXPOSE 9000
CMD [ "sleep", "1000" ]
