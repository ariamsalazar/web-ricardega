import React from 'react';

import Home from './Components/Home';
import Admin from './Components/Admin';
import './assets/css/styles.scss';
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  render(){
    return (
      <Switch>
        {/* <!-- Routes for the App --> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
    </Switch>
    );
  }
}

export default App;
