import React from 'react'

import Topchart from './Topchart'

const discover = () => {
  return (
    <div className="h-full max-w-350px overflow-scroll pl-5">
      <div className="flex h-20 items-center">
        <h1 className="text-4xl">Discover New Music</h1>
      </div>
      <div className="mt-5">
        <Topchart />
      </div>
    </div>
  )
}

export default discover
