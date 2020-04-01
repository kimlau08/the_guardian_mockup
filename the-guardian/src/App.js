import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={ newsDataAvailable: false,
                 newsData: [],
                 newsPillarCounts: {} };

    this.getNewsPillarCounts=this.getNewsPillarCounts.bind(this);
  }

  //fill this.state.newsPillarCounts with an object of counts of pillars (news type)
  getNewsPillarCounts() {
    if (!this.state.newsDataAvailable) {  //no news data to check
      return; 
    }

    this.setState({newsPillarCounts: {}}); //initialize the counts

    for (let i=0; i<this.state.newsData.length; i++) {
      let pName=this.state.newsData[i].pillarName;
      let pCounts=this.state.newsPillarCounts;

      //Increment or add a new counter initialized to 1
      let countObj=pName in pCounts ? {[pName] : this.state.newsPillarCounts[pName]+1 } : {[pName] : 1 };
      
      Object.assign(this.state.newsPillarCounts, countObj); //merge the counter object to existing counters
    }
  }
  
  componentDidMount() {
    fetch("https://content.guardianapis.com/search?number=4&api-key=66e07eb6-9651-459d-a349-2d24533858b7")
      .then(response => response.json()) // first response => resolved
      .then(
        result => {
          console.log(result.response)

          this.setState({
            newsDataAvailable: true,
            newsData: result.response.results
          })


          this.getNewsPillarCounts();
          console.log("news data:",this.state.newsData);
          console.log("news pillar counts:",this.state.newsPillarCounts);
        }
      ).catch(e => console.log("there's a error", e))

  }

  render() {
      return (
        <div className="App">

        
        </div>
      );
    }
}
