import { test } from 'qunit';
import { faker } from 'ember-cli-mirage';
import moduleForAcceptance from 'frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | meals record edit');

function fakerDate() {
  let settings = { year: 'numeric', month: 'short', day: '2-digit' };
  return faker.date.recent(60).toLocaleString('en-us', settings);
}

function fakerTime() {
  let settings = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return faker.date.recent().toLocaleString('en-us', settings);
}

test('accessing the edit page', function(assert) {
  let meal = server.create('meal');
  authenticateWithRole('user');
  visit('/dashboard');

  click('nav > a:contains("Meals")');
  click('table.table tbody tr:first td:last a[title="Edit"]');

  andThen(() => {
    assert.equal(currentURL(), `/meals/${meal.id}/edit`);
  });
});

test('edditing a record', function(assert) {
  let meal = server.create('meal');
  authenticateWithRole('user');
  visit(`/meals/${meal.id}/edit`);

  fillIn('.form-group.title > input', faker.lorem.sentence());
  fillIn('.form-group.calories > input', faker.random.number({min: 5, max: 1500}));
  fillIn('.form-group.date > input', fakerDate());
  fillIn('.form-group.time > input', fakerTime());

  click('button[type=submit]');

  andThen(() => {
    assert.equal(currentURL(), '/meals');
    assert.equal(find('div.alert-success').length, 1);
  });
});
