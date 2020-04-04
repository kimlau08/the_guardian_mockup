import React from 'react';
import '../App.css';
import {pickAnImage} from './MediumCard';

export default function ArtsNewsSection(props) {

    return (
        <div className="NewsSectionContainer">
          <div className="LeftColContainer">  
            Arts News 
          </div>
          <div className="NewsContainer">
            <div className="FocusContainer">    
              {props.artsLargeFocusCards}  
              {props.artsSmallFocusCards}      
            </div>
            <div className="ArticlesContainer"> 
              {props.artsArticleCards}
            </div>
          </div>  
        </div>
    )
}
