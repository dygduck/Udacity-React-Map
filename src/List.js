import React, { Component } from 'react'
import './App.css'

// Places Data
class List extends Component {
   updateQuery = (e) => {
     this.props.setQuery(e.target.value);
   }

    setMarkerClick = (placeTitle) => {
        this.props.markers.map((m) => {
            if(m.marker.title === placeTitle) {
                window.google.maps.event.trigger(m.marker, 'click');
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
                        onChange={this.updateQuery}
                        value={this.props.query}
                    />
                </div>

                {this.props.places.length !== 0 && (
                    <ul className="result">
                        {this.props.places.map((place, index) => (
                            <li
                                key={index}
                                tabIndex={index}
                                className="item"
                                onClick={() => this.setMarkerClick(place.venue.name)}
                            >
                                {place.venue.name}
                            </li>
                        ))}
                    </ul>
                )}

                {this.props.places === 0 && (
                    <ul className="result">
                        <li className="item">oops sorry, nothing found..</li>
                    </ul>
                )}

            </section>

        )
    }
}

export default List
