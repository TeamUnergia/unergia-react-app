import React, {Component} from 'react';
import _ from 'lodash';
import './ProjectPart.css';
import firebaseApp from '../firebase/firebaseApp';
import axios from 'axios';
import Razorpay from 'razorpay';

class ProjectPart extends Component {

  getFunds =() => {
    var FUNDS = firebaseApp.database().ref('/funds/')
    FUNDS.on( "value", (snapshot)=>{
        this.setState({
            funds: snapshot.val()
        });
    })

    var COST = firebaseApp.database().ref('/cost/')
    COST.on( "value", (snapshot)=>{
        this.setState({
            cost: snapshot.val()
        });
    })
    
  }


  render() {
    return(
      <div>
        <h3>Your total contribution : {this.state.totalContribution}}</h3>
        <h3>Total project funds : {this.state.totalFunds}}</h3>
        <h3>Your share : { (this.state.totalContribution / this.state.totalFunds)*100 }}</h3>
      </div>
    );
  }
}

export default ProjectPart;
