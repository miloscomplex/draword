class ChatsController < ApplicationController

  def index
    chat = Chat.all
    render json: chat
  end

  def create
    chat = Chat.create(chat_params)
    room = Room.find(chat_params[:room_id])
    if chat.valid?
      # necessary for using Serializer with WebSockets
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ChatSerializer.new(chat)
      ).serializable_hash
      ActionCable.server.broadcast 'chats_channel', serialized_data
      head :ok
    else
      render json: { error: 'Could not create the chat_message'}, status: 422
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:text, :room_id)
  end
end
