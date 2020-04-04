import React from 'react';
import '../App.css';
import {pickAnImage} from './MediumCard';

export default function SportNewsSection(props) {

    return (
        <div className="NewsSectionContainer">
          <div className="LeftColContainer">  
            Sport News 
          </div>
          <div className="NewsContainer">
            <div className="FocusContainer">    
              {props.sportLargeFocusCards}  
              {props.sportSmallFocusCards}      
            </div>
            <div className="ArticlesContainer"> 
              {props.sportArticleCards}
            </div>
          </div>  
        </div>
    )
}
