import React from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import { TopChartPropsType } from '../utils/types'

const Topchart = ({ songs, setPlayingSong }: TopChartPropsType) => {
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
        {songs.map(song => (
          <div key={song.id}>
            <button
              onClick={_ => setPlayingSong(song)}>
              <img
                src={song.img}
                className="w-120px h-120px rounded-lg bg-black"
                alt="song-photo" />
            </button>
            <div className="px-1">
              <button
                onClick={_ => setPlayingSong(song)} >
                <p className="font-medium text-gray3 text-sm font-poppins">{song.title}</p>
              </button>
              <p className="font-light text-gray2 text-xs font-poppins">{song.artist}, {song.releasedDate.getFullYear()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topchart
