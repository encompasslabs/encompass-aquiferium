# Aquiferium #

The Aquiferium is a collaboration between the Encompass Project (UT Austin) and the Edwards Aquifer Authority to create an interactive Single Page Application (SPA) using cutting-edge web technologies for geo-data display as both an educational and a stakeholder resource for better understanding and governance of the aquifer system. The codebase is built entirely upon open-source technologies described under dependencies. Setup and usage is as follows.

### General Information ###

* Project Lifecycle: February 2014 - December 2014
* Version: 1.5 beta

## Docker Deployment ##

### Getting Started ###

The Aquiferium has been packed into a Docker container for easy deployment of the final application. Directions for this process follow.

* Install Docker on the Host machine
* Pull the Aquiferium docker image
* Run the Aquiferium container on the Host machine
* Verify that Aquiferium is live

#### Install Docker on Host Machine ####

In order to run the docker container the host machine will require that docker be installed (https://www.docker.com/) and properly configured. Detailed instructions for platform sepcific installation can be found on the Docker website.

#### Pull Aquiferium Docker Image ####

Once docker is succesfully installed on your Host machine, you can pull the Aquifeirum image by issuing the following command from the docker connected command line:

    $ docker pull encompass/aquiferium

The Host machine will now pull all the assiated file layers required by the Aquifeirum application docker image. Once completed you can immediately deploy the application.

#### Deploy the Aquiferium Container ####

In order to run the Aquiferium container on the Host machine, you will need to issue the following command:

    $ docker run -d -p 80:80 encompass/aquiferium:latest nginx -g 'daemon off;'

* Open the Docker Quickstart Terminal or a local console with docker access.
* The "docker run" command tells the docker service to load a target image. 
* The "-d" indicates that it should run as a daemon, or background process. 
* The "-p 80:80" indicates that we are mapping the containers internal port 80 to the Host machine's port 80 so that the application is accesible over a standard web browser connection. 
* The "encompass/aquiferium:latest" tells docker what image abd version to run.
* The "nginx -g 'daemon off;'" 

#### Verify Aquiferium Deployment ####

After issuing the docker run command you should see a hash string printed in the console output. This indicates that your docker container was started as a container with that hash as the reference ID.

To verify the container is still running issue the following command:

    $ docker ps 

This should list all actively running containers on the Host machine.
There should be at least one container listed with the IMAGE set to encompass/aquiferium:latest.

#### Viewing Aquiferium ####

How you view the live application will vary depending on your Host machine OS. 

If you are running a Linux based OS and running docker as a native process, you will access the application via your Browser on the localhost IP address at port 80 (http://localhost).

If you are running OS X or Windows, you will first need to get the IP address of the container the app is running in. In order to get this info, from the cli issue this command:

    $ docker-machine ip

open your Browser of choice and navigate to the IP address specified (the default is usually http://192.168.99.100) and the Aquiferium should load.

## Deploy from Source ##

### Getting Started ###

* Setup
* Configuration
* Dependencies
* Database
* Local Deployment
* Server Deployment
* Known Issues

#### Setup ####
1. Clone the repo.
2. npm install
3. bower install
4. grunt serve (for local development)
5. grunt build (for production build)

#### Configuration ####
There is no configuration required for this application beyond a traditional webserver setup. 

#### Dependencies ####
The Aquiferium uses many current libraries and frameworks to enable its functionality. The complete list is located within the package.json file (for the server/development environment dependencies) and the bower.json file (for the client-side dependencies).

#### Database ####
The Aquiferium does not use a database. It is a lightweight application that loads simple external geojson and csv data for display and interaction.

#### Local Deployment ####
To deploy the Aquiferium on your local system, follow these steps:

1. Navigate to the root of the project where the Grunfile.js is located.
2. In the cli from the root of the project run the command:
    $ grunt serve
3. Once the application builds and loads, it should automatically open a browser window to http://localhost:9000 or http://0.0.0.0:9000 revealing the Aquiferium application running locally.

#### Server Deployment ####
To deploy the Aquiferium on a live webserver, once the basic webserver configuration has been completed and the test page is visible, follow these steps:

1. Build the Aquiferium project (grunt build).
2. Copy the 'dist' folder contents into the public_html or www directory of your webserver.
3. Also copy the contents of the folder 'build_addon' into the public_html or www directory. If prompted, choose to merge the addon folder contents with the dist folder contents in the public_html or www directory.
4. You should now be able to access the Aquiferium application at the url or IP of the webserver.

#### Known Issues ####

1. chrome-cast error: This is a known bug in the chrome-cast library that is referenced by the you-tube content in the Aquiferium. It is a non-issue and has no operational impact on the application, however Google has formally stated that it will not be fixing the bug that causes the unwanted logging output in the browser console. Until something changes on Googles end, these console messages will appear.

The manual copy & paste steps above mitigate missing build paths for deployment but do not resolve the issue as it occurs during the build phase.

Future iterations will attempt to remove these constraints from the build process or replace the offending components with alternative workable versions.

### Points of Contact ###

* Encompass Project - http://www.encompassproject.org
* Dr. Suzanne Pierce (PI) - spierce@tacc.utexas.edu 
* John Gentle (Lead Dev) - jgentle@tacc.utexas.edu