# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/congressional-members-search-ui

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/congressional-members-search-ui/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/congressional-members-search-ui/package.json
RUN npm install 

EXPOSE 8080


# start app
CMD ["npm", "start"]