//cases/actions we want to have
export const ADD_ORDER = 'ADD_ORDER';

//export action creator that recieves two data
export const addOrder = (cartItems, totalAmount) => {
    //return action object with type - ADD_ORDER and key - orderData, we handel it in one object but could be stored in different
    return { 
        type: ADD_ORDER,
        orderData: { items: cartItems, amount: totalAmount }
    };
};