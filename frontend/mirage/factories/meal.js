import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title()    { return faker.lorem.sentence(); },
  calories() { return faker.random.number({min: 5, max: 1500}); },
  date()     {
    let settings = { year: 'numeric', month: 'short', day: '2-digit' };
    return faker.date.recent(60).toLocaleString('en-us', settings);
  },
  time()     {
    let settings = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return faker.date.recent().toLocaleString('en-us', settings);
  }
});
