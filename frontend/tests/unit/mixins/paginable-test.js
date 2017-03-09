import Ember from 'ember';
import PaginableMixin from 'frontend/mixins/paginable';
import { module, test } from 'qunit';

module('Unit | Mixin | paginable');

var reference = Ember.Object.extend(PaginableMixin, {
  page: 5,
  controller: { model: { links: { self: 5, next: 6, prev: 4, last: 20, first: 10 } } },
  refreshed: false,
  refresh() {
    this.set('refreshed', true);
  }
});

test('it can import page and size from query parameters', function(assert) {
  let subject = reference.create();
  let transition = { queryParams: { page: 10, size: 30 } };

  subject.beforeModel(transition);
  assert.equal(subject.page, 10);
  assert.equal(subject.size, 30);
});

test('it does not import when query parameters is not present', function(assert) {
  let subject = reference.create();
  subject.beforeModel({ queryParams: {} });
  assert.equal(subject.page, 5);
  assert.equal(subject.size, null);
});

test('it returns the pagination parameters for requests', function(assert) {
  let subject = reference.create();
  let transition = { queryParams: { page: 10, size: 30 } };

  subject.beforeModel(transition);
  let result = subject.pagination();

  assert.equal(result.number, 10);
  assert.equal(result.size, 30);
});

test('it triggers a refresh when calling a go to page', function(assert) {
  let subject = reference.create();
  subject.actions.goToPage.call(subject, 6);
  assert.ok(subject.refreshed);
});

test('it does not trigger a refresh when calling a go to page with an invalid page', function(assert) {
  let subject = reference.create();
  subject.actions.goToPage.call(subject, -1);
  assert.notOk(subject.refreshed);
});
