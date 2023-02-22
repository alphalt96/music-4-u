import React from 'react'

import Topchart from './Topchart'
import RecommendedSong from './RecommendedSong'

const discover = () => {
  return (
    <div className="h-full overflow-scroll hide-scrollbar pl-19px pr-3.5">
      <div className="flex h-20 items-center">
        <h1 className="text-3xl font-poppins font-bold text-gray3">Discover New Music</h1>
      </div>
      <div className="mt-5">
        <Topchart />
        <RecommendedSong />
      </div>
    </div>
  )
}

export default discover
