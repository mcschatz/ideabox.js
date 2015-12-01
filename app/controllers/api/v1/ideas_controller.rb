class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  private

    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end
end