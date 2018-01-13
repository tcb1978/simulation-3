import React, { Component } from 'react'
import './App.css'
import './Dashboard.css'
import Header from './Header'
import me from './me.png'

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard-view">
                <Header />
                <div className="view-height dash-parent">
                    <div className="dash-child">
                        <div className="dash-top-row">
                            <div className="dash-top-left">
                                <div className="dash-profile-avatar">
                                    <img src={ me } alt="avatar"/>
                                </div>
                                <div className="dash-profile-profile">
                                    <div className="user-name">Matthew Eldredge</div>
                                    <div className="edit-profile-link"><button>Edit Profile</button></div>
                                </div>
                            </div>
                            <div className="dash-top-right">
                                <p className="dash-welcome">Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                            </div>
                        </div>
                    </div>
                    <div className="dash-child"></div>
                </div>
            </div>
        )
    }
}

export default Dashboard