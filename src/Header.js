import React, { Component } from 'react'
import './App.css'

class Menu extends Component {

  switchMenu = () => {
    var list = document.querySelector('section')
    list.classList.toggle("toggle")
  }

  render() {

    return (
      <header>
        <span className="switch-menu fas fa-bars" onClick={this.switchMenu}></span>
        <h1 className="title">Mountain View Cafes</h1>
      </header>
    )
  }
}

export default Menu