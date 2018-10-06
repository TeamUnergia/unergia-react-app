import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link class="navbar-brand" to="/">Unergia</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/details">Contribute</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;