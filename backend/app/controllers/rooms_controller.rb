class RoomsController < ApplicationController

  def index
    rooms = Room.all
    render json: rooms
  end

  def create
    room = Room.create(room_params)
    if room.valid?
      id = room.id
      # broadcast to anyone subscribed to the FeedChannel for this specific id
      RoomChannel.broadcast_to id, RoomSerializer.new(room)
      render json: room
    else
      render json: { error: 'Could not create the room'}, status: 422
    end
  end

  private

  def room_params
    params.require(:room).permit(:title)
  end

end
