import React from 'react'

import Discover from '../components/Discover'
import Tracklist from '../components/Tracklist'

const Player = () => {
  return (
    <div className="flex h-full">
      <Discover />
      <div>player</div>
      <Tracklist />
    </div>
  )
}

export default Player
