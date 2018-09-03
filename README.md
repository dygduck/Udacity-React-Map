# Cafes of Mountain View
---

## Description:
This web-app is created as a part of UDACITY Nanodegree Front End Course. It displays a Google Map with markers. A clik on each marker displays info about these marked places.

## How to run:
The project uses Node.js and the Create-React-App starter.  If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed:
```
git clone https://github.com/dygduck/Udacity-React-Map
```
Once you successfully cloned, you can go to the directory:
```
`cd Udacity-React-Map`

Install the dependencies:
```
npm install
```
Once you successfully installed npm, you can run the app:
```
npm start
```

Open a browser window and navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

NOTE: Service worker bundled with create-react-app for this app will only work when the app is in production mode.

## Loading the App in Production Mode:
To run the app in production mode run:
```
npm run build
```
Please go to the build directory and start a localhost with python
```
python -m SimpleHTTPServer 8000
```
Open a browser window and navigate to [http://localhost:8000](http://localhost:8000) in your browser

## API s used:
This app uses Google Maps and Foursquare's API to list some cafes in Mountain View.


In order to solve script loading problem in React I am inspired by:

https://www.fullstackreact.com/articles/Declaratively_loading_JS_libraries/index.html

In ordeer to fetch API I used Axios:

https://github.com/axios/axios