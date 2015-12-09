require 'test_helper'

class Api::V1::Ideas::IdeasControllerTest < ActionController::TestCase

  def teardown
    Capybara.reset_sessions!
  end

  test "#ideas" do

    get :index, format: :json, idea_id: Idea.last.id
    ideas = JSON.parse(response.body, symbolize_names: true)
    idea = ideas.first

    assert_response :success
    assert_equal "First One", idea[:title]
  end

  test "should create an idea" do
    idea = {title: "What up", body: "mobile app"}

    assert_equal 3, Idea.count

    post :create, format: :json, idea: idea
    idea = JSON.parse(response.body, symbolize_names: true)

    assert_equal "What up", idea[:title]
    assert_equal 4, Idea.count
  end

  test "should update an idea" do
    ideaParams = {title: "New one", body: "Updated"}
    idea = Idea.first

    assert_equal "Third One", idea.title

    put :update, format: :json, id: Idea.first.id, idea: ideaParams
    idea = JSON.parse(response.body, symbolize_names: true)
    assert_equal "New one", idea[:title]
  end

  test "should delete an idea" do
    idea = Idea.find("113629430")

    assert_equal "Third One", idea.title
    assert_equal 3, Idea.count

    delete :destroy, format: :json, id: Idea.first.id
    idea = JSON.parse(response.body, symbolize_names: true)

    assert_equal "Third One", idea[:title]
    assert_equal 2, Idea.count
  end
end