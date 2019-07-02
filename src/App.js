import React, { Component } from 'react';
import M from 'materialize-css';
import ImagenDelDia from './imagenDelDia';
import MarsRover from './MarsRover';
import Earth from './Earth';


class App extends Component {

  componentDidMount() {
    let el = document.querySelectorAll('.tabs');
    M.Tabs.init(el, {

    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3"><a href="#test1">Imagen del Dia</a></li>
              <li className="tab col s3"><a className="active" href="#test2">Mars Rover</a></li>
              <li className="tab col s3"><a href="#test3">Planeta Tierra</a></li>
              <li className="tab col s3"><a href="#test4">Asteroides</a></li>
            </ul>
          </div>
          <div id="test1" className="col s12">
            <ImagenDelDia />
          </div>
          <div id="test2" className="col s12">
            <MarsRover />
          </div>
          <div id="test3" className="col s12">
            <Earth />
          </div>
          <div id="test4" className="col s12">
            Asteroides....
          </div>
        </div>
      </div>
    )
  }
}

export default App;
