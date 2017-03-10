import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | users record index');

test('visiting an record', function(assert) {
  let user = server.create('user');
  authenticateWithRole('admin');
  visit('/dashboard');

  click('header > a:contains("Users")');
  click('table.table tbody tr:first td:last a[title="Show"]');

  andThen(() => {
    assert.equal(currentURL(), '/users/' + user.id);
  });
});
