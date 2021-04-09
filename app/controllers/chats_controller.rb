class ChatsController < ApplicationController

  def create
    chat = Chat.new(chat_params)
    room = Room.find(chat_params[:room_id])
    if chat.save
      # necessary for using Serializer with WebSockets
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ChatSerializer.new(chat)
      ).serializable_hash
      ChatsChannel.broadcast_to room, serialized_data
      head :ok
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:text, :room_id)
  end
end
