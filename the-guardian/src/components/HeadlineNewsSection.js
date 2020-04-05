import React from 'react';
import '../App.css';
import {pickAnImage} from './MediumCard';



export default function HeadlineNewsSection(props) {


    return (
        <div className="NewsSectionContainer">
        <div className="LeftColContainer">  
          Headline News 
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
