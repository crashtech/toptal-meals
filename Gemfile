source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'
# ActiveModel::Serializer implementation and Rails hooks
gem 'active_model_serializers', '~> 0.10.0'

# Authentication gem
gem 'devise', '~> 4.2'
# Pagination gem
gem 'kaminari', '~> 0.16.3'
# Automatically eager loads Rails associations as associations are traversed
gem 'goldiloader', '~> 0.0.10'

group :development, :test do
  # Manage local env variables
  gem 'dotenv', github: 'bkeepers/dotenv', tag: 'v2.1.1', require: 'dotenv/rails-now'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  # RSpec rails is a testing framework for Rails
  gem 'rspec-rails', '~> 3.5', '>= 3.5.2'
  # Strategies for cleaning databases. Can be used to ensure a clean state for testing.
  gem 'database_cleaner', '~> 1.5', '>= 1.5.3'
  # A substitute for fixtures
  gem 'factory_girl_rails', '~> 4.5.0'
  # Gem for generating fake test data such as names and emails
  gem 'faker', '~> 1.5.0'
  # Code coverage for Ruby 1.9 or newer
  gem 'simplecov', '~> 0.12.0', require: false
  # Use rubocop for code syntax policies
  gem 'rubocop', '~> 0.46.0', require: false
  # Add a comment summarizing the current schema
  gem 'annotate', '~> 2.6.5'
end

group :test do
  # Brings back `assigns` and `assert_template` to your Rails tests
  gem 'rails-controller-testing', '~> 0.0.3'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
