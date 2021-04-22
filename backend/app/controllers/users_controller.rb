class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find_by_id(session[:current_user_id])
    render json: user
  end

  def create
    @user = User.create(name: SecureRandom.hex)
    if @user.valid?
      session[:current_user_id] = @user.id
      session[:is_drawing] = @user.is_drawing
      render json: @user
    else
      render json: { error: 'Could not create the user'}, status: 422
    end
  end

  def update
    user = User.find_by_params(params[:user_id])
    user.is_drawing = params[:is_drawing]
    if user.save
      render json: user
    else
      render json: { error: 'Could not update the user'}, status: 422
    end
  end

  def destroy
    user = User.find_by_id(params[:user_id])
    render json: user
  end

private

  def score_params
    params.require(:score).permit(:user_id, :points, :time_in_seconds, :guesses)
  end

  def user_params
    params.require(:user).permit(:name, :initials, :is_drawing)
  end

end
