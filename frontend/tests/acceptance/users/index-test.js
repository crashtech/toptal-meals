import { test } from 'qunit';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | users index');

test('normal users are not able to access users endpoint', function(assert) {
  authenticateWithRole('user');
  visit('/users');

  andThen(() => {
    assert.equal(currentURL(), '/dashboard');
  });
});

test('manager users are able to access users endpoint', function(assert) {
  authenticateWithRole('manager');
  visit('/users');

  andThen(() => {
    assert.equal(currentURL(), '/users');
  });
});

test('admin users see a list of users', function(assert) {
  server.createList('user', 10);
  authenticateWithRole('admin');
  visit('/dashboard');

  click('header > a:contains("Users")');

  andThen(() => {
    assert.equal(currentURL(), '/users');
    assert.equal(find('table.table').length, 1);
    assert.equal(find('table.table > tbody > tr').length, 11);
  });
});
