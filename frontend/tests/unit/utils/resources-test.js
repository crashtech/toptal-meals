import Ember from 'ember';
import resources from 'frontend/utils/resources';
import { module, test } from 'qunit';

var mockRouter = new Ember.Object({
  routes: [],
  prefix: [],
  paths: [],
  route(name, options, callback) {
    let routeName = this.get('prefix').concat(name).join('.');
    this.get('routes').push(routeName);

    if(options && options.path) {
      this.get('paths').push(options.path);
    }

    let caller = callback || options;
    if(caller && caller.constructor === Function) {
      this.get('prefix').push(name);
      caller.call(this);
      this.get('prefix').pop();
    }
  }
});

module('Unit | Utility | resources', {
  afterEach() {
    mockRouter.set('routes', []);
    mockRouter.set('prefix', []);
    mockRouter.set('paths', []);
  }
});

test('it creates some default routes', function(assert) {
  resources.call(mockRouter, 'test');

  assert.equal(mockRouter.routes.length, 5);
  assert.equal(mockRouter.routes[0], 'tests');
  assert.equal(mockRouter.routes[1], 'tests.record');
  assert.equal(mockRouter.routes[2], 'tests.record.edit');
  assert.equal(mockRouter.routes[3], 'tests.record.delete');
  assert.equal(mockRouter.routes[4], 'tests.new');

  assert.equal(mockRouter.paths.length, 1);
  assert.equal(mockRouter.paths[0], '/:test_id');
});

test('it can have a custom foreign name', function(assert) {
  resources.call(mockRouter, 'test', { foreignKey: 'sample_id' });
  assert.equal(mockRouter.paths.length, 1);
  assert.equal(mockRouter.paths[0], '/:sample_id');
});

test('it can have chained member items', function(assert) {
  resources.call(mockRouter, 'test').member(function() {
    resources.call(this, 'item');
  });

  assert.equal(mockRouter.paths.length, 2);
  assert.equal(mockRouter.routes.length, 10);
});

test('it can have chained collection items', function(assert) {
  resources.call(mockRouter, 'test').collection(function() {
    resources.call(this, 'item');
  });

  assert.equal(mockRouter.paths.length, 2);
  assert.equal(mockRouter.routes.length, 10);
});

test('it can have chained collection and member items', function(assert) {
  resources.call(mockRouter, 'test').collection(function() {
    resources.call(this, 'item');
  }).member(function() {
    resources.call(this, 'other');
  });

  assert.equal(mockRouter.paths.length, 3);
  assert.equal(mockRouter.routes.length, 15);
});
