import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css';

// const now = moment();
// console.log(now.format('MMM Do, YYYY'));
//if a component has a form, it will almost always need state. Then the component should be class based component
export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);
		
        this.state={
            description: props.expense ? props.expense.description:'',
            note:props.expense ? props.expense.note:'',
            amount:props.expense ? (props.expense.amount / 100).toString() :'',
            createdAt: props.expense ? moment(props.expense.createdAt):moment(),
            claenderFocused:false,
            error:''
        };
    }
    onDescriptionChange = (e)=>{
        const description = e.target.value;
        this.setState(()=>({description}));
    };
    onNoteChange=(e)=>{
        const note = e.target.value;
        this.setState(()=>({note}));
    };
    onAmountChange=(e)=>{
        const amount = e.target.value;
        //regex to allow only digits and 2 decimal places //refer regex101 google
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        }
    };
    onDateChange=(createdAt)=>{
        //works only when date is changed and not when date field is deleted from the keyboard
        if(createdAt)
            this.setState(()=>({createdAt}));
    };
    onFocusChange=({focused})=>{
        this.setState(()=>({claenderFocused:focused}));
    };
    
    onSubmit=(e)=>{
        e.preventDefault();
		
        if(!this.state.description || !this.state.amount){
            this.setState(()=>({error:'Please type description and amount before submit'}));
            console.log(this.state.error);
        }else{
            this.setState(()=>({error:''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note:this.state.note
            });
        }
    };

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.claenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1} //to show only one month in the view.
                        isOutsideRange={(day)=>false} //to enable picking previous dates
                    />
                    <textarea
                        placeholder="Add a note for the expense(optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}