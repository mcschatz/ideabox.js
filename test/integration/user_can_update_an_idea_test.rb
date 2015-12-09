require "test_helper"

class UserCanUpdateAnIdeaTest < ActionDispatch::IntegrationTest

  def teardown
    Capybara.reset_sessions!
  end

  test "user can edit an idea title" do
    visit root_path
    title = first(:xpath, "//p[@contenteditable='true']")
    title.set("yes, mam'")
    title.native.send_keys(:return)
    assert page.has_content?("yes, mam'")
  end

  test "user can edit an idea body" do
    visit root_path
    body = first(:xpath, "//p[@contenteditable='true']")
    body.set("work, please work")
    body.native.send_keys(:return)
    assert page.has_content?("work, please work")
  end
end