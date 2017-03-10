import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | settings index');

test('only normal users see their list of settings', function(assert) {
  authenticateWithRole('user');
  visit('/dashboard');

  click('nav > a:contains("Settings")');

  andThen(() => {
    assert.equal(currentURL(), '/settings');
  });
});

test('manager users are not able to access settings endpoint', function(assert) {
  authenticateWithRole('manager');
  visit('/settings');

  andThen(() => {
    assert.equal(currentURL(), '/dashboard');
  });
});

test('edditing a user\'s settings', function(assert) {
  authenticateWithRole('user');
  visit(`/settings`);

  fillIn('.form-group.caloriesPerDay > input', faker.random.number({min: 1000, max: 5000}));

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/dashboard');
    assert.equal(find('div.alert-success').length, 1);
  });
});
