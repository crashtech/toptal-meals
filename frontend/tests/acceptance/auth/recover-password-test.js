import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | recovering password');

test('traing to recover password', function(assert) {
  visit('/');
  click('a#recover-password');

  fillIn('.form-group.email > input', faker.internet.email());

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/token-access');
    assert.equal(find('div.alert-success').length, 1);
  });
});
