class CanvasChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # canva = Canva.find(params[:canva])
    # stream_for canva
    stream_from "canvas_channel_#{params[:id]}"
    # canvas = Room.find_by(id: params[:id])
    # stream_for canvas
  end

  def received
    console.log('hmmm')
    ActionCable.server.broadcast("canvas_channel_#{params[:id]}", {
      canvasAction: params[:canvasAction]
      })

      render json: {message: 'success'}, status: 200
    end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

end
