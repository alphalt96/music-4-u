import React from 'react'
import { Link } from 'react-router-dom'

import photo from '../assets/default.png'
import { Song } from '../utils/types'
import SongItem from './SongItem'

const RecommendedSong = () => {
  const data: Song[] = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i + 1,
      title: 'Song 1',
      artist: 'nobody 1',
      releasedDate: new Date(),
      img: photo,
      duration: 280
    })
  }

  return (
    <div>
      <div className="flex relative items-center mt-10">
        <span className="text-xl font-poppins text-gray3 font-semibold">You may like</span>
      </div>
      <div className="flex flex-col mt-5 gap-y-9px">
        {data.map(item => (
          <SongItem key={item.id} song={item} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedSong
