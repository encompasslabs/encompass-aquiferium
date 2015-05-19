# Aquiferium #

The Aquiferium is a collaboration between the Encompass Project (UT Austin) and the Edwards Aquifer Authority to create an interactive Single Page Application (SPA) using cutting-edge web technologies for geo-data display as both an educational and a stakeholder resource for better understanding and governance of the aquifer system. The codebase is built entirely upon open-source technologies described under dependencies. Setup and usage is as follows.

### General Information ###

* Project Lifecycle: February 2014 - December 2014
* Version: 1.0.0

### Getting Started ###

* Setup
* Configuration
* Dependencies
* Database
* Deployment
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

#### Deployment ####
To deploy the Aquiferium on a live webserver, once the basic webserver configuration has been completed and the test page is visible, follow these steps:

1. Build the Aquiferium project (grunt build).
2. Copy the 'dist' folder contents into the public_html or www directory of your webserver.
3. Also copy the following resources into the public_html or www directory:
3a. /bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*
3b. /bower_components/leaflet/dist/images
3c. /app/data/geojson/* (just copy the data folder branch and its children into your webserver root)
3d. /app/images/directives/* (copy the unrevved image files into the root/images/* directory)

Notes: 

You will need the full paths shown in 3a & 3b to exist in your public_html or www root directory. 

For 3c and 3d just copy the folders after /app/ into your webroot.

#### Known Issues ####

1. Font-Awesome: The use of font-awesome icons in bootstrap with Angular does not properly build in the current iteration of this framework. 

2. Leaflet: The same goes for leaflet icons. 

3. Broken content views: This is the result of an upgrade conflict between some of the framework libraries. It is being sorted out currently. Local development builds should still run as expected, but for deployment there are still dependencies (skrollr namely) that are not properly being written into the build output.

The manual copy & paste steps above mitigate problems 1 & 2 for deployment but do not resolve them during the build phase. 

Future iterations will attempt to remove these constraints from the build process or replace the offending components with alternative workable versions.

### Points of Contact ###

* Encompass Project - http://www.encompassproject.org
* Dr. Suzanne Pierce (PI) - spierce@tacc.utexas.edu 
* John Gentle (Lead Dev) - jgentle@tacc.utexas.edu