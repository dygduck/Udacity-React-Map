import React, { Component } from 'react'
import './Header.css'

class Menu extends Component {

  switchMenu = () => {
    const menu = document.querySelector('aside')
    menu.classList.toggle("toggle")
  }

  render() {

    return (
      <header>
        <span className="switch-menu fas fa-bars" onClick={this.switchMenu}></span>
        <h1 className="title">Mountain View Coffee Shops</h1>
      </header>
    )
  }
}

export default Menu