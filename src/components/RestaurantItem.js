import React from 'react'
import styled, { keyframes } from 'styled-components';
import StarRatings from 'react-star-ratings';
const Outer = styled.div`
    margin:50px;
    h3{
        color:#2D2D41;
    }
    color:#7F818A;

    ul{ 
        width:320px;
        text-decoration:none;
        display:flex;
        justify-content:space-between;
        flex-direction:column;
        color:#7F818A;
        list-style-type:none;
        padding:10px 10px 10px 0;
    }
`;
export default function RestaurantItem(props) {

    return (
        <Outer>
            <h3>{props.name}</h3>
            <StarRatings
                rating={parseFloat(props.agg)}
                starRatedColor='#FFDC59'
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="10px"
            />
            <ul>
                {props.cuisines.map(item => { return <li>{item}</li> })}
            </ul>
            <p> Average Cost for two: {/\(([^)]+)\)/.exec(props.currency)[1]}{props.avg}</p>
            <p> Aggregate rating: {props.agg}</p>
            <p> Votes: {props.votes}</p>
        </Outer>
    )
}
