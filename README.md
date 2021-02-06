## Usage instructions:
The latest version of application is running at https://maplaces.herokuapp.com . New places can be added using the form on the left side above place list. After place is visible in the listing it can be edited or deleted using buttons in the far right side. Input fields for coordinates and opening hours are validated on the front-end side.

Input fields "Filter title" and "Show places open at" can be used for filtering
places. Separately or at the same time.

Also, app API is available with following url endigs:

/api/places
/api/places/:id


## Installation instructions:

Local installation requires node.js installed. Source code can be downloaded from https://github.com/leppone/maplaces . After source code is received, reference packages need to be installed using command "npm update". When updates are ready, application can be started with command "heroku local web". Applications starts running on port 5000 as indicated when server is launced.

Also, folder "requests" in the source code contains examples of HTTP-queries which can be utilized for handling data in the database. Same requests can be executed in "Visual Studio Code"-editor using "REST Client" extension.

