import React from 'react';
import '../App.css';
import {getKickerPhrase} from './MediumCard';

export default function SmallCard(props) {
    //props is an array of 1 or 2 small news items

    let kickerFont=this.kicker;
    switch (props.length) {
        
        case 1: {
            // Case of array of 1 small news items
            
            let headAndTail1=getKickerPhrase(props[0].webTitle);

            return (
                <div className='smallCardContainer'>
                    <div className='smallCardHeadlineBox'>
                        <hr className='newsItemLine' />
                            <p><span style={kickerFont}>{headAndTail1.head}</span>{headAndTail1.tail}</p>
                    </div>
                </div>
            ) 

        }
        case 2: {
            // case of array of 2 small news items

            let headAndTail1=getKickerPhrase(props[0].webTitle);
            let headAndTail2=getKickerPhrase(props[1].webTitle);


            return (
                <div className='smallCardContainer'>
                    <div className='smallCardHeadlineBox'>
                        <hr className='newsItemLine' />
                            <p><span style={kickerFont}>{headAndTail1.head}</span>{headAndTail1.tail}</p>  
                    </div>
                    <div className='smallCardHeadlineBox'>
                        <hr className='newsItemLine' />
                            <p><span style={kickerFont}>{headAndTail2.head}</span>{headAndTail2.tail}</p>  
                    </div>
                </div>
            )

        }
        default:
    }
}
