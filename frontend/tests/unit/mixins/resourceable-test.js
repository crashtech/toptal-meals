import Ember from 'ember';
import ResourceableMixin from 'frontend/mixins/resourceable';
import { module, test } from 'qunit';

module('Unit | Mixin | resourceable');

var reference = Ember.Object.extend(ResourceableMixin, {
  resource: 'test-model',
  store: {
    query(model, query) {
      return { model, query };
    }
  }
});

test('it sets the search query when has one', function(assert) {
  let subject = reference.create();
  subject.searchQuery = 'test';

  let result = subject.model();
  assert.equal(result.model, 'test-model');
  assert.equal(result.query.q, 'test');
});

test('it sets the pagination info when has one', function(assert) {
  let subject = reference.create();
  subject.pagination = 'page';

  let result = subject.model();
  assert.equal(result.model, 'test-model');
  assert.equal(result.query.page, 'page');
});

test('it sets the include key when has one', function(assert) {
  let subject = reference.create();
  subject.includes = 'test';

  let result = subject.model();
  assert.equal(result.model, 'test-model');
  assert.equal(result.query.include, 'test');
});

test('it sets the scope when has one', function(assert) {
  let subject = reference.create();
  subject.scope = 'test';

  let result = subject.model();
  assert.equal(result.model, 'test-model');
  assert.equal(result.query.scope, 'test');
});

test('it can be used as function on keys', function(assert) {
  let subject = reference.create();
  subject.pagination = () => { return 'was a function'; };

  let result = subject.model();
  assert.equal(result.model, 'test-model');
  assert.equal(result.query.page, 'was a function');
});
