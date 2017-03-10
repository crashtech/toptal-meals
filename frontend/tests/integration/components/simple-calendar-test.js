import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('simple-calendar', 'Integration | Component | simple calendar', {
  integration: true,

  beforeEach() {
    this.set('calories', 200);
    this.set('reference', new Ember.Object({month: 1, year: 2017}));
    this.set('records', [
      new Ember.Object({date: '2017-01-01', calories: 100, meals: 1}),
      new Ember.Object({date: '2017-01-02', calories: 200, meals: 2}),
      new Ember.Object({date: '2017-01-03', calories: 300, meals: 3}),
    ]);
  }
});

test('it renders 35 days on body', function(assert) {
  this.render(hbs`{{simple-calendar calories=calories reference=reference records=records}}`);
  assert.equal(this.$('section#calendar > div.body > span').length, 35);
});

test('it should have 2 green items from the given records', function(assert) {
  this.render(hbs`{{simple-calendar calories=calories reference=reference records=records}}`);
  assert.equal(this.$('section#calendar > div.body > span > b.green').length, 2);
});

test('it should have 1 red item from the given records', function(assert) {
  this.render(hbs`{{simple-calendar calories=calories reference=reference records=records}}`);
  assert.equal(this.$('section#calendar > div.body > span > b.red').length, 1);
});
