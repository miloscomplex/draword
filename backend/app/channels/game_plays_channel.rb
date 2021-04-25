class GamePlayChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "game_play_channel_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
