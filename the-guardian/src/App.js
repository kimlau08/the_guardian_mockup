import React, { Component } from 'react';
import './App.css';
import Archives from './components/Archives';
import MediumCard from './components/MediumCard'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={ newsDataAvailable: true,   //start with archived data. 
                 newsData: [],
                 newsCards: [],
      //    newsData: Archives,        //news archives stores previous news to overcome the 10 items limit per request
                 newsPillarCounts: {} };

// this.getNewsFromTheNews=this.getNewsFromTheNews.bind(this);
    this.getGuardianNewsPillarCounts=this.getGuardianNewsPillarCounts.bind(this);
    this.getNewsFromTheGuardian=this.getNewsFromTheGuardian.bind(this);
  }

//fill this.state.newsPillarCounts with an object of counts of pillars (news type)
  getGuardianNewsPillarCounts() {
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

// getNewsFromTheNews() {
//   let url = 'http://newsapi.org/v2/top-headlines?' +
//   'country=us&' +
//   'apiKey=61577a5ea94f409d90a90d889d581ec1';

//   let req = new Request(url);
//   fetch(req)
//   .then(function(response) {
//     console.log("News from News API", response.json());
//   })
// }

  getNewsFromTheGuardian() {
    
    fetch("https://content.guardianapis.com/search?number=4&api-key=66e07eb6-9651-459d-a349-2d24533858b7")
      .then(response => response.json()) // first response => resolved
      .then(
        result => {
          console.log(result.response)

          this.setState({
            newsDataAvailable: true,
  newsData: this.state.newsData.concat(result.response.results.slice(0,6))  //take only 2 elem for now

//            newsData: this.state.newsData.concat(result.response.results)
          })
          const cards=this.state.newsData.map(MediumCard);
          this.setState({newsCards: cards});

          this.getGuardianNewsPillarCounts();
          console.log("news data:",this.state.newsData);
          console.log("news pillar counts:",this.state.newsPillarCounts);
        }
      ).catch(e => console.log("there's a error", e))
  }
  
  componentDidMount() {

    //Get news from both API
    this.getNewsFromTheGuardian();
//    this.getNewsFromTheNews();
  }

  render() {
      return (
        <div className="App">
          <div className="NewsPageContainer">
           {this.state.newsCards}

          </div>
        </div>
      );
    }
}
