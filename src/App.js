import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function log(message = '') {
  console.log(`Time:${new Date()}, Action: ${message}`)
}

function getRandomColor() {
  var colors = ['red', 'yellow', 'blue', 'brown', 'pink', 'green']
  return colors[Math.floor(Math.random() * colors.length)]
}

class App extends Component {
  constructor(props) {
    // executes once
    super(props);
    this._updateMe = this._updateMe.bind(this);
    this._forceUpdateMe = this._forceUpdateMe.bind(this);
    this._unmountMe = this._unmountMe.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this.state = {
      color: getRandomColor()
    };
    log('parent constructor');
  }

  componentWillMount() {
    // executes once
    log('parent componentWillMount');
  }

  componentDidMount() {
    // executes once
    log('parent componentDidMount');
  }

  shouldComponentUpdate(newProps, newState) {
    // executes many time but not on component mounting
    log(`\nparent shouldComponentUpdate old state: ${this.state.color}     new State: ${newState.color}`);
    if(this.state.color === newState.color) {
      return false;
    }
    return true;
  }

  componentWillUpdate() {
    // executes many time but not on component mounting
    log('parent componentWillUpdate');
  }

  componentDidUpdate() {
    // executes many time but not on component mounted
    log('parent componentDidUpdate');
  }

  componentWillUnmount() {
    // executes once
    log('parent componentWillUnmount');
  }

  _updateMe() {
    this.setState({
      color: getRandomColor()
    })
  }

  _forceUpdateMe() {
    this.forceUpdate()
  }

  _unmountMe() {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }

  _changeColor(color) {
    console.log('call _changeColor of parent from child');
    this.setState({
      color: color
    })
  }

  render() {
    // executes many time
    log('parent render');
    return (
      <div>
        <h1>Parent Section</h1>
        <h2 style={{'color':`${this.state.color}`}}>Let's see what is happening in the background, observe the browser console</h2>
        <button onClick={this._updateMe}>Update Me</button>
        <button onClick={this._forceUpdateMe}>Force Update Me</button>
        <button onClick={this._unmountMe}>Unmount Me</button>
        <hr/>
        <Child name={this.state.color} changeColor={this._changeColor}>
          <p>I m contemnt of child</p>
        </Child>
      </div>
    );
  }
}

export default App;

class Child extends Component {
  constructor(props) {
    super(props)
    this._updateChild = this._updateChild.bind(this);
    this.state = {
      name: this.props.name
    }
    log('child constructor');
  }

 componentWillUpdate(newProps, newState) {
      console.log(`Child componentWillUpdate newProps.name: ${newProps.name}   newState.name: ${newState.name}`);
  }

  componentDidUpdate(currentProps, currentState) {
      console.log(`Child componentDidUpdate currentProps: ${currentProps.name}   currentState: ${currentState.name}`);
  }

  componentWillMount() {
      console.log("Child componentWillMount: Component is about to mount!");
  }

  componentDidMount() {
      console.log("Child componentDidMount: Component just mounted!");
  }

  componentWillUnmount() {
      console.log("Child componentWillUnmount: Component is about to be removed from the DOM!");
  }

  shouldComponentUpdate(newProps, newState) { // compare new and previous state if no change in state component do not update
    console.log(`Child shouldComponentUpdate newProps.name: ${newProps.name}   newState.name: ${newState.name}`);
    console.log(`old props.name: ${this.props.name}    old state.name: ${this.state.name}`);
    if(this.state.name === newState.name) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(newProps){
    console.log(`Child componentWillReceiveProps   newProps: ${newProps.name}`);
    if(this.props.name !== newProps.name) { // compare new and previous props if no change in props no setState call
      this.setState({
        name: newProps.name
      })
    }
  }


  _updateChild() {
    this.props.changeColor('black')
  }

  render() {
    log('child render')
    return (
      <div>
       <h1>Child Section</h1>
       <h2>{`props:${this.props.name}`}</h2>
       <h2>{`state:${this.state.name}`}</h2>
        <button onClick={this._updateChild}>Update Child</button>
      </div>
    )
  }
}

Child.defaultProps = {
  name: '-',
  changeColor: ()=>{}
}

Child.propTypes = {
  name: PropTypes.string,
  changeColor: PropTypes.func
}
