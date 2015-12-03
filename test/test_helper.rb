ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/pride'
SimpleCov.start 'rails'

class ActiveSupport::TestCase
  fixtures :all
  include Capybara::DSL

  def setup
    Capybara.app = Ideabox::Application
    Capybara.current_driver = Capybara.javascript_driver
    Capybara.default_max_wait_time = 5
  end
end
