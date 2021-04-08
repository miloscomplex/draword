class RoomsController < ApplicationController

  def index
    rooms = Room.all
    render json: rooms
  end

  def create
    room = Room.new(room_params)
    if room.save
      # necessary for using Serializer with WebSockets
      serialized_data = ActiveModelSerializers::Adapter::Json.new( RoomSerializer.new(room)).serializable_hash
      ActionCable.server.broadcast 'rooms_channel', serialized_data
      head :ok
      # 'rooms_channel' corresponds to the method specified in the Channel 

    end
  end

  private

  def room_params
    params.require(:room).permit(:title)
  end

end
