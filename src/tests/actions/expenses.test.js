import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense,startRemoveExpense, setExpenses , startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done)=>{
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt })=>{
        expensesData[id] = {description, note, amount, createdAt};
    });
    database.ref('expenses').set(expensesData).then(()=> done());
});

test('should setup remove expense action object', ()=>{
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase',(done)=>{
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    });

});

test('should setup edit expense action object', ()=>{
    const action = editExpense('123abc', {note: 'This is new note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: 'This is new note'}
    });
});

test('should set up add expense action object', ()=>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense:expenses[2]
    });
});

//done(): to specify jest to wait until async task is complete
test('should add expense to database and store',(done)=>{
    const store = createMockStore({}); //create a mock redux store using the library
    const expenseData = {
        description:"Mouse",
        amount:3000,
        note:"This is better",
        createdAt:1000
    }; //a dummy expense data
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions(); //from mock store get actions
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense to database and store with default values',(done)=>{
    const store = createMockStore({}); //create a mock redux store using the library
    const expenseDefaults = {
        description:"",
        amount:0,
        note:"",
        createdAt:0
    }; //a dummy expense data
    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions(); //from mock store get actions
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id:expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

// test('should set up add expense action object with default values', ()=>{
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense:{
//             description : '',
//             note : '',
//             amount : 0,
//             createdAt : 0,
//             id: expect.any(String)
//         }
//     });
// });

test('should setup set expense action oject with data', ()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});


test('should fetch the expenses from firebase',(done)=>{
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
