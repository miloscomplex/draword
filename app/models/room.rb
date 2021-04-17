class Room < ApplicationRecord
  has_many :chats
  has_many :canvas
  # need optional to save with null value
  belongs_to :phrase, optional: true, foreign_key: 'selected_phrase_id'

  validates :title, presence: true
  validates :title, length: { minimum: 3, maximum: 15 }
end
