import filterReducers from '../../reducers/filters';
import moment from 'moment';

test('Should setup default filter values',()=>{
    const state = filterReducers(undefined, '@@INIT');
    expect(state).toEqual({
        text:'',
        sortBy:'date',  //amount or date
        startDate:moment().startOf('month'),
        endDate:moment().endOf('month')
    });
});

test('should set sortby to amount',()=>{
    const state = filterReducers(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('should set sortby to date',()=>{
    const currentState = {
        text:'',
        sortBy:'amount',  //amount or date
        startDate:undefined,
        endDate:undefined
    };
    const action = {type: 'SORT_BY_DATE'};
    const state = filterReducers(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('SHould set text filter',()=>{
    const state = filterReducers(undefined, {type: 'SET_TEXT_FILTER', text:"Rent"});
    expect(state.text).toBe('Rent');
});

test('should set start date filter', ()=>{
    const state  = filterReducers(undefined, {type: 'SET_START_DATE', startDate: moment(0)});
    expect(state.startDate).toEqual(moment(0));
});

test('should set end date filter', ()=>{
    const state  = filterReducers(undefined, {type: 'SET_END_DATE', endDate: moment(0)});
    expect(state.endDate).toEqual(moment(0));
});