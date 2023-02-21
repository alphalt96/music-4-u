import React from 'react'
import { Link } from 'react-router-dom'

import photo from '../assets/default.png'

const RecommendedSong = () => {
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i + 1,
      title: 'Song 1',
      artist: 'nobody 1',
      releasedDate: new Date(),
      img: photo,
      duration: '22:23'
    })
  }

  return (
    <div>
      <div className="flex relative items-center mt-10">
        <span className="text-xl font-poppins text-gray3 font-semibold">You may like</span>
      </div>
      <div className="flex flex-col mt-5 gap-y-9px">
        {data.map(item => (
          <div className="flex">
            <Link to="/">
              <img 
                className="w-42px h-42px bg-black rounded-lg"
                src={item.img} 
                alt="song-photo" />
            </Link>
            <div className="flex flex-col px-2 grow justify-center text-gray3 font-poppins text-sm">
              <div className="flex justify-between">
                <span>{item.title}</span>
                <span>{item.duration}</span>
              </div>
              <div className="flex justify-between text-gray2 font-poppins text-xs">
                <span>{item.artist}</span>
                <span>{item.releasedDate.getFullYear()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedSong
