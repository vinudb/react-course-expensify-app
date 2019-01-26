//Expenses reducer
const expensesReducerDefaultState = [];
export default (state=expensesReducerDefaultState, action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
        //filter is used to remove an element in the array without changing the original array
            return state.filter(({id})=>action.id !==id);  
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id)
                {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else{
                    return expense;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;    
        default:
            return state;
    }
};

