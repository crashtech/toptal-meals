import Ember from 'ember';

const service = Ember.inject.service;
export default Ember.Component.extend({
  tagName: 'section',

  flash: service('flash'),
  messages: [],

  classNames: ['flash', 'messages'],

  // Get all messages from servcie and clean it
  init() {
    this._super(...arguments);
    let flash = this.get('flash');
    this.set('messages', flash.get('messages'));
    flash.setListner(this).clear();
  }
});
