require 'dotenv/tasks'

Rake::Task['default'].clear
task default: 'app:test'

def system!(cmd, message)
  result = system cmd
  raise (message % $?) unless result
end

namespace :app do
  desc 'Setup the application with bundle, database, seed then run tests'
  task setup: :dotenv do
    begin
      # Run rails needs
      Rake::Task['db:create'].invoke
      Rake::Task['db:schema:load'].invoke
      Rake::Task['db:migrate'].invoke
      Rake::Task['db:seed'].invoke

      # Clean up npm and bower before proceeding
      if ember_apps.any?
        system! 'npm cache clear', "Was not able to clean NPM cache"
        system! 'bower cache clean', "Was not able to clean Bower cache"
      end

      # Run ember needs
      ember_apps.each do |app|
        Dir.chdir(app) do
          system! 'rm -rf node_modules bower_components', "Could not delete previous node dependencies for #{app}: %s"
          system! 'npm install', "NPM was not able to install the packages for #{app}: %s"
          system! 'bower install', "Bower was not able to install the packages for #{app}: %s"
        end
      end

      # Call the tests and start servers
      Rake::Task['app:test'].invoke
      Rake::Task['app:start'].invoke
    rescue RuntimeError => e
      puts e.message
    end
  end

  desc 'Run all the tests needed'
  task :test do
    system! 'bundle exec rubocop', 'Rubocop has errors: %s'

    system! 'rails db:environment:set RAILS_ENV=test', 'Unable to set test env: %s'
    system! 'bundle exec rspec spec', 'RSpec has errors: %s'
    ember_apps.each do |app|
      Dir.chdir(app) do
        system! 'COVERAGE=true ember test', 'Ember app #{app} has errors: %s'
      end
    end
  end

  desc 'Start all servers needed'
  task :start do
    system! 'bundle exec rails server', 'Rails server was not able to start: %s'
    Rake::Task['ember:start'].invoke if ember_apps.any?
  end

  desc 'Stop all servers being used'
  task :stop do
    Rake::Task['ember:stop'].invoke if ember_apps.any?

    puts 'Stopping rails'
    system "kill -9 $(cat #{Pathname.pwd.join('tmp', 'pids', 'puma.pid')})"
  end

  desc 'Restart all servers being used'
  task :restart do
    Rake::Task['ember:restart'].invoke if ember_apps.any?

    puts 'Restarting rails'
    system! 'bundle exec rails restart', 'Rails server was not able to restart: %s'
  end
end
