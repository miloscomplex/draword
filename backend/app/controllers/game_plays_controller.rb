class GamePlaysController < ApplicationController
  def index
    game_plays = GamePlay.all
    render json: game_plays
  end

  def show
    game_play = GamePlay.find_by(id: params[:id])
    render json: game_play
  end

  def create
    # just broadcast don't write to the server
    game_play = GamePlay.create(game_play_params)
    if game_play.save
      serialized_data = game_play_params
      ActionCable.server.broadcast "game_plays_channel_#{game_play_params[:room_id]}", game_play_params
        # stream_for and broadcast_to to be useful for transmitting data along non-universal channels, such as for members of a particular conversation or specific users
        head :ok
    end
  end

  def receive(data)
    ActionCable.server.broadcast "game_plays_channel_#{game_play_params[:room_id]}", "hee hawww"
  end

  private

  def game_play_params
    params.require(:game_play).permit(:action, :room_id)
  end
end
