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
    room.update(room_params)
    if room.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        RoomSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast "room_channel_#{params[:room_id]}",
      serialized_data
      render json: room
    else
      render json: { error: 'Could not update the room'}, status: 422
    end
  end

  def timer
    time = { current_time: params[:time] }
    ActionCable.server.broadcast "room_channel_#{params[:room_id]}", time
  end

  private

  def room_params
    params.require(:room).permit(:title, :room_id, :drawer_id, :selected_phrase_id, :status)
  end

end

#  REF FOR GAME_PLAY CONTROLLER
# def show
#   game_play = GamePlay.find_by(room_id: params[:room_id])
#   render json: game_play
# end
#
# def create
#   # just broadcast don't write to the server
#   game_play = GamePlay.create(room_id: game_play_params[:room_id]) do |room|
#     room.action = game_play_params[:action]
#   end
#
#   if game_play.save
#     serialized_data = game_play_params
#     ActionCable.server.broadcast "game_plays_channel_#{game_play_params[:room_id]}", game_play_params
#       # stream_for and broadcast_to to be useful for transmitting data along non-universal channels, such as for members of a particular conversation or specific users
#       head :ok
#   end
# end
#
# def receive(data)
#   ActionCable.server.broadcast "game_plays_channel_#{game_play_params[:room_id]}", "hee hawww"
# end
#
# private
#
# def game_play_params
#   params.require(:game_play).permit(:action, :room_id)
# end
