#FROM dockerfile/nodejs
FROM centos
MAINTAINER John Gentle jgentle@tacc.utexas.edu

# Expose ports
# Port 9000 for server, 35729 for livereload
EXPOSE 9000 35729

# Start in root /
WORKDIR /

# Update OS
RUN yum -y update
RUN yum -y install epel-release 
RUN yum -y install gcc-c++ 
RUN yum -y install patch 
RUN yum -y install readline 
RUN yum -y install readline-devel 
RUN yum -y install curl 
RUN yum -y install curl-devel 
RUN yum -y install zlib 
RUN yum -y install zlib-devel 
RUN yum -y install libyaml-devel 
RUN yum -y install libffi-devel 
RUN yum -y install openssl-devel 
RUN yum -y install make 
RUN yum -y install bzip2 
RUN yum -y install autoconf 
RUN yum -y install automake 
RUN yum -y install libtool 
RUN yum -y install bison   
RUN yum -y install git 
RUN yum -y install nano 
RUN yum -y install which 
RUN yum -y install ruby 
RUN yum -y install rubygems 
RUN curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
RUN yum -y install nodejs 
RUN yum install -y gcc

# Install App Prerequisites 
RUN gem update --system
RUN gem install json_pure
RUN gem install require 
RUN yum -y install ruby-devel
RUN gem install compass
RUN npm install -g pm2 
RUN npm install -g grunt-cli 
RUN npm install -g bower 

# Setup an Install USER. Move to start after testing initial success.
RUN groupadd -r dockeradmin -g 433
RUN useradd -u 431 -r -g dockeradmin -d /auiferium_source -s /sbin/nologin -c "Docker image user" dockeradmin
RUN chown -R dockeradmin:dockeradmin /auiferium_source
USER dockeradmin

# Clone app source.
RUN mkdir /aquiferium_source
WORKDIR /auiferium_source
RUN git clone https://github.com/encompasslabs/encompass-aquiferium-final.git
WORKDIR /auiferium_source/encompass-aquiferium-final
#RUN git config --global url.https://github.com/.insteadOf git://github.com/
#RUN git config --global url."https://".insteadOf git://

# Install App packages
RUN npm install
# Install bower packages.
RUN bower install
# Start App.
CMD ["grunt prod"]