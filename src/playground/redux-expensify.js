import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';
//ADD_EXPENSE
const addExpense = (
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
const removeExpense = ({id}={})=>({
    type: 'REMOVE_EXPENSE',
    id: id
});
//EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
//SET_TEXT_FILTER
const setTextFilter = (text = '') =>({
    type: 'SET_TEXT_FILTER',
    text
}); 
//SORT_BY_DATE
const sortByDate = ()=>({
    type: 'SORT_BY_DATE'
});
//SORT_BY_AMOUNT
const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT'
});
//SET_START_DATE
const setStartDate = (startDate=undefined)=>({
    type: 'SET_START_DATE',
    startDate
});
//SET_END_DATE
const setEndDate = (endDate=undefined)=>({
    type: 'SET_END_DATE',
    endDate
});

//Expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer=(state=expensesReducerDefaultState, action)=>{
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
        default:
            return state;
    }
};

//Filters reducer.
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',  //amount or date
    startDate:undefined,
    endDate:undefined
};
const filtersReducer=(state=filtersReducerDefaultState, action)=>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE': 
            return{
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT': 
            return{
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

//get visible expenses
const getVisibleExpense = ( expenses , {text, sortBy, startDate, endDate} )=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate!== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=>{
        if(sortBy==='date'){
            // > ascending : < descending
            return a.createdAt > b.createdAt ? 1:-1;
        }
        if(sortBy==='amount'){
            return a.amount < b.amount ? 1:-1;
        }
    });
};

//store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    //console.log(store.getState());
    const state = store.getState();
    const visibleExpense = getVisibleExpense(state.expenses, state.filters);
    console.log(visibleExpense);
});
const expenseOne = store.dispatch(addExpense({description:"Rent", amount:100 , createdAt:1000}));
const expenseTwo = store.dispatch(addExpense({description:"Coffee", amount:300, createdAt:-1000}));
const expenseThree = store.dispatch(addExpense({description:"Tea", amount:200, createdAt:-2000}));
// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount:500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(sortByDate());
 store.dispatch(sortByAmount());
// store.dispatch(setStartDate(-1000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
const demoState = {
    expenses:[{
        id:'asdasdasd',
        description:'Jan rent',
        note:'This was last payment',
        amount:54500, //amount in paise
        createdAt:0
    }],
    filters:{
        text:'rent',
        sortBy:'amount',  //amount or date
        startDate:undefined,
        endDate:undefined
    }
};

const person = {
    name:"Vinay",
    age:31
};

console.log({
    ...person,
    location:"Bangalore"
});