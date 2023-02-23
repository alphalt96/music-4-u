import React, { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

import photo from '../assets/default.png'
import { Song, RecommnedSongPropsType } from '../utils/types'
import SongItem from './SongItem'

const RecommendedSong = ({ songs, setPlayingSong }: RecommnedSongPropsType) => {
  return (
    <div>
      <div className="flex relative items-center mt-10">
        <span className="text-xl font-poppins text-gray3 font-semibold">You may like</span>
      </div>
      <div className="flex flex-col mt-5 gap-y-9px">
        {songs.map(item => (
          <SongItem key={item.id} song={item} setPlayingSong={setPlayingSong} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedSong
