class PhrasesController < ApplicationController

  def index
    phrases = Phrase.all
    render json: phrases
  end

  def show
    phrase = Phrase.find_by(id: params[:id])
    render json: phrase
  end

  def show_random
    random = Phrase.order(Arel.sql('RANDOM()')).first(3)
    render json: random
  end
end
