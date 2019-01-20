import React from 'react';
import {shallow} from 'enzyme';
//import toJSON from 'enzyme-to-json';
import {ExpenseList} from '../../components/ExpensesList';
import expenses from '../fixtures/expenses';

test('should render expenselist correctly',()=>{
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(wrapper).toMatchSnapshot();
});