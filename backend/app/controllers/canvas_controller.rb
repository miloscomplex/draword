class CanvasController < ApplicationController

  def create
    canva = Canva.new(canva_params)
    room = Room.find(canva_params[:room_id])
    if canva.save
      # necessary for using Serializer with WebSockets
      serialized_data= ActiveModelSerializers::Adapter::Json.new(
        CanvaSerializer.new(canva)
      ).serializable_hash
      CanvasChannel.broadcast_to room, serialized_data
      head :ok
      # stream_for and broadcast_to to be useful for transmitting data along non-universal channels, such as for members of a particular conversation or specific users
    end
  end

  private

  def canva_params
    params.require(:canva).permit(:action, :offsetX, :offsetY, :room_id)
  end

end
