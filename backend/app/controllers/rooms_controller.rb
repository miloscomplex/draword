class RoomsController < ApplicationController

  def index
    rooms = Room.all
    render json: rooms
    # puts "current_user= #{current_user}"
  end

  def show
    # display by room_id
    room = Room.find_by(id: params[:id])
    render json: room
  end


  def create
    room = Room.create(room_params)
    if room.valid?
      # broadcast to anyone subscribed to the FeedChannel for this specific id
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        RoomSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast 'rooms_channel', serialized_data
      head :ok
    else
      render json: { error: 'Could not create the room'}, status: 422
    end
  end

  def update
    room = Room.find_by_id(params[:room_id])
    new_phrase = Phrase.find_by_id(params[:phrase_id])
    room.phrase = new_phrase
    params[:has_drawer] ? room.has_drawer = params[:has_drawer] : nil 
    if room.save
      render json: room
    else
      render json: { error: 'Could not update the room'}, status: 422
    end
  end

  private

  def room_params
    params.require(:room).permit(:title)
  end

end
