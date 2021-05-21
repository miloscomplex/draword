class ChatsChannel < ApplicationCable::Channel

  def subscribed
    # stream_from "some_channel"
    stream_from "chats_channel_#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_stream_from "chats_channel_#{params[:id]}"
  end

end
