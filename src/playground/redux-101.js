import {createStore } from 'redux';

const add = ({a,b})=>{
    return a+b;
};
console.log(add({a:1,b:11}));
const subtract = (a,b)=>{
    return a-b;
};
console.log(subtract(10,1));

//action generator
const incrementCount = ({ incrementBy=1 } = {})=>({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) =>({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count=1}={})=>({
    type: 'SET',
    count
});

const resetCount = ()=>({
    type: 'RESET'
});

//REDUCERS.
//reducers are pure function
//never change state or action
const countReducer = (state={count:0}, action)=>{
    switch (action.type){
        case 'INCREMENT':
            //the below statement is not required as we are passing incrementby in the action itself through action gen function
            //const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return{
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
        //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return{
                count: state.count - action.decrementBy
            };
        
        case 'SET':
            return{
                count: action.count
            };    
        case 'RESET':
            return{
                count: 0
            };
        default:
            return state;
    }
    return state;
};
//state={count:0} is the default state value. 
const  store = createStore(countReducer);

const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});

//create action and dispatach
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5 
// });

store.dispatch(incrementCount({incrementBy:5}));

// store.dispatch({
//     type: 'INCREMENT' 
// });
//The above dispatch statement can be used by using a action generator function 
store.dispatch(incrementCount());

store.dispatch(resetCount());


store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy:10}));

store.dispatch(setCount({count:101}));

// store.dispatch({
//     type:'SET',
//     count: 101
// });
