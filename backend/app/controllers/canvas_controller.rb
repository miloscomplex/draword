class CanvasController < ApplicationController

  def index
    canvas = Canva.all
    render json: canvas
  end

  def show
    room = Room.find_by(id: params[:id])
    render json: room.canvas
  end

  def create
    canva = Canva.create(canva_params)
    room = Room.find(canva_params[:room_id])
    if canva.valid?
      # necessary for using Serializer with WebSockets
      serialized_data= ActiveModelSerializers::Adapter::Json.new(
        CanvaSerializer.new(canva)
      ).serializable_hash
      ActionCable.server.broadcast "canvas_channel_#{canva_params[:room_id]}", serialized_data
      # stream_for and broadcast_to to be useful for transmitting data along non-universal channels, such as for members of a particular conversation or specific users
      head :ok
    else
      render json: { error: 'Could not create the canvas_drawing'}, status: 422
    end
  end

  private

  def canva_params
    params.require(:canva).permit(:action, :offsetX, :offsetY, :room_id)
  end

end
