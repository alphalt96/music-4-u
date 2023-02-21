import React from 'react'
import { AiOutlinePlus, AiOutlineHeart } from 'react-icons/ai'

import { Discover, Tracklist, AudioPlayer } from '../components'
import photo from '../assets/default.png'

const Player = () => {
  return (
    <div className="flex h-full">
      <Discover />
      <div className="flex flex-col grow bg-sidebar">
        <div className="flex flex-col items-center pt-6">
          <span className="font-poppins font-semibold text-lg">Now playing</span>
          <img 
            className="w-300px h-300px mt-14 bg-black rounded-md shadow-lg"
            src={photo} 
            alt="song-photo" />
          <div className="flex w-300px h-45px justify-between mt-5">
            <button>
              <AiOutlinePlus fontSize={20} />
            </button>
            <div className="flex flex-col items-center">
              <span className="font-poppins text-gray3 font-semibold">Money Machine</span>
              <span className="font-poppins text-gray2">1000 Gecks</span>
            </div>
            <button>
              <AiOutlineHeart fontSize={20} />
            </button>
          </div>
        </div>
        <AudioPlayer />
      </div>
      <Tracklist />
    </div>
  )
}

export default Player
