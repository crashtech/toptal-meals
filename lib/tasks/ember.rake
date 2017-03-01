require 'dotenv/tasks'

# Get a list of configurated ember apps
def ember_apps
  Rails.application.config.try(:ember_apps) || []
end

namespace :ember do
  desc 'Start both ember server and live reload for each configurated application'
  task start: :dotenv do
    return unless ember_apps.any?

    pwd = Pathname.pwd
    ember_apps.each do |app|
      unless Dir.exist?(app)
        puts "Ember #{app} application does not exist"
        next
      end

      port = [
        ENV["EMBER_#{app.upcase}_PORT"],
        ENV['EMBER_PORT'],
        '4200'
        ].compact.first

      lr_port = [
        ENV["EMBER_#{app.upcase}_LIVERELOAD"],
        ENV['EMBER_LIVERELOAD'],
        '35729'
        ].compact.first

      puts "Ember: starting #{app}"
      Dir.chdir(app) do
        runner = "nohup ember server"
        runner << " -p #{port} -lrp #{lr_port}"
        runner << " > #{pwd.join('log', app + '.log')}"
        runner << " 2>&1"
        runner << " & echo $! > #{pwd.join('tmp', 'pids', app + '.pid')}"
        system runner
      end
    end
  end

  desc 'Stop ember server for each configurated application'
  task :stop do
    return unless ember_apps.any?
    dir = Pathname.pwd.join('tmp', 'pids')
    ember_apps.each do |app|
      puts "Ember: stoping #{app}"
      system "kill -9 $(cat #{dir.join(app + '.pid')})"
    end
  end

  desc 'Restart each configurated application'
  task restart: [:stop, :start]
end
