import React, { Component } from 'react';
import './App.css';
import Archives from './components/Archives';
import LargeFocusCard from './components/LargeFocusCard';
import SmallFocusCard from './components/SmallFocusCard';
import MediumCard from './components/MediumCard';
import SmallCard from './components/SmallCard';

import HeadlineNewsSection from './components/HeadlineNewsSection';
import SportNewsSection from './components/SportNewsSection';
import ArtsNewsSection from './components/ArtsNewsSection';

import newsImageStore, { spImageStore, artsImageStore } from './components/ImagesStore';

import config from './config/config';   //import API key

const newsKickerFont = {
  color: '#ff4e36',
  fontWeight: 'bold' 
}
const sportKickerFont = {
  color: '#0084c6',
  fontWeight: 'bold' 
}
const artsKickerFont = {
  color: '#a1845c',
  fontWeight: 'bold' 
}
const newsLargeFocusKickerFont ={
  color: '#ffbac8',
  fontWeight: 'bold' 
}
const sportLargeFocusKickerFont ={
  color: '#90dcff',
  fontWeight: 'bold' 
}
const artsLargeFocusKickerFont ={
  color: '#eacca0',
  fontWeight: 'bold' 
}


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state={ newsDataAvailable: true,   //start with archived data. 
                 newsData: Archives.slice(0, 30),        //news archives stores previous news to overcome the 10 items limit per request
                 newsLargeFocusCards: [],
                 newsSmallFocusCards: [],
                 newsArticleCards: [],   //Used for actual rendering: For every 3 medium cards, put in 1 small card
                 sportLargeFocusCards: [],
                 sportSmallFocusCards: [],
                 sportArticleCards: [],  
                 artsLargeFocusCards: [],
                 artsSmallFocusCards: [],
                 artsArticleCards: [],  
                 newsPillarCounts: {},
                 newsDataByPillars: {},
                 headlineSection: React.createRef(),
                 sportSection: React.createRef(),
                 artsSection: React.createRef(),
                };

    this.sortGuardianNewsPillarandCount=this.sortGuardianNewsPillarandCount.bind(this);
    this.getNewsFromTheGuardian=this.getNewsFromTheGuardian.bind(this);
    this.determineNewsCardTypes=this.determineNewsCardTypes.bind(this);
    this.layoutNewsSection=this.layoutNewsSection.bind(this);

    //Same page scroll traget
    this.handleHeadlineClick=this.handleHeadlineClick.bind(this);
    this.handleSportClick=this.handleSportClick.bind(this);
    this.handleArtsClick=this.handleArtsClick.bind(this);

    this.handleMouseOver=this.handleMouseOver.bind(this);
    this.changeSiblingStyling=this.changeSiblingStyling.bind(this);
  }

  determineNewsCardTypes(newsItems, pillarName) {  //arbitrarily decide the card type for news data
                                       //layout the cards calling each card component type

    //Each news section must have 1 large focus card and a small focus card.
    //   The rest are medium cards and small cards at a ratios of 3:1

    let newsItemCnt=newsItems.length;

    let kickerFont={};
    let largeFocusKickerFont={};
    let imageStore=[];
    //Select Kicker font and images based on news section
    switch (pillarName) {
      case "News" :
          kickerFont=newsKickerFont;
          largeFocusKickerFont=newsLargeFocusKickerFont;
          imageStore=newsImageStore;
        break;
      case "Sport" :
          kickerFont=sportKickerFont;
          largeFocusKickerFont=sportLargeFocusKickerFont;
          imageStore=spImageStore;
        break;
      case "Arts" :
          kickerFont=artsKickerFont;
          largeFocusKickerFont=artsLargeFocusKickerFont;
          imageStore=artsImageStore;
        break;
      default: 
          kickerFont=newsKickerFont;  //default to news kicker font
          largeFocusKickerFont=newsLargeFocusKickerFont;
          imageStore=newsImageStore;
        break;
    }


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
      // const bigFocusCards=bigFocusNews.map(LargeFocusCard);
      // const smFocusCards=smFocusNews.map(SmallFocusCard);

      const bigFocusCards=bigFocusNews.map(LargeFocusCard,  {kicker: largeFocusKickerFont, imageStore: imageStore});
      const smFocusCards=smFocusNews.map(SmallFocusCard,  {kicker: kickerFont, imageStore: imageStore});


      switch (pillarName) {
        case "News" :
                this.setState( {newsLargeFocusCards: bigFocusCards} );
                this.setState( {newsSmallFocusCards: smFocusCards} );
              break;
        case "Sport" :
                this.setState( {sportLargeFocusCards: bigFocusCards} );
                this.setState( {sportSmallFocusCards: smFocusCards} );
          break;
          case "Arts" :
                this.setState( {artsLargeFocusCards: bigFocusCards} );
                this.setState( {artsSmallFocusCards: smFocusCards} );
           break;
        default:
          break        
      }
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

    const medCards=medNews.map(MediumCard, {kicker: kickerFont, imageStore: imageStore});
    const smCards=smNews.map(SmallCard,  {kicker: kickerFont, imageStore: imageStore});
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


     switch (pillarName) {
      case "News" :
              this.setState({newsArticleCards: articles.slice(0, 2)});
            break;
      case "Sport" :
              this.setState({sportArticleCards: articles});
        break;
        case "Arts" :
              this.setState({artsArticleCards: articles});
         break;
      default:
        break        
    }
    
  }

