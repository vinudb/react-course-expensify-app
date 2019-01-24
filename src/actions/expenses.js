import uuid from 'uuid';
//ADD_EXPENSE
export const addExpense = (
    //below {} is destructuring of the arguement 
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
)=>({
    type:'ADD_EXPENSE',
    expense:{
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
//REMOVE_EXPENSE
export const removeExpense = ({id}={})=>({
    type: 'REMOVE_EXPENSE',
    id: id
});
//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});