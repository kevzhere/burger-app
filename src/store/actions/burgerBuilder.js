import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = (name)=>{
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
}
export const removeIngredient = (name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    };
}

export const setIngredients = (ing) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ing
    };
};

export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://burgerbackend.firebaseio.com/ingredients.json')
            .then(response =>{
                dispatch(setIngredients(response.data))
            })
            .catch(error=>{
                dispatch(fetchIngredientsFailed());
            });
    };
};