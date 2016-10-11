import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish("allTasks", function(){
    return Tasks.find();
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    Tasks.insert({
      text,
      createdAt: new Date(),
    });
  },

  'tasks.setComplete'(taskId, setComplete) {
    check(taskId, String);
    check(setComplete, Boolean);

    Tasks.update(taskId, { $set: { complete: setComplete } });
  },
})
