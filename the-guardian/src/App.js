import React, { Component } from 'react';
import './App.css';
import Archives from './components/Archives';
import LargeFocusCard from './components/LargeFocusCard';
import SmallFocusCard from './components/SmallFocusCard';
import MediumCard from './components/MediumCard';
import SmallCard from './components/SmallCard';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={ newsDataAvailable: true,   //start with archived data. 
                 largeFocusCards: [],
                 smallFocusCards: [],
                 articleCards: [],   //Used for actual rendering: For every 3 medium cards, put in 1 small card
                //  mediumCards: [],
                //  smallCards: [],
                 newsData: Archives.splice(0, 20),        //news archives stores previous news to overcome the 10 items limit per request
                 newsPillarCounts: {},
                 newsDataByPillars: {},
                 newsCardsByPillars: {} };

// this.getNewsFromTheNews=this.getNewsFromTheNews.bind(this);
    this.sortGuardianNewsPillarandCount=this.sortGuardianNewsPillarandCount.bind(this);
    this.getNewsFromTheGuardian=this.getNewsFromTheGuardian.bind(this);
    this.determineNewsCardTypes=this.determineNewsCardTypes.bind(this);
    this.layoutNewsSection=this.layoutNewsSection.bind(this);
  }

  determineNewsCardTypes(newsItems) {  //arbitrarily decide the card type for news data
                                       //layout the cards calling each card component type

    //Each news section must have 1 large focus card and a small focus card.
    //   The rest are medium cards and small cards at a ratios of 3:1

    let newsItemCnt=newsItems.length;

    let cardCollectionObj={         //collection of news cards to be returned
                largeFocusCards: [],
                smallFocusCards: [],
                articleCards: [] 
    };

    //Create focus cards only when there are sufficient news items
    if (newsItemCnt >= 6) {
      let largeFocusCardCnt=1; //Each large focus card takes 4 stories
      let smallFocusCardCnt=1; //Each small focus card takes 2 stores
      newsItemCnt-=(4 + 2);    //6 stories used so far
  
      //Fill state with news items for large focus card, small focus card, medium cards and small cards 
      let bigFocusNews=[ [ newsItems[0], newsItems[1], 
                           newsItems[2], newsItems[3] ] ];
      let smFocusNews=[ [ newsItems[4], newsItems[5] ] ];
    
      //Layout large and small focus cards 
      const bigFocusCards=bigFocusNews.map(LargeFocusCard);
      const smFocusCards=smFocusNews.map(SmallFocusCard);


      cardCollectionObj.largeFocusCards=bigFocusCards;
      cardCollectionObj.smallFocusCards=smFocusCards;

      this.setState( {largeFocusCards: bigFocusCards} );
      this.setState( {smallFocusCards: smFocusCards} );

    } 

    //The rest are medium cards and small cards. They are all layout in articles array
    let mediumCardRate=0.75;
    let smallCardRate=1-mediumCardRate;

    let mediumCardCnt=Math.floor(newsItemCnt*mediumCardRate);
    let smallCardCnt=Math.floor(newsItemCnt*smallCardRate);

    //each medium card has 1 news item.
    let medNews=[]; let smNews=[];
    let i=0;
    for ( ; i<mediumCardCnt; i++) {
      medNews.push(newsItems[i]);
    }
    newsItemCnt-=mediumCardCnt; 

    //each small card has up to 2 news items. So each elem in smNews is an array of 1 to 2 small news items.
    let j=0;
    for (let i=0 ; i<newsItemCnt; i=i+2) {
      smNews[j]=[ newsItems[i] ];  //create each smNews elem is an array of small news items
      if (i+1 <newsItems.length) {
        smNews[j]=smNews[j].concat([ newsItems[i+1] ]);  //add the 2nd small news items
      }
      j++;
    }

    //Layout medium and small cards
    const medCards=medNews.map(MediumCard);
    const smCards=smNews.map(SmallCard);
    const articles=[];
    //for every 3 medium cards, put in 1 small card.
    let medCardIdx=0; let smCardIdx=0;
    for (let i=0; i < medCards.length+smCards.length; i++) {
      //if i is divible by 3 (and not zero), add small card
      if ( (i+1) % 4 == 0 )  {
        articles[i]=smCards[smCardIdx];
        smCardIdx++;
      } else {
        articles[i]=medCards[medCardIdx];
        medCardIdx++;
      }
     }

     cardCollectionObj.articleCards=articles;

     this.setState({articleCards: articles});

// this.setState( {mediumCards: medCards} );
// this.setState( {smallCards: smCards} );

     return cardCollectionObj;   //return an object containing an array for each card type
    
  }

