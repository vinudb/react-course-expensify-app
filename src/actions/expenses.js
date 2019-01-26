import uuid from 'uuid';
import database from '../firebase/firebase';

//component calls action generator
//action generator returns the object
//component dispatches the object
//redux stores the changes


//With firease integration..
//component calls action generator
//action generator returns the function
//component dispatches the function 
//function runs where firebase code resides and also redux stores the changes

//ADD_EXPENSE
export const addExpense = (expense)=>({
    type:'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {})=>{
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {description, note, amount, createdAt};

        return database.ref('expenses').push(expense).then((ref)=>{
            //dispatch to store in redux
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE
export const removeExpense = ({id}={})=>({
    type: 'REMOVE_EXPENSE',
    id: id
});

export const startRemoveExpense = ({id}={}) =>{
    return(dispatch)=>{
        return database.ref(`expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({id}));
        });
    };
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_EXPENSES
export const setExpenses = (expenses)=>({
    type: 'SET_EXPENSES',
    expenses 
});

//fetch all expenses data once
//parse that data in to an array
//dispatch set_expenses, so that data actualyy changes
export const startSetExpenses = ()=>{
    return (dispatch)=>{
        return database.ref('expenses').once('value').then((snapshot)=>{
            const expenses = [];

            snapshot.forEach((childSnapShot)=>{
                expenses.push({
                    id: childSnapShot.key,
                    ...childSnapShot.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    };

};