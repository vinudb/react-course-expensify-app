//HOC-hogher order component. A component(HOC) that renders another component
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props)=>(
    <div>
        <h1>Info</h1>
        <p>The info is {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) =>{
    //return the HOC
    return (props)=>(
        <div>
            {props.isAdmin && <p>This is private message. PLease dont share.</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent)=>{
    //return HOC
    return (props)=>(
        <div>
            {props.isAuthenticated ? <p>Authenticated User</p>: <p>Please login</p>}
            <WrappedComponent {...props} />
        </div>
    );
};


//can pass any number of components in arguements Info, Info1 etc
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="This is the detail"/> , document.getElementById('app'));
//ReactDOM.render(<AdminInfo isAdmin={true} info="This is the detail"/> , document.getElementById('app'));
