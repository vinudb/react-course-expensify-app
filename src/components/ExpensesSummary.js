import React from 'react';
import numeral from 'numeral';
import {connect} from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ expenseCount, expensesTotal })=>{
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formatedExpenseTotal = numeral(expensesTotal/100).format('Rs. 0,00.00');
    return (
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formatedExpenseTotal} </h1>
        </div>
    );
};

const mapStateToProps = (state) =>{
    const visibleExpense = selectExpenses(state.expenses, state.filters);

    return{
        expenseCount: visibleExpense.length,
        expensesTotal: selectExpensesTotal(visibleExpense)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);