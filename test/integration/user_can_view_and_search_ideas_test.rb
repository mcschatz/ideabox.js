require "test_helper"

class UserCanViewAndSearchIdeasTest < ActionDispatch::IntegrationTest

  def teardown
    Capybara.reset_sessions!
  end

  test "user can view root page" do
    visit root_path

    assert page.has_content?("ThoughtPour")
  end

  test "user can search by title" do
    visit root_path
    find("#search").click
    fill_in("search", with: "First")
    assert page.has_content?("First One")
    refute page.has_content?("Silly")
  end

  test "user can search by body" do
    visit root_path
    find("#search").click
    fill_in("search", with: "Happy")
    assert page.has_content?("Plausible")
    refute page.has_content?("Silly")
  end

  test "user can search by quality" do
    visit root_path
    find("#search").click
    fill_in("search", with: "Swill")
    assert page.has_content?("FINISHED")
    refute page.has_content?("Happy")
  end
end