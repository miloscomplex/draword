class CanvasChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    canva = Canva.find(params[:canva])
    stream_for canva 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