//fill this.state.newsPillarCounts with an object of counts of pillars (news type)
  sortGuardianNewsPillarandCount() {

    if (!this.state.newsDataAvailable) {  //no news data to sort
      return; 
    }

    this.setState({newsPillarCounts: {}}); //initialize the counts
    this.setState({newsDataByPillars: {}}); //initialize the news items per pillar

    let pCounts=this.state.newsPillarCounts;
    let pNewsItems=this.state.newsDataByPillars;
    for (let i=0; i<this.state.newsData.length; i++) {
      let pName=this.state.newsData[i].pillarName;

      //Increment or add a new counter (initialized to 1)
      let countObj=pName in pCounts ? {[pName] : pCounts[pName]+1 } : {[pName] : 1 };
      
      //Append to pillar news items or create a new pillar with array of 1 elem
      let newsDataByPillarObj={};
      if (pName in pNewsItems) {
        newsDataByPillarObj = {[pName] : pNewsItems[pName] };
        newsDataByPillarObj[pName].push( this.state.newsData[i]);
      } else {
        newsDataByPillarObj = {[pName] : [ this.state.newsData[i] ] };
      }
      
      Object.assign(pCounts, countObj); //merge the counter object to existing counters 
      Object.assign(pNewsItems, newsDataByPillarObj); //merge the pillar news items object to existing pillars 
    }
    this.setState({newsPillarCounts: pCounts}); //update the state
    this.setState({newsDataByPillars: pNewsItems}); //update the state
  }


  layoutNewsSection(pillarName) { 

    this.determineNewsCardTypes(this.state.newsDataByPillars[pillarName], pillarName)

  } 

  getNewsFromTheGuardian() {
    
    let api_key=config.THE_GUARDIAN_KEY;
    fetch("https://content.guardianapis.com/search?number=4&api-key="+api_key)
      .then(response => response.json()) // first response => resolved
      .then(
        result => {
          console.log(result.response)

          this.setState({
            newsDataAvailable: true,
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
        }
      ).catch(e => console.log("there's a error", e))
  }
  
  componentDidMount() {

    this.getNewsFromTheGuardian();
  }

  updateTopBorderStyle=(node, style)=>{  //updater function for font color
    node.style.borderTopColor=style.bordercolor;
    node.style.borderTopWidth=style.borderWidth;
  }

  changeSiblingStyling(node, styleUpdater, styleObj) { //update whatever styling needed by the caller

    let sibling=node.parentNode.firstChild;
    while (sibling) {
        if (sibling==node) { //It's itself, not sibling
            sibling=sibling.nextElementSibling;
            continue;  
        }

        styleUpdater(sibling, styleObj); //update whatever styling needed by the caller

        sibling=sibling.nextElementSibling;
    }
  }

  handleMouseOver(e) {
      e.target.style.borderTopWidth='3px';
      e.target.style.borderTopColor='#c70000';
  }
 
  handleHeadlineClick(event) {

    //"current" verifies that the component has rendered
    if(this.state.headlineSection.current){
        this.state.headlineSection.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }
  }
  handleSportClick(event) {

    //"current" verifies that the component has rendered
    if(this.state.sportSection.current){
        this.state.sportSection.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }
  }
  handleArtsClick(event) {
    //"current" verifies that the component has rendered
    if(this.state.artsSection.current){
        this.state.artsSection.current.scrollIntoView({ 
           behavior: "smooth", 
           block: "nearest"
        })
    }
  }

  render() {
      return (
        <div className="App">
          <div className="navBarContainer">
            <div className="navBarRow1">
              <div className="supportMsgBox">
                <p className="supportText">Support The Guardian</p>
                <p className="supportDescription">Support our journalism with a year-end gift</p>
                <button className="actionButton">Contribute <span className="inlineArrow">→</span> </button>
                <button className="actionButton">Subscribe <span className="inlineArrow">→</span> </button>
              </div>
                        
              <p className="logo">The Guardian</p>
            </div>

            <div className="navBarBox">
              <div className="menuItemBox">
                <a className="menuItems" id='News' href="#" onClick={this.handleHeadlineClick} onMouseEnter={this.handleMouseOver}  >News</a>
              </div>
              <div className="menuItemBox">
                <a className="menuItems" id='Sport' href="#" onClick={this.handleSportClick} onMouseEnter={this.handleMouseOver}  >Sport</a>
              </div>
              <div className="menuItemBox">
                <a className="menuItems" id='Arts' href="#" onClick={this.handleArtsClick} onMouseEnter={this.handleMouseOver}  >Arts</a>
              </div>
              <div className="menuItemBox">
                <a className="menuItems" id='Lifestyles' href="#" onClick={this.handleArtsClick} onMouseEnter={this.handleMouseOver}  >Lifestyle</a>
              </div>
              <div className="longMenuItemBox">
                <a className="menuItems" id='More' href="#" >More</a>
              </div>
            </div>

          </div>

          {/* Headline News Section */}
          <div  ref={this.state.headlineSection}>
            < HeadlineNewsSection newsLargeFocusCards={this.state.newsLargeFocusCards} 
                                  newsSmallFocusCards={this.state.newsSmallFocusCards}
                                  newsArticleCards={this.state.newsArticleCards} />
          </div>

          {/* Sport News Section */}
          <div ref={this.state.sportSection}>
            < SportNewsSection  sportLargeFocusCards={this.state.sportLargeFocusCards} 
                                sportSmallFocusCards={this.state.sportSmallFocusCards}
                                sportArticleCards={this.state.sportArticleCards} />
          </div>

          {/* Arts Section */}
          <div ref={this.state.artsSection}>
            < ArtsNewsSection artsLargeFocusCards={this.state.artsLargeFocusCards} 
                              artsSmallFocusCards={this.state.artsSmallFocusCards}
                              artsArticleCards={this.state.artsArticleCards} />
          </div>

        </div>
      );
    }
}
