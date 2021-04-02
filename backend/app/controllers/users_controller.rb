class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def show
      user = User.find_by_id(params[:id])
      render json: user
    end

    def create
      user = User.find_or_create_by(user_params)
      user = user.scores.build(score_params)
      if user.valid? && user.save
        render json: score
      else
        render json: { errors: user.errors }, status: 422
      end
    end

  def destroy
    user = User.find_by_id(params[:id])
    score.destroy
    render json: score
  end

private

  def score_params
    params.require(:score).permit(:user_id, :points, :time_in_seconds, :guesses)
  end

  def user_params
    params.require(:user).permit(:name, :initials)
  end

end
