import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user');

test('it has a label with first name and email', function(assert) {
  let model = this.subject({
    firstName: 'Smith',
    lastName: 'Johnson',
    email: 'user01@test.com'
  });
  assert.equal(model.get('label'), 'Smith (user01@test.com)');
});
