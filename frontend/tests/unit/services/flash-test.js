import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

var listner = new Ember.Object({ messages: [] });

moduleFor('service:flash', 'Unit | Service | flash', {
  beforeEach() {
    listner.set('messages', []);
    this.subject().setListner(listner).clear();
  }
});

test('it can display ok messages', function(assert) {
  let service = this.subject();
  assert.equal(service.messages.length, 0);

  service.ok('Sample message');
  assert.equal(service.messages.length, 1);
  assert.equal(service.messages[0].type, 'success');
});

test('it can display error messages', function(assert) {
  let service = this.subject();
  assert.equal(service.messages.length, 0);

  service.error('Sample message');
  assert.equal(service.messages.length, 1);
  assert.equal(service.messages[0].type, 'danger');
});

test('it can display alert messages', function(assert) {
  let service = this.subject();
  assert.equal(service.messages.length, 0);

  service.alert('Sample message');
  assert.equal(service.messages.length, 1);
  assert.equal(service.messages[0].type, 'warning');
});

test('it can display info messages', function(assert) {
  let service = this.subject();
  assert.equal(service.messages.length, 0);

  service.info('Sample message');
  assert.equal(service.messages.length, 1);
  assert.equal(service.messages[0].type, 'info');
  assert.equal(service.messages[0].icon, 'info-sign');
});

test('it can display help messages', function(assert) {
  let service = this.subject();
  assert.equal(service.messages.length, 0);

  service.help('Sample message');
  assert.equal(service.messages.length, 1);
  assert.equal(service.messages[0].type, 'info');
  assert.equal(service.messages[0].icon, 'question-sign');
});

test('it does not transmit messages without now', function(assert) {
  let service = this.subject();
  assert.equal(listner.get('messages.length'), 0);

  service.ok('Sample message');
  assert.equal(service.messages.length, 1);
  assert.equal(listner.get('messages.length'), 0);
});

test('it can transmit messages instantly using now', function(assert) {
  let service = this.subject();
  assert.equal(listner.get('messages.length'), 0);

  service.ok('Sample message').now();
  assert.equal(service.messages.length, 0);
  assert.equal(listner.get('messages.length'), 1);
});

test('it does not clear itself when using now but no listner was set', function(assert) {
  let service = this.subject();
  service.setListner(null);

  service.ok('Sample message').now();
  assert.equal(service.messages.length, 1);
});
