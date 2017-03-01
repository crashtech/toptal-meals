# Initialize simplecov correctly for model coverage
if Rails.env.test?
  require 'simplecov'
  SimpleCov.start 'rails'
end
