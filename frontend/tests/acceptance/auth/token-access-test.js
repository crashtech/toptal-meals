import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | token access');

test('authenticating with confirmation token', function(assert) {
  visit('/');
  click('a#token-access');

  selectChoose('.form-group.token-type', 'Account confirmation');
  fillIn('.form-group.token > input', faker.internet.password());

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/dashboard');
    assert.equal(find('div.alert-success').length, 1);
  });
});

test('authenticating with unlock token', function(assert) {
  visit('/');
  click('a#token-access');

  selectChoose('.form-group.token-type', 'Unlock account');
  fillIn('.form-group.token > input', faker.internet.password());

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/dashboard');
    assert.equal(find('div.alert-success').length, 1);
  });
});

test('authenticating with recover password token', function(assert) {
  visit('/');
  click('a#token-access');

  let password = faker.internet.password();

  selectChoose('.form-group.token-type', 'Recovery of password');
  fillIn('.form-group.token > input', faker.internet.password());

  andThen(() => {
    assert.equal(find('input[type=password]').length, 2);

    fillIn('.form-group.password > input', password);
    fillIn('.form-group.password-confirmation > input', password);

    click('button[type=submit]');

    andThen(() => {
      let session = containerLookup('service:session');
      assert.ok(session.get('isAuthenticated'));
    });
  });
});
