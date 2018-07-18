import React, { Component } from 'react';
import MyLocation from './MyLocation.json'
import './App.css';
import Mapinit from './initMap'



class App extends Component {
 state={
  Locations:[],
 }

  componentDidMount() {
       
    this.setState({Locations: MyLocation});

  }

  render() {
    return (
      <div  className="main">
        <Mapinit Locations={this.state.Locations}/>
      </div>
    )
  }
}

export default App;
