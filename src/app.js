import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter, sortByAmount } from './actions/filters';
import  getVisibleExpense  from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
//import './playground/promises';

const store = configureStore();

// store.dispatch(addExpense({description:"Water Bill", amount:4500}));
// store.dispatch(addExpense({description:"Gas Bill", createdAt:1000}));
// store.dispatch(addExpense({description:"Rent", amount:109500}));

// const state = store.getState();
// const visibleExpense = getVisibleExpense(state.expenses, state.filters);
// console.log(visibleExpense);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(()=>{
    ReactDOM.render(jsx, document.getElementById("app"));
});
