import Ember from 'ember';

export default Ember.Service.extend({
  messages: [],
  listner: null,

  // Setup the listner for now changes
  setListner(obj) {
    this.set('listner', obj);
    return this;
  },

  // Remove all messages
  clear() {
    this.set('messages', []);
    return this;
  },

  // Add messages functions
  ok(message) {
    return this.add('success', 'ok-sign', message);
  },
  error(message) {
    return this.add('danger', 'warning-sign', message);
  },
  alert(message) {
    return this.add('warning', 'alert', message);
  },
  info(message) {
    return this.add('info', 'info-sign', message);
  },
  help(message) {
    return this.add('info', 'question-sign', message);
  },
  add(type, icon, content) {
    let kind = (content.constructor === Array) ? 'array' : (typeof content);
    kind = (kind === 'array' && content[0].source) ? 'validation' : kind;

    let message = {type: type, icon: icon, content: content};

    message[kind] = true;
    this.get('messages').push(message);
    return this;
  },

  // Update listners
  now() {
    let listner = this.get('listner');
    if(listner) {
      listner.set('messages', this.get('messages'));
      this.clear();
    }

    return this;
  }
});
