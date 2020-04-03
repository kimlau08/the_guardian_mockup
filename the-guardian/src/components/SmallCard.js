import React, { Component } from 'react';
import '../App.css';

export default function SmallCard(props) {

    return (
        <div className='smallCardContainer'>
            <div className='smallCardHeadlineBox'>
                <p>{props.webTitle}</p>
            </div>
        </div>
    )
}
