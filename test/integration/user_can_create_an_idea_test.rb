require "test_helper"

class UserCanCreateAnIdeaTest < ActionDispatch::IntegrationTest

  def teardown
    Capybara.reset_sessions!
  end

  test "user can create an idea" do
    visit root_path
    fill_in "idea-title", with: "Last"
    fill_in "idea-body", with: "Name"
    click_on("Save Idea")
    assert page.has_content?("Last")
  end
end