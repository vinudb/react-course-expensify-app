'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            //use try catch if json is carrying invalid data and gets crashed in json parse 
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) this.setState(function () {
                    return { options: options };
                });
                console.log("fetching data");
            } catch (e) {
                //Leave empty
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            //check if the previous array length and current array is changed.Only then save.
            if (prevState.options.length !== this.state.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
                console.log("saving data");
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log("componentWillUnmount");
        }
    }, {
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            // this.setState(()=>{
            //     return {
            //         options: []
            //     };
            // });

            //shorthand syntax for setstate. Curly braces are inside () to return an object.     
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToBeRemoved) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToBeRemoved !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNumber = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNumber];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                return "Please add a valid value to add item";
            } else if (this.state.options.indexOf(option) > -1) {
                //item already exists
                return "This item already exists";
            }

            // this.setState((prevState)=>{
            //     return {
            //         options: prevState.options.concat([option])
            //     };
            // });

            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = "Put your life in the hands of a computer";
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: []
};

//Header stateless functional component
var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: "Indecision"
};

//Header Class based component
// class Header extends React.Component{
//     render(){
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

//Action stateless functional component
var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'What should I do?'
        )
    );
};

//Action class based component
// class Action extends React.Component{
//     render(){
//         return (
//             <div>
//                 <button 
//                     onClick={this.props.handlePick}
//                     disabled={!this.props.hasOptions}
//                 >
//                     What should I do?
//                 </button>
//             </div>
//         );
//     }
// }

//Options stateless funcitonal component
var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'Please add an item to get started!'
        ),
        React.createElement(
            'p',
            null,
            props.options.length
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                handleDeleteOption: props.handleDeleteOption
            });
        })
    );
};

// //Options class based component
// class Options extends React.Component{
//     render(){
//         return (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 <p>{this.props.options.length}</p>
//                 {this.props.options.map((option)=> <Option key={option} optionText={option}/>)}
//             </div>
//         );
//     }
// }


//Option stateless functional component
//We need to pass the optiontext to the handleDeleteOption function
var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            props.optionText
        ),
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                } },
            'Remove'
        )
    );
};

// //Option class based component
// class Option extends React.Component{
//     render(){
//         return (
//             <div>
//                 <p>{this.props.optionText}</p>
//             </div>
//         );
//     }
// }

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOption(option);
            // this.setState(()=>{
            //     return {
            //         error: error
            //     };
            // });

            this.setState(function () {
                return { error: error };
            });
            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

//The below code is an example for stateless functional component where no states are maintained and 
//are just rendering the JSX
// const User=(props)=>{
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     );
// }
// ReactDOM.render(<User name="Vinay" age={26} />, document.getElementById("app"));

//The default props values can be overridden by pasing the values as props as below.
//ReactDOM.render(<IndecisionApp options={["Vinay"]}/>, document.getElementById("app"));

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("app"));
