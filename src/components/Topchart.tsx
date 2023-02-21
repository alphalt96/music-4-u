import React from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import photo from '../assets/default.png'

const Topchart = () => {
  const data = [
    {
      id: 1,
      title: 'Song 1',
      artist: 'nobody 1',
      releasedDate: new Date(),
      img: photo
    },
    {
      id: 2,
      title: 'Song 1',
      artist: 'nobody 1',
      releasedDate: new Date(),
      img: photo
    },
    {
      id: 3,
      title: 'Song 1',
      artist: 'nobody 1',
      releasedDate: new Date(),
      img: photo
    }
  ]

  return (
    <div className="flex flex-col gap-y-19px">
      <div className="flex relative items-center">
        <span className="text-xl text-gray3 font-poppins font-semibold">Top-chart</span>
        <div className="flex absolute right-2 items-center text-gray1">
          <span className="text-gray1 font-poppins">Week</span>
          <RiArrowDownSLine />
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-y-5">
        {data.map(item => (
          <div key={item.id}>
            <Link to="/">
              <img
                src={item.img}
                className="w-120px h-120px rounded-lg bg-black"
                alt="song-photo" />
            </Link>
            <div className="px-1 py-1.5">
              <Link to="/">
                <p className="font-medium text-gray3 text-sm font-poppins">{item.title}</p>
              </Link>
              <p className="font-light text-gray2 text-xs font-poppins">{item.artist}, {item.releasedDate.getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topchart
