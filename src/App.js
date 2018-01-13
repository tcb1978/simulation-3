import React, { Component } from 'react'
import './App.css'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Home from './Home'
import AccountInfo from './AccountInfo'
import Dashboard from './Dashboard'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <div>
            <Route exact path="/(access_token.*)?" component={Home} />
            <Route path="/private" component={AccountInfo} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </Switch>
      </HashRouter>
    )
  }
}

export default App
