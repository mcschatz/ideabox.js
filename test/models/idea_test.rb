require "test_helper"

class IdeaTest < ActiveSupport::TestCase
  attr_reader :idea, :secondidea

  def setup
    @idea       = Idea.create(title: "Great Idea!", body: "You are a genius.")
    @secondidea = Idea.create(title: "Great Idea!", body: "You are a genius.")
  end

  test "an idea has a title" do
    assert_equal "Great Idea!", idea.title
  end

  test "an idea has a body" do
    assert_equal "You are a genius.", idea.body
  end

  test "an idea has a default quality of swill" do
    assert_equal "Swill", idea.quality
  end

  test "a quality of 1 is plausible" do
    idea = Idea.create(title: "blah", body: "wow", quality: 1)

    assert_equal "Plausible", idea.quality
  end

  test "a quality of 2 is genius" do
    idea = Idea.create(title: "sup", body: "steve", quality: 2)

    assert_equal "Genius", idea.quality
  end

  test "qualities cannot have the same body" do
    assert_equal true, idea.save
    assert_equal false, secondidea.save
  end
end