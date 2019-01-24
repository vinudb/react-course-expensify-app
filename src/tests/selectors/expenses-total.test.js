import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should resturn 0 if no expenses', ()=>{
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('should return sum for single item',()=>{
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(100);
});

test('should return sum for all items',()=>{
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(10595);
});