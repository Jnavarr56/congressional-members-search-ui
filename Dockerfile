# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/ui

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/ui/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/ui/package.json
RUN npm install 

EXPOSE 8080


# start app
CMD ["npm", "start"]