import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import flash from 'frontend/services/flash';

moduleForComponent('flash-messages', 'Integration | Component | flash messages', {
  integration: true,

  beforeEach() {
    this.register('service:flash', flash);
    this.inject.service('flash', { as: 'flash' });
    this.get('flash').clear();
  }
});

test('it does not render any alert when flash service is emtpy', function(assert) {
  this.render(hbs`{{flash-messages}}`);
  assert.equal(this.$('div.alert').length, 0);
});

test('it does render an alert when flash service has messages', function(assert) {
  let flash = this.get('flash');
  flash.ok('Just a test');

  this.render(hbs`{{flash-messages}}`);
  assert.equal(this.$('div.alert').length, 1);
});

test('it can have a simple text message', function(assert) {
  let flash = this.get('flash');
  flash.ok('Just a text message');

  this.render(hbs`{{flash-messages}}`);
  assert.equal(this.$('div.alert > p').length, 1);
});

test('it can have an array of messages', function(assert) {
  let flash = this.get('flash');
  flash.ok(['Message 1', 'Message 2', 'Message 3']);

  this.render(hbs`{{flash-messages}}`);
  assert.equal(this.$('div.alert > i + div > ul > li').length, 3);
});

test('it can have a complex object message', function(assert) {
  let flash = this.get('flash');
  flash.ok({
    title: 'This is the header',
    detail: 'This is the body',
    messages: ['Message 1', 'Message 2', 'Message 3']
  });

  this.render(hbs`{{flash-messages}}`);
  assert.equal(this.$('div.alert > i + div > h4 + p + ul > li').length, 3);
});
