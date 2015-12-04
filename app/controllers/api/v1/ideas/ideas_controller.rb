class Api::V1::Ideas::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def destroy
    @idea = Idea.destroy(params[:id])
    respond_with @idea, json: @idea
  end

  def update
    @idea = Idea.update(params[:id], idea_params)
    respond_with @idea, json: @idea
  end

  private

    def idea_params
      params.require(:idea).permit(:title, :body, :quality)
    end
end