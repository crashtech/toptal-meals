import Ember from 'ember';
import SearchableMixin from 'frontend/mixins/searchable';
import { module, test } from 'qunit';

module('Unit | Mixin | searchable');

var reference = Ember.Object.extend(SearchableMixin, {
  debounce: null,
  refreshed: false,
  singleDebounce() {
    this.set('debounce', arguments[1]);
    arguments[2].call(this);
  },
  refresh() {
    this.set('refreshed', true);
  }
});

test('it can import search from query parameters', function(assert) {
  let subject = reference.create();
  let transition = { queryParams: { q: 'test' } };

  subject.beforeModel(transition);
  assert.equal(subject.search, 'test');
});

test('it does not import when query parameters is not present', function(assert) {
  let subject = reference.create();
  subject.beforeModel({ queryParams: {} });
  assert.equal(subject.search, '');
});

test('it returns the pagination parameters for requests', function(assert) {
  let subject = reference.create();
  let transition = { queryParams: { q: 'test' } };

  subject.beforeModel(transition);
  let result = subject.searchQuery();

  assert.equal(result, 'test');
});

test('it setup the controller withe the current search value', function(assert) {
  let subject = reference.create();
  let transition = { queryParams: { q: 'test' } };
  let controller = new Ember.Object();

  subject.beforeModel(transition);
  subject.setupController(controller, {});

  assert.equal(controller.search, 'test');
});

test('it triggers a refresh when the search changes using a debounce', function(assert) {
  let subject = reference.create();
  subject.actions.searchChanged.call(subject, 'new value');
  assert.equal(subject.debounce, 500);
  assert.ok(subject.refreshed);
});