//fill this.state.newsPillarCounts with an object of counts of pillars (news type)
  sortGuardianNewsPillarandCount() {

    if (!this.state.newsDataAvailable) {  //no news data to sort
      return; 
    }

    this.setState({newsPillarCounts: {}}); //initialize the counts
    this.setState({newsDataByPillars: {}}); //initialize the news items per pillar

    for (let i=0; i<this.state.newsData.length; i++) {
      let pName=this.state.newsData[i].pillarName;
      let pCounts=this.state.newsPillarCounts;
      let pNewsItems=this.state.newsDataByPillars;

      //Increment or add a new counter (initialized to 1)
      let countObj=pName in pCounts ? {[pName] : this.state.newsPillarCounts[pName]+1 } : {[pName] : 1 };
      
      //Append to pillar news items or create a new pillar with array of 1 elem
      let newsDataByPillarObj={}
      if (pName in pNewsItems) {
        newsDataByPillarObj = {[pName] : pNewsItems[pName] };
        newsDataByPillarObj[pName].push( this.state.newsData[i]);
      } else {
        newsDataByPillarObj = {[pName] : [ this.state.newsData[i] ] };
      }
      
      Object.assign(this.state.newsPillarCounts, countObj); //merge the counter object to existing counters in this.state.newsPillarCounts
      Object.assign(this.state.newsDataByPillars, newsDataByPillarObj); //merge the pillar news items object to existing pillars in this.state.newsDataByPillars
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

  layoutNewsSection(pillarName) { //Layout all news cards for a given news pillar type

    if (pillarName in this.state.newsDataByPillars) {
      let cardsObj=this.determineNewsCardTypes(this.state.newsDataByPillars[pillarName]);
      this.setState( {newsCardsByPillars: cardsObj } );
    }
  } 

  getNewsFromTheGuardian() {
    
    fetch("https://content.guardianapis.com/search?number=4&api-key=66e07eb6-9651-459d-a349-2d24533858b7")
      .then(response => response.json()) // first response => resolved
      .then(
        result => {
          console.log(result.response)

          this.setState({
            newsDataAvailable: true,
//  newsData: this.state.newsData.concat(result.response.results.slice(0,6))  //take only 2 elem for now

            newsData: this.state.newsData.concat(result.response.results)
          })


          //sort news items for each pillar type found and count the number of items for each pillar 
          this.sortGuardianNewsPillarandCount(); 
          console.log("news data:",this.state.newsData);
          console.log("news pillar counts:",this.state.newsPillarCounts);

          let pillar="";
          for (pillar in this.state.newsDataByPillars) {
             this.layoutNewsSection(pillar); //layout all cards for a pillar in newsDataByPillars state
          }
          
this.determineNewsCardTypes(this.state.newsData);
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

          {/* Front Page Section */}
          <div className="navBarContainer">

          </div>
          <div className="NewsSectionContainer">

            <div className="LeftColContainer">  
            </div>

            <div className="NewsContainer">


              {/* <div className="FocusContainer">    
                {this.state.newsCardsByPillars['News']['largeFocusCards']}  
                {this.state.newsCardsByPillars['News']['smallFocusCards']}      
              </div>
              <div className="ArticlesContainer"> 
                {this.state.newsCardsByPillars.News.articleCards}
              </div> */}

              <div className="FocusContainer">    
                {this.state.largeFocusCards}  
                {this.state.smallFocusCards}      
              </div>
              <div className="ArticlesContainer"> 
                {this.state.articleCards}
  {this.state.mediumCards}
  {this.state.smallCards}
              </div>


            </div>  

          </div>
        </div>
      );
    }
}
