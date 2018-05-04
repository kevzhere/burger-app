import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData={};
        for(let elements in this.state.orderForm){
            formData[elements] = this.state.orderForm[elements].value;
        }
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData, 
            userId: this.props.userId
        }
        this.props.orderBurger(order, this.props.token);
    }


    inputChangedHandler=(event, inputIdentifier)=>{
        // const updatedForm={
        //     ...this.state.orderForm
        // };
        // const updatedFormElement = {
        //     ...updatedForm[inputIdentifier]
        // };
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        // updatedForm[inputIdentifier] = updatedFormElement;
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
          });
          const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
          })

        let formIsValid = true;
        for(let id in updatedOrderForm){
            formIsValid = updatedOrderForm[id].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){
        const formArray = [];
        for(let key in this.state.orderForm){
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form =(

            <form onSubmit={this.orderHandler}>
               {formArray.map(elements=>(
                   <Input
                        key={elements.id}
                        elementType={elements.config.elementType}
                        elementConfig={elements.config.elementConfig}
                        value={elements.config.value}
                        invalid={!elements.config.valid}
                        shouldValidate={elements.config.validation}
                        touched={elements.config.touched}
                        changed={(event)=>this.inputChangedHandler(event, elements.id)}/>
               ))}
               <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
            <h4>Please Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        orderBurger: (orderData, token) => dispatch(actions.purchaseStart(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axios));
