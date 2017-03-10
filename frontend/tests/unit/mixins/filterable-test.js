import Ember from 'ember';
import FilterableMixin from 'frontend/mixins/filterable';
import { module, test } from 'qunit';

module('Unit | Mixin | filterable');

var reference = Ember.Object.extend(FilterableMixin);

test('it translates capitalize keys to underscore keys', function(assert) {
  let subject = reference.create();
  subject.set('filters.sampleKey', 123);
  let query = subject.filterQuery();

  assert.ok(query.hasOwnProperty('sample_key'));
  assert.equal(query.sample_key, 123);
});
