require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
# require "action_cable/engine"
# require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Toptal
  class Application < Rails::Application
    # Set which ember applications are being used
    config.ember_apps = %w(frontend)

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # Since this is api only, mount rails under a specific path.
    config.relative_url_root = '/api'

    # Add model concerns to be autoloaded
    config.autoload_paths << Rails.root.join('app', 'models', 'concerns')

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.generators do |g|
      g.test_framework   :rspec, fixture: true, views: false
      g.integration_tool :rspec, fixture: true, views: true
    end
  end
end
