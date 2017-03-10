import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  caloriesPerDay() { return faker.random.number({min: 1000, max: 5000}); }
});
