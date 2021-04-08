class ConversationsController < ApplicationController

  def index
    conversation = Conversation.all
    render json: conversation
  end

  def create
    conversation = Conversation.new(conversation_params)
    if conversation.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(ConversConversationSerializer.new(conversation)
      ).serializable_hash
      ActionCable.server.broadcast 'conversations_channel', serialized_data
      head :ok
    end
  end

  private

  def conversation_params
    params.require(:conversation).permit(:title)
  end
end
