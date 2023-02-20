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
    <div className="flex flex-col">
      <div className="flex relative items-center">
        <span className="text-xl">Top-chart</span>
        <div className="flex absolute right-2 items-center text-gray1">
          <span>Week</span>
          <RiArrowDownSLine />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5 justify-items-center gap-y-5">
        {data.map(item => (
          <div key={item.id}>
            <Link to="/">
              <img
                src={item.img}
                className="w-32 h-32 rounded-lg"
                alt="song-photo" />
            </Link>
            <div className="">
              <Link to="/">
                <p className="font-medium">{item.title}</p>
              </Link>
              <p className="font-light text-gray2">{item.artist}, {item.releasedDate.getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topchart
