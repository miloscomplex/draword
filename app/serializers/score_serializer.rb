class ScoreSerializer < ActiveModel::Serializer
  attributes :points, :time_in_seconds, :guesses, :user
  def user
    { name: self.object.user.name,
      initials: self.object.user.initials }
  end
end
