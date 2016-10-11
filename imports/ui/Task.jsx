import React, { Component, PropTypes } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {

  markComplete() {
    Meteor.call('tasks.setComplete', this.props.task._id, !this.props.task.complete);
  }

  render() {
    const taskClassName = this.props.task.complete ? 'success' : 'danger';
    return (
      <ListGroupItem onClick={this.markComplete.bind(this)} bsStyle={taskClassName}>{this.props.task.text}</ListGroupItem>
    );
  }
}
