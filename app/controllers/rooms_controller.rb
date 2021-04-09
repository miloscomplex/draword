class RoomsController < ApplicationController

  def index
    rooms = Room.all
    render json: rooms
  end

  def create
    room = Room.create(room_params)
    if room.save
      # broadcast to anyone subscribed to the FeedChannel for this specific id
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ConversationSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast 'rooms_channel', serialized_data
      head :ok
    else
      render json: { error: 'Could not create the room'}, status: 422
    end
  end

  private

  def room_params
    params.require(:room).permit(:title)
  end

end