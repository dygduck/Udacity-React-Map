import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Menu from './Menu'
import Map from './Map'
import Header from './Header'

class App extends Component {

  state = {
    allPlaces: [], 
    places: [],
    markers: [],
    latLong: "37.3937, 122.0789"
  }

  componentDidMount() {
    this.receivePlaces('coffee', 'mountain view, ca')
  }

  
  receivePlaces = (query, location) => {
    var endPoint = "https://api.foursquare.com/v2/venues/explore?"
    var parameters = {
      client_id: '22UAP1EQ4IKHNFHGBQEHYQYB4U3F15IIYMJO1UPI41TR5NRN',
      client_secret: 'PHQZ015LQA15N1FO2NLYSNVMPEMJOIU53FM3FYLJXELC3T52',
      near: location,
      query: query,
      v: '20182508'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    // use the axios to fetch the api
      .then(response => {
        this.setState({
          allPlaces: response.data.response.groups[0].items,
          places: response.data.response.groups[0].items
        }, this.loadMap)
      })
  }

  loadMap = () => {
    // loads the script that we pass
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAT3TloPrfT8sAQ5e1391LJlPBoTy6uLj8&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => {
    // creates the google map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.3861, lng: -122.0839},
      zoom: 13
    });

    // creates an info window for marked points
    var infowindow = new window.google.maps.InfoWindow();

    // shows the markers on the map
    this.state.places.map((place) => {
      // creates a marker for the places
      var marker = new window.google.maps.Marker({
        position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
        map: map,
        title: place.venue.name
      });

      // add created markers to the markers array
      this.state.markers.push(marker)

      // creates content strings
      var contentString = `
                      <h1>${place.venue.name}</h1>
                      <p>Address: ${place.venue.location.formattedAddress[0]} 
                      ${place.venue.location.formattedAddress[1]} 
                      ${place.venue.location.formattedAddress[2]}</p>
                      `
      // sets the content for infowindow and opens it once clicked to the marker
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      });
    })
  }

  setPlaces = (updatedPlaces) => {
        this.setState({places: updatedPlaces})
  }

  render() {
    return (
      <div>
        <Header/>
        <main>
          <Menu 
            places={this.state.allPlaces} 
            markers={this.state.markers} 
            setPlaces={this.setPlaces}
          />
          <Map/>
        </main>
      </div>
    )
  }
}

function loadScript(src) {
  var index  = window.document.getElementsByTagName('script')[0];
  var tag = window.document.createElement('script');
  tag.src = src;
  tag.async = true;
  tag.defer = true;
  index.parentNode.insertBefore(tag, index);
}


export default App;
