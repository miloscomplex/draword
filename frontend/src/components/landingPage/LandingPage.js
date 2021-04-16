import React from 'react'
import RoomsList from '../rooms/RoomsList'

class HowToPlay extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div className='wrapper'>
        <div className='landing-page'>
          <h1>Landing Page</h1>
          <p>I'm baby tote bag photo booth chia listicle. Activated charcoal selfies quinoa raclette offal mustache. Hexagon taxidermy kitsch godard raw denim meh knausgaard listicle next level PBR&B lyft fingerstache normcore. Chambray wolf meggings health goth. Kogi poutine kickstarter master cleanse artisan edison bulb gochujang viral tbh biodiesel etsy keffiyeh yuccie schlitz waistcoat. Waistcoat mixtape brunch tacos, drinking vinegar plaid literally. Everyday carry tote bag palo santo, messenger bag cornhole leggings vegan artisan retro iceland listicle slow-carb hoodie fam mixtape.</p>
        </div>
        <RoomsList />
      </div>
    )
  }
}

export default HowToPlay
