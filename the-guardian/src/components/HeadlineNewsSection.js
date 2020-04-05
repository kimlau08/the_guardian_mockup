import React from 'react';
import '../App.css';

export default function HeadlineNewsSection(props) {

    return (
        <div className="NewsSectionContainer">
        <div className="LeftColContainer">  
          Headlines
        </div>
        <div className="NewsContainer">
          <div className="FocusContainer">    
            {props.newsLargeFocusCards}  
            {props.newsSmallFocusCards}      
          </div>
          <div className="ArticlesContainer"> 
            {props.newsArticleCards}
          </div>
        </div>  
      </div>
    )
}
