import { MdOutlinePlaylistAdd } from 'react-icons/md'

import { useAppDispatch } from '../shared/hooks'
import { addToTrackList } from '../shared/reducers/playerSlice'
import { RecommnedSongPropsType, Song } from '../utils/types'
import SongItem from './SongItem'

const RecommendedSong = ({ songs }: RecommnedSongPropsType) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="flex relative items-center mt-10">
        <span className="text-xl font-poppins text-gray3 font-semibold">You may like</span>
      </div>
      <div className="flex flex-col mt-5 gap-y-9px">
        {songs.map((song, idx) => (
          <div key={idx} className="flex">
            <SongItem song={song} />
            <button
              onClick={_ => dispatch(addToTrackList(song))} >
              <MdOutlinePlaylistAdd fontSize={22} className="text-gray1 hover:text-gray2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedSong
