require 'test_helper'

class Api::V1::Ideas::IdeasControllerTest < ActionController::TestCase
  test "#ideas" do

    get :index, format: :json, idea_id: Idea.last.id
    ideas = JSON.parse(response.body, symbolize_names: true)
    idea = ideas.first

    assert_response :success
    assert_equal "First One", idea[:title]
  end

  test "should update an idea" do
    ideaParams = {title: "New one", body: "Updated"}
    idea = Idea.first

    assert_equal "Third One", idea.title

    put :update, format: :json, id: Idea.first.id, idea: ideaParams
    idea = JSON.parse(response.body, symbolize_names: true)
    assert_equal "New one", idea[:title]
  end
end