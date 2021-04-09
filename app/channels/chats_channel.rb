class ChatsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    room = Room.find_by(id: params[:room])
    # conversation = Conversation.find_by(id: params[:conversation])
    stream_for room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
