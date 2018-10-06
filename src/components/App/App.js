import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import firebaseApp from '../firebase/firebaseApp';
import axios from 'axios';
import Razorpay from 'razorpay';

class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      funds:null,
      cost: null,
      contributionAmount: null,
      contributers: []
    }
  }

  componentWillMount() {
    this.getFunds()
    this.getContributers()
  }

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

  stateUpdate = (list) => {
    this.setState({
      contributers: list
    })
  }

  getContributers =() => {
    // var list = [];
    var query = firebaseApp.database().ref("contributers").orderByKey();
    query.once("value", (snapshot) => {
      this.setState({
        contributers : snapshot.val()
      })
    })
  }

  handleMakeContribution = (event) => {
    event.preventDefault();
  }

  handleChangeContributionAmount = (event )=>  {
    this.setState({ contributionAmount: event.target.value });
  }

  contribute = () => {
    var money = this.state.funds+ parseFloat(this.state.contributionAmount);
    var newA = parseFloat(this.state.contributers['acc_B2wwUI4PTPQP5A']) + parseFloat(this.state.contributionAmount);
    console.log(newA)

    var options = {
      "key": "rzp_test_pfLwQaQlpTkO6w",
      "amount": this.state.contributionAmount*100, // 2000 paise = INR 20
      "name": "Unergia",
      "description": "Contribute",
      "image": "/your_logo.png",
      "handler": (response) => {
          alert(response.razorpay_payment_id);
          firebaseApp.database().ref('/funds/').set(money);
          firebaseApp.database().ref('/contributers/acc_B2wwUI4PTPQP5A').set(newA).then(this.update);
      },
      "prefill": {
          "name": "Harshil Mathur",
          "email": "harshil@razorpay.com"
      },
      "notes": {
          "address": "Hello World"
      },
      "theme": {
          "color": "#F37254"
      }
    };

    var instance = new window.Razorpay(options)
    instance.open();
  }

  update = () => {
    var newA = parseFloat(this.state.contributers['acc_B2wwUI4PTPQP5A']) + parseFloat(this.state.contributionAmount);
    console.log(newA)
    var list = this.state.contributers;
    list['acc_B2wwUI4PTPQP5A'] = newA;
    this.setState({
      contributionAmount: 0,
      contributers: list
    })
  }

  render() {
    console.log(this.state.contributers)

    return (
      <div className="App">
        <br></br>        
        <p className="App-intro">
          <b>Total funds available :</b> {this.state.funds}
        </p>

        <p className="App-intro">
          <b>Total expenditure :</b> {this.state.cost}
        </p>

        <p className="App-intro">
        <b>Profit : </b> {this.state.funds - this.state.cost}
        </p>
        <input type="number" value={this.state.contributionAmount || 0} 
                    aria-label="Amount (to the nearest paisa)" onChange={this.handleChangeContributionAmount} />
                  
        <button onClick={this.contribute} >Contribute</button>
        <br></br>
        <a href='http://13.76.135.254:3000' >Check the Energy Values</a>
        <br></br>
        <br></br>
        <h4><b>Contributions</b></h4>
        
        <p>{this.state.contributionAmount}</p>
        {
          _.map(this.state.contributers, ( money, key) => {
            return <p> <b>{key}</b> : {money} ({money/this.state.funds*100}%)</p>
          })
        }
        <br></br>
        <br></br>
        <div style={{alignContent: 'right'}}>
           <p><h5><b>Logged In :</b></h5> acc_B2wwUI4PTPQP5A</p>
        </div>
      </div>
    );
  }
}

export default App;
