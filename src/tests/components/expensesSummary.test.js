import React from 'react';
import {shallow} from 'enzyme';
import {ExportSummary, ExpenseSummary} from '../../components/ExpensesSummary';

test('should correctly render expenses summary with one expense',()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={235} />);
    expect(wrapper).toMatchSnapshot();
});


test('should correctly render expenses summary with multiple expense',()=>{
    const wrapper = shallow(<ExpenseSummary expenseCount={23} expensesTotal={2357895} />);
    expect(wrapper).toMatchSnapshot();
});