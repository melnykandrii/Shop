export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsLaBeo2IEwdkjnDmE7aBRTDQIjBEGIfI',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            //error handel, different types server response
            const errorResData = await response.json();
            console.log(errorResData);
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_EXISTS') {
                message = 'This Email is already exist! Please try with another one or Log In!';
            } else if (errorId === 'INVALID_EMAIL') {
                message = 'Please check your email!';
            } else if (errorId === 'WEAK_PASSWORD : Password should be at least 6 characters') {
                message = 'The password is too weak. Password should be at least 6 characters!';
            } else if (errorId === 'OPERATION_NOT_ALLOWED') {
                message = 'There was a problem with our service. Please try again later!';
            } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = 'The number of attempts exided. Please try again later!';
            }
            throw new Error(message);
            //throw new Error('Something went wrong!!!!');
        }

        const resData = await response.json();

        console.log(resData); 
        
        dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsLaBeo2IEwdkjnDmE7aBRTDQIjBEGIfI',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            //error handel, what exactly goes wrong
            const errorResData = await response.json();
            console.log(errorResData);
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This Email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            } else if (errorId === 'USER_DISABLED') {
                message = 'This user is disabled! Please call our support team!';
            }
            throw new Error(message);
            
            //throw new Error('Something went wrong!!!!');
        }

        const resData = await response.json();

        console.log(resData); 
        
        dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    };
};