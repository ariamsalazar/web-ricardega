import React from 'react';

import Home from './Components/Home';
import './assets/css/styles.scss';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
