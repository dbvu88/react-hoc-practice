import React, { Component } from 'react';
import './App.css';

const Role = {
  audience: 'audience',
  editor: 'editor',
  creator: 'creator',
}

const Form = props => (
  <form>
    <label>{props.text} </label>
    <input value={props.post} onChange={props.onChange}/> 
  </form>
)

const WithReadOnly = props => WrappedForm => (
  <div className="App" >
    <WrappedForm {...props} />

    <input type="button" value="Switch to Editor" onClick={() => props.switchRole(Role.editor)} />
    {/* <input type="button" value="Switch to Creator" onClick={() => props.switchRole(Role.creator)} />  */}
  </div>
)

const WithEdit = props => WrappedForm => (
  <div className="App" >
    <WrappedForm {...props} />

    <input type="button" value="Switch to Reader" onClick={() => props.switchRole(Role.audience)} />
    {/* <input type="button" value="Switch to Creator" onClick={() => props.switchRole(Role.creator)} />  */}
  </div>

)

class App extends Component {
  constructor() {
    super();
    this.state = {
      role: Role.audience,
      text: "you are a reader now",
      post: "edit me!!!"
    }
  }

  onChange = event => {
    switch (this.state.role) {
      case (Role.audience):
      break;

      case (Role.editor):
      this.setState({ post: event.target.value })
      break;

      default:
      break;
    }
  }

  switchRole = (role) => {
    switch (role) {
      case (Role.audience):
      this.setState({
        role: Role.audience,
        text: "you are a reader now"
      });
      break;

      case (Role.editor):
      this.setState({
        role: Role.editor,
        text: "you are an editor now",
      });
      break;

      case (Role.creator):
      this.setState({
        role: Role.creator,
        text: "you are an creator now",
      });
      break;

      default:
      return;
    }
  }

  render() {
    const defaultProps = {
      ...this.state, 
      onChange: this.onChange,
      switchRole: this.switchRole  
    }
    const form = <Form {...defaultProps}
    />


    switch (this.state.role) {
      case (Role.audience):
      return WithReadOnly({...defaultProps})(Form);

      case (Role.editor):
      return WithEdit({...defaultProps})(Form);

      default:
      return (<Form {...this.state} />);
    }
  }
}

export default App;
