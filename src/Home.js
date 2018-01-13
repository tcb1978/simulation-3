import React, { Component } from 'react'
import './Home.css'
import Auth0Lock from 'auth0-lock'
import axios from 'axios'
import { login } from './ducks/reducer'
import { connect } from 'react-redux'
import logo from './logo.png'

class Home extends Component {
    constructor() {
        super()
        this.lock = null
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        this.lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN)
        console.log('this.lock', this.lock)
        this.lock.on('authenticated', authResult => {
            this.lock.getUserInfo(authResult.accessToken, (error, user) => {
                axios.post('/login', { userId: user.sub }).then(response => {
                    this.props.login(response.data.user)
                    this.props.history.push('/private')
                })
            })
        })
    }

    login() {
        this.lock.show()
    }

    render() {
        return (
            <div className="home gradient view-height">
                <div className="login orange-to-yellow-gradient">
                    <div className="authorization-logo-container">
                        <img src={logo} className="logo" alt="logo" />
                        <div className="auth-logo-text open-sans-bold">Helo</div>
                    </div>
                    
                    <button onClick={this.login} className="btn-login open-sans auth-link-bg open-sans black-bgc ">Login / Register</button>
                    
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = {
    login: login,
}

export default connect(null, mapDispatchToProps)(Home)