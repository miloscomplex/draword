class GamePlaysChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @user = User.find_by_id(params[:user_id])
    stream_from "game_plays_channel_#{params[:user_id]}"

  end

  def unsubscribed
    @user.room_id = nil
    @user.save
    # Any cleanup needed when channel is unsubscribed
  end
end
