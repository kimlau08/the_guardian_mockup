import React from 'react';
import '../App.css';

export default function SmallCard(props) {
    //props is an array of 1 or 2 small news items
    switch (props.length) {
        case 1:
            // Case of array of 1 small news items
            return (
                <div className='smallCardContainer'>
                    <div className='smallCardHeadlineBox'>
                        <hr className='newsItemLine' />
                        <p>{props[0].webTitle}</p>
                    </div>
                </div>
            ) 
        case 2:
            // case of array of 2 small news items
            return (
                <div className='smallCardContainer'>
                    <div className='smallCardHeadlineBox'>
                        <hr className='newsItemLine' />
                        <p>{props[0].webTitle}</p>
                    </div>
                    <div className='smallCardHeadlineBox'>
                        <hr className='newsItemLine' />
                        <p>{props[1].webTitle}</p>
                    </div>
                </div>
            )
        default:
    }
}
