import React from 'react';
import '../App.css';
import {pickAnImage} from './MediumCard';

export default function HeadlineNewsSection(props) {
    //props is an array of 4 news items. The first item needs to accompany an image.

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
