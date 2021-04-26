class GamePlaysChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @user = User.find_by_id(params[:user_id])
    stream_from "game_plays_channel_#{params[:user_id]}"
    @room = Room.find_by_id(params[:room_id])
  end

  def unsubscribed
    if @room
      @room.has_drawer = false
      @room.save
    end
    if @user
      @user.is_drawing = false
      @user.room_id = nil
      @user.save
    end
    # Any cleanup needed when channel is unsubscribed
  end
end
