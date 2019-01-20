import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ()=>(
    <header>
        <h1>Expensify</h1>
        {/*activeClassName this applies only to the link which is active*/}
        <NavLink to="/" activeClassName="is-active" exact={true}> Dashboard </NavLink>
        <NavLink to="/create" activeClassName="is-active"> Add Expense </NavLink>
        <NavLink to="/help" activeClassName="is-active"> Help </NavLink>
    </header>
);

export default Header;