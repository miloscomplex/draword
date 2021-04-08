class ChatsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    chat = Chat.find(params[:chat])
    stream_for chat 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
