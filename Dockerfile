# AQUIFERIUM PROJECT DOCKERFILE
FROM centos
MAINTAINER John Gentle jgentle@tacc.utexas.edu

# NOTE: Docker assumes root by default.

# Expose Container Ports to Host.
# Port 9000 for server, 35729 for livereload (in dev)
EXPOSE 9000

# Set Env Vars
ENV APP_ROOT=/aquiferium
ENV APP_DIST=$APP_ROOT/encompass-aquiferium-final
ENV APP_SOURCE_URL=https://github.com/encompasslabs/encompass-aquiferium-final.git
ENV USER_NAME=dockeradmin
ENV USER_HOMEDIR=$APP_ROOT
ENV GROUP_NAME=$USER_NAME

# Use system root / as initial context.
WORKDIR /

# Configure sources for packages.
RUN curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -

# Update OS and Install Yum Packages
# These fail if done in series ala cache-busting.
RUN yum update -y -t -v && yum clean all
RUN yum install -y epel-release
RUN yum install -y gcc-c++
RUN yum install -y gcc
RUN yum install -y patch
RUN yum install -y readline
RUN yum install -y readline-devel
RUN yum install -y curl
RUN yum install -y curl-devel
RUN yum install -y zlib
RUN yum install -y zlib-devel
RUN yum install -y libyaml-devel
RUN yum install -y libffi-devel
RUN yum install -y openssl-devel
RUN yum install -y make
RUN yum install -y bzip2
RUN yum install -y autoconf
RUN yum install -y automake
RUN yum install -y libtool
RUN yum install -y bison
RUN yum install -y git
RUN yum install -y nano
RUN yum install -y which
RUN yum install -y ruby
RUN yum install -y ruby-devel
RUN yum install -y rubygems
RUN yum install -y nodejs

# Cache-busting technique does not seem to work properly.
# Second update ensures all packages get updated.
RUN yum update -y -t -v && yum clean all

# Install Ruby Gems 
RUN gem update --system
RUN gem install json_pure
RUN gem install require
RUN gem install compass
RUN gem update --system

# Install Node Packages
RUN npm install -g pm2
RUN npm install -g grunt-cli
RUN npm install -g bower

# Create applicaton directory root and use as context.
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

# Setup a Docker Admin User.
RUN groupadd -r $GROUP_NAME -g 433
RUN useradd -u 431 -r -g $USER_NAME -d $USER_HOMEDIR -s /sbin/nologin -c "Docker image user" $USER_NAME

# Give Docker Admin user ownership of $APP_ROOT
RUN chown -R $USER_NAME:$GROUP_NAME $APP_ROOT

# Switch to Docker USER.
USER $USER_NAME

# Git Configs.
# Only set this if you are haing timeouts due to firewalls/proxy/MITM issues.
#RUN git config --global url."https://".insteadOf git://

# Make shallow clone of app source and use as context.
RUN git clone --depth 1 $APP_SOURCE_URL
WORKDIR $APP_DIST

# Install node packages
RUN npm install

# Install bower packages.
RUN bower install --verbose

# Start Application.
CMD ["grunt prod"]