FROM node:latest

WORKDIR /code


COPY package.json /code

RUN yarn install

COPY . /code

ENTRYPOINT [ "yarn", "run" ]
CMD ["serve"]