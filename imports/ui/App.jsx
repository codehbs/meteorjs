import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import { Tasks } from '../api/tasks.js';

import { PageHeader } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ControlLabel, FormControl } from 'react-bootstrap';


export default class App extends TrackerReact(React.Component) {
  constructor(props){
    super(props);
    this.state = {
      subscription: {
        tasks: Meteor.subscribe("allTasks")
      }
    };
  }

  tasks() {
    return Tasks.find({}, {sort: { createdAt: -1}}).fetch();
  }

  renderTasks() {
    return this.tasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  createNewTask(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    if (text != "") {
      Meteor.call('tasks.insert', text);
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
  }

  render() {
    return (
      <div className="container">
        <PageHeader>Code Club Task List</PageHeader>

        <form onSubmit={this.createNewTask.bind(this)}>
          <ControlLabel>Enter a Task</ControlLabel>
          <FormControl type="text" placeholder="Enter a task..." ref="textInput" />
        </form>
        <br />
        <br />

        <ListGroup>
          {this.renderTasks()}
        </ListGroup>
      </div>
    );
  }
}
