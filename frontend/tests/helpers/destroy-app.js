import Ember from 'ember';

export default function destroyApp(application) {
  Ember.run(application, 'destroy');
  if(server !== undefined) {
    server.shutdown();
  }
}
