import React from 'react';
import classes from './Order.css';

const order=(props)=>{
    const ingredients=[];
    for(let ig in props.ingredients){
        ingredients.push({
            name: ig,
            amount: props.ingredients[ig]
        });
    }

    const ingredientOutput = ingredients.map(ig =>{
        return (<span
            // className={classes.Ing}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}

            key={ig.name}>
            {ig.name} ({ig.amount})
        </span>)
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price:<strong> USD {props.price.toFixed(2)}</strong></p>
        </div>
    );

}

export default order;