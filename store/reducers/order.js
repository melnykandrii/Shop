import { ADD_ORDER } from "../actions/order";
import Order from '../../models/order';

const initialSate = {
    orders: []
};

export default (state = initialSate, action) => {
    switch (action.type) {
        //create a new order creater object wich would be work with with the modal: order.js file
        case ADD_ORDER: 
            const newOrder = new Order(
                new Date().toString(), 
                action.orderData.items, 
                action.orderData.amount, 
                new Date()
            );
        //adding new order to order array
            return {
                ...state,
                //add a new item in to array a return the new array with new array it a build in js method
                orders: state.orders.concat(newOrder)
            };
    }
    
    return state;
};