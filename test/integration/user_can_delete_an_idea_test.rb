require "test_helper"

class UserCanDeleteAnIdeaTest < ActionDispatch::IntegrationTest

  def teardown
    Capybara.reset_sessions!
  end

  test "user can delete an idea" do
    visit root_path

    assert page.has_content?("Silly")
    assert 3, Idea.all.count

    first("#delete-idea").click

    assert 2, Idea.all.count
  end
end