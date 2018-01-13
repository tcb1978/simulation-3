import React, { Component } from 'react'
import './App.css'
import './Header.css'
import home from './home.png'
import search from './search.png'

class Header extends Component {

    render() {
        return (
            <header className="header orange-gradient">
                <section className="header-child-container">
                    <div className="inner-header-right">
                        <span className="title open-sans-bold">Helo</span>
                        <a href="/"><img src={home} className="home-icon" alt="home" /></a>
                        <a href="/search"><img src={search} className="search" alt="search" /></a>
                    </div>
                    <div className="inner-header-center">
                        <span className="open-sans header-text-elements"></span>
                    </div>
                    <div className="inner-header-left row-reverse">
                        <span className="header-text-elements">Logout</span>
                    </div>
                </section>
            </header>
        )
    }
}

export default Header