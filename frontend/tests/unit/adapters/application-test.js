import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:application', 'Unit | Adapter | application');

// Convert ember type name style to rails model name on route style
test('Path conversion to rails', function(assert) {
  let adapter = this.subject(), result;
  result = adapter.pathForType('book-store');
  assert.equal(result, 'book_stores', 'Convert ember type to rails path name');
});
