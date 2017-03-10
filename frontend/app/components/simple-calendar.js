import Ember from 'ember';

const computed = Ember.computed;
export default Ember.Component.extend({
  // Generate the list of dates
  date: computed('records', 'calories', function() {
    let date = this.getDate();
    let values = this.initialDays();
    let baseMonth = this.get('reference.month');

    while(date.getMonth() == baseMonth - 1) {
      values.push(this.getEntry(date.getDate()));
      date.setDate(date.getDate() + 1);
    }

    values = values.concat(this.finalDays());
    return values;
  }),

  // Generate a hash of the records organized by day
  entries: computed('records', function() {
    let result  = {};
    this.get('records').forEach((entry) => {
      let day = Number.parseInt(entry.get('date').split('-')[2])
      result[day] = entry;
    });

    return result;
  }),

  // Get the initial extra days based on the reference
  initialDays() {
    let date = this.getDate();
    let result = [];

    date.setDate(-date.getDay() + 1);
    while(date.getDate() != 1) {
      result.push({extra: true, day: date.getDate()});
      date.setDate(date.getDate() + 1);
    }

    return result;
  },

  // Get the final extra days based on the reference
  finalDays() {
    let date = this.getDate(true);
    let result = [];

    while(date.getDay() != 0) {
      result.push({extra: true, day: date.getDate()});
      date.setDate(date.getDate() + 1);
    }

    return result;
  },

  // Get the reference as date object
  getDate(nextMonth) {
    let extraMonth = nextMonth ? 0 : -1;
    let reference = this.get('reference');
    return new Date(reference.year, reference.month + extraMonth);
  },

  // Get a date entry for a given day
  getEntry(day) {
    let entry = this.get(`entries.${day}`) || new Ember.Object();
    entry.set('surpassed', this.get('calories'));
    entry.set('day', day);

    let calories = entry.get('calories');
    if(calories) {
      entry.set('surpassed', this.get('calories') < calories);
    }

    return entry;
  }
});
