import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('table-pagination', 'Integration | Component | table pagination', {
  integration: true,

  beforeEach() {
    this.set('externalPage', () => {});
  }
});

test('it should be hidden when does not have current page', function(assert) {
  this.set('externalData', {});
  this.render(hbs`{{table-pagination data=externalData page=(action externalPage)}}`);
  assert.ok(this.$('ul.pagination').is('.hidden'));
});

test('it should disable the first two links when self is the first page', function(assert) {
  this.set('externalData', { self: 1, next: 2, last: 2 });
  this.render(hbs`{{table-pagination data=externalData page=(action externalPage)}}`);
  assert.notOk(this.$('ul.pagination').is('.hidden'));
  assert.equal(this.$('ul.pagination > li:lt(2).disabled').length, 2);
});

test('it should disable the last two links when self is the last page', function(assert) {
  this.set('externalData', { self: 2, prev: 1, first: 1 });
  this.render(hbs`{{table-pagination data=externalData page=(action externalPage)}}`);
  assert.notOk(this.$('ul.pagination').is('.hidden'));
  assert.equal(this.$('ul.pagination > li:gt(3).disabled').length, 2);
});

test('it should not show more than the configurated page number links', function(assert) {
  this.set('externalShowPages', 7);
  this.set('externalData', { self: 10, next: 11, prev: 9, last: 20, first: 1 });
  this.render(hbs`{{table-pagination showPages=externalShowPages data=externalData page=(action externalPage)}}`);
  assert.notOk(this.$('ul.pagination').is('.hidden'));
  assert.equal(this.$('ul.pagination > li').length, 11);
});

test('it should keep seven page number links even at the beginning', function(assert) {
  this.set('externalShowPages', 7);
  this.set('externalData', { self: 1, next: 2, last: 20 });
  this.render(hbs`{{table-pagination showPages=externalShowPages data=externalData page=(action externalPage)}}`);
  assert.notOk(this.$('ul.pagination').is('.hidden'));
  assert.equal(this.$('ul.pagination > li').length, 11);
});

test('it should keep seven page number links even at the end', function(assert) {
  this.set('externalShowPages', 7);
  this.set('externalData', { self: 20, prev: 19, first: 1 });
  this.render(hbs`{{table-pagination showPages=externalShowPages data=externalData page=(action externalPage)}}`);
  assert.notOk(this.$('ul.pagination').is('.hidden'));
  assert.equal(this.$('ul.pagination > li').length, 11);
});
