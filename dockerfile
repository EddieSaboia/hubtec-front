FROM node
# Update packages and install dependency packages for services
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

ENV INSTALL_PATH /hubtec_front

# Prepare app directory
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Install dependencies
COPY . .
RUN npm install

ADD . $INSTALL_PATH

CMD [ "npm", "start" ]