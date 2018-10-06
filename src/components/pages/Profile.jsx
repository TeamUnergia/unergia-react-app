import React, { Component } from 'react';
import Jumbotron from '../Jumbotron/Jumbotron.jsx';
import firebaseApp from '../firebase/firebaseApp';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      funds: null,
      contribution: null,
      energyValue: null
    }
  }

  componentDidMount() {
    var FUNDS = firebaseApp.database().ref('/funds/')
    FUNDS.on( "value", (snapshot)=>{
        this.setState({
            funds: snapshot.val()
        });
    })

    var CONT = firebaseApp.database().ref('/contributers/acc_B2wwUI4PTPQP5A')
    CONT.on( "value", (snapshot)=>{
        this.setState({
          contribution: snapshot.val()
        });
    })

    fetch('http://13.76.135.254:4000/energyVal')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({
            energyValue: responseJson
          })
        })
        .catch((error) => {
          console.error(error);
        });
  }

  render() {
    return (
      <div>
        <Jumbotron title="Profile"/>


        <div className="container"style={{
          paddingLeft: '20rem'
        }} >
          <div class="card" style={{width: '30rem'}}>
          <div class="card-header">
              <h5 style={{color: '#181818'}}> <b>Pavagada Solar Park project</b></h5>
          </div>
            <div class="card-body">
              {/* <h3 class="card-title">Pavagada Solar Park project</h3> */}
              {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
              <p class="card-text"><b>Paying price per KW:</b><br></br></p>
              <p class="card-text"><b>Energy Value:</b> <br></br>{this.state.energyValue} </p>
              {/* <p class="card-text"><b>KW generated since investment:</b><br></br></p> */}
              <p class="card-text"><b>Your contribution:</b><br></br> {this.state.contribution}  Rupees</p>
              <p class="card-text"><b>Total share percentage:</b><br></br>{(this.state.contribution / this.state.funds)*100}  %</p>
              {/* <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a> */}
            </div>
        </div>
        </div>

        
      </div> 
    );
  }
}

export default Profile