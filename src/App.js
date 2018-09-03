import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class App extends Component {

  state = {
    venues: [],
    places: [],
    markers: [],
    latLong: "37.3937, 122.0789"
  }

  componentDidMount() {
    this.getPlaces('coffee', 'mountain view, ca')
  }

  
  getPlaces = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: '22UAP1EQ4IKHNFHGBQEHYQYB4U3F15IIYMJO1UPI41TR5NRN',
      client_secret: 'PHQZ015LQA15N1FO2NLYSNVMPEMJOIU53FM3FYLJXELC3T52',
      near: 'Istanbul',
      query: 'coffee',
      v: '20182508'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    // use the axios to fetch the api
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.loadMap())
      })
      .catch(error => {
        console.log(error)
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
      center: {lat: 41.0082, lng: 28.9784},
      zoom: 8
    });

    // creates an info window for marked points
    var infowindow = new window.google.maps.InfoWindow();

    // shows the markers on the map
    this.state.venues.map((myvenue) => {

      var contentString = `${myvenue.venue.name}`;

      // creates a marker for the places
      var marker = new window.google.maps.Marker({
        position: {lat: myvenue.venue.location.lat, lng: myvenue.venue.location.lng},
        map: map,
        title: myvenue.venue.name
      });

      // sets the content for infowindow and opens it once clicked to the marker
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
      });
    })
  }


  render() {
    return (
      <main>
        <div id='map'></div>
      </main> 
    );
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
