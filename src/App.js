import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import List from './List'
import Map from './Map'
import Header from './Header'

class App extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      places: [],
      filteredPlaces: [],
      markers: [],
      latLong: "37.3937, 122.0789",
      query: ''
    };
  }

  componentDidMount() {
    this.receivePlaces('food', 'mountain view, ca')
  }

  updateQuery = (query) => {
    if (query && query !== this.state.query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      const places = this.state.places.filter((place) => match.test(place.venue.name));
      this.setState({ filteredPlaces: places, query }, this.updateMarkers);
    } else {
      this.setState({ filteredPlaces: this.state.places, query }, this.updateMarkers);
    }
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
        const places = response.data.response.groups[0].items;
        console.log(places);
        this.setState({ places, filteredPlaces: places }, this.loadMap);
      })
      .catch(error => {
        console.log("ERROR!! " + error)
        alert("Sorry, but we can not receive data from Foursquare momentarily.");
      });
  }

  loadMap = () => {
    // loads the script that we pass
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAT3TloPrfT8sAQ5e1391LJlPBoTy6uLj8&callback=initMap')
    window.initMap = this.initMap
  }




  initMap = () => {
    // creates the google map
    try {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.3861, lng: -122.0839},
        zoom: 13
      });
    }
    catch (err) {
      alert("Sorry, but we can not receive data from Google Maps momentarily.");
      return;
    }

    // creates an info window for marked points
    var infowindow = new window.google.maps.InfoWindow();

    // shows the markers on the map
    const markers = this.state.places.map((place) => {
      // creates a marker for the places
      var marker = new window.google.maps.Marker({
        position: {
          lat: place.venue.location.lat,
          lng: place.venue.location.lng
        },
        map: this.map,
        title: place.venue.name
      });

      // creates content strings
      var contentString = `
                      <h1>${place.venue.name}</h1>
                      <p>Address: ${place.venue.location.formattedAddress[0]}
                      ${place.venue.location.formattedAddress[1]}
                      ${place.venue.location.formattedAddress[2]}</p>
                      <a href="${'https://foursquare.com/v/'+place.venue.id}" target="_blank">View on FourSquare</a>
                      `
      // sets the content for infowindow and opens it once clicked to the marker
      marker.addListener('click', function() {
        if (marker.getAnimation() != null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
        infowindow.setContent(contentString)
        infowindow.open(this.map, marker);
      });

      return { id: place.venue.id, marker };
    });

    this.setState({ markers });
  }

  updateMarkers = () => {
    const venueIds = this.state.filteredPlaces.map(fp => fp.venue.id);
    this.state.markers.forEach(m => {
      if (venueIds.indexOf(m.id) > -1) {
        m.marker.setMap(this.map);
      } else {
        m.marker.setMap(null);
      }
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <main>
          <List
            places={this.state.filteredPlaces}
            query={this.state.query}
            setQuery={this.updateQuery}
            markers={this.state.markers}
          />
          <Map />
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
