class Room < ApplicationRecord
  has_many :chats
  has_many :canvas
  has_one :phrase, foreign_key: 'selected_phrase_id'

  validates :title, presence: true
  validates :title, length: { minimum: 3, maximum: 10 }
end
