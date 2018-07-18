# Neighborhood Map:

A single-page application featuring a map of the RiyadhCity Neighborhood.

## How to Load the App in Development Mode:
The project uses Node.js and the Create-React-App starter. 

Once Node is installed, navigate to the project directory 

```
->npm install
```

Once all of the dependencies have been installed you can launch the app with

```
->npm start
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to http://localhost:3000/ in your browser

### NOTE:
The service workers for this app will only cache the site when it is in production mode.

## How to Load the App in Production Mode:

To run the app in production mode locally run:
```
->npm run build
```

Navigate to the build directory and run a localhost server. You can use Node serve. If you do not have it installed you can install it with:

```
->npm install -g serve
```

and then navigate into the build directory and run

```
->serve -s
```

In this case the site will be hosted at http://localhost:3000

## How to Use the App:

The app will load displaying a map with markers for some locations and a list of locations in the sidebar
Click on a map marker or name on the restaurant list to get details about each location

## Resources and Documentation:
* Create-react-app Documentation
* React API
* stackoverflow: How to load the Google Maps API script in my React app
* React-script-loader
* Foursquare API - Venue Search
* Foursquare API - Venue Details


