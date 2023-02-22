import { Link } from 'react-router-dom'

import { convertSecondToMin } from '../utils/timer'
import { SongItemPropType } from '../utils/types'

const SongItem = ({ song }: SongItemPropType) => {
  return (
    <div className="flex w-full">
      <Link to="/">
        <img
          className="w-42px h-42px bg-black rounded-lg"
          src={song.img}
          alt="song-photo" />
      </Link>
      <div className="flex flex-col px-2 grow justify-center text-gray3 font-poppins text-sm">
        <div className="flex justify-between">
          <span>{song.title}</span>
          <span>{convertSecondToMin(song.duration)}</span>
        </div>
        <div className="flex justify-between text-gray2 font-poppins text-xs">
          <span>{song.artist}</span>
          <span>{song.releasedDate.getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default SongItem
