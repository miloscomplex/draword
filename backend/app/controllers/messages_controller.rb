class MessagesController < ApplicationController
  def create
    # message = Message.new(message_params)
    conversation = Conversation.find(message_params[:conversation_id])
    message = conversation.messages.new(message_params)
    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
              MessageSerializer.new(message)
            ).serializable_hash
            MessagesChannel.broadcast_to conversation, serialized_data
            head :ok
      # MessagesChannel.broadcast_to conversation, MessageSerializer.new(message)
    else
      render json: { error: 'Could not create that message'}, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :conversation_id)
  end

end
