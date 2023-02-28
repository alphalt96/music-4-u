import { useDispatch } from 'react-redux'

import { setPlayingSong as setPlayingSong2 } from '../shared/reducers/playerSlice'
import { convertSecondToMin } from '../utils/timer'
import { SongItemPropType } from '../utils/types'

const SongItem = ({ song, isActive }: SongItemPropType) => {
  const dispatch = useDispatch()

  return (
    <div className="flex w-full">
      <button onClick={_ => dispatch(setPlayingSong2(song))}>
        <img
          className="w-42px h-42px bg-black object-contain rounded-lg"
          src={song.img}
          alt="song-cover" />
      </button>
      <div className="flex flex-col px-2 grow justify-center text-gray3 font-poppins text-sm">
        <div className="flex justify-between">
          <span className={isActive ? 'text-green2' : ''}>{song.title}</span>
          <span>{convertSecondToMin(song.duration)}</span>
        </div>
        <div className="flex justify-between text-gray2 font-poppins text-xs">
          <span>{song.artist}</span>
          <span>{new Date(song.releasedDate).getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default SongItem
