import React, { Component } from 'react'
import './App.css'
import escapeRegExp from 'escape-string-regexp'

// Places Data
class List extends Component {

    state = {
        query: '',
        places: this.props.places
    }

    updateQuery = (query) => {
        this.setState({ query })
        
        var venues = this.props.places
        var updatedPlaces

        if(this.state.query && (this.state.query !== '')) {
            const match = new RegExp(escapeRegExp(query), 'i');
            updatedPlaces = venues.filter((place) => match.test(place.venue.name))
            this.setState({places: updatedPlaces})
            this.props.setPlaces(updatedPlaces)
        } else {
            this.setState({places: venues})
        }
    }

    setMarkerClick = (placeTitle) => {
        this.props.markers.map((marker) => {
            if(marker.title === placeTitle) {
                window.google.maps.event.trigger(marker, 'click');
            }
        })
    }

    render() {
        return (
            <section>
                <div className="searchplace">
                    <label htmlFor="searchQuery">Seach for cafes</label>
                    <input 
                        id="searchQuery" 
                        type="text" 
                        placeholder="Please Enter" 
                        onChange={(e) => this.updateQuery(e.target.value)} 
                        value={this.state.query}
                    />
                </div>

                {this.state.places.length !== 0 && (
                    <ul className="result">
                        {this.state.places.map((place, index) => (
                            <li 
                                key={index}
                                tabindex={index}
                                className="item" 
                                onClick={() => this.setMarkerClick(place.venue.name)}
                            >
                                {place.venue.name}
                            </li>
                        ))}
                    </ul>
                )}

                {this.state.places === 0 && (
                    <ul className="result">
                        <li className="item">oops sorry, nothing found..</li>
                    </ul>
                )}
                
            </section>

        )
    }
}

export default List