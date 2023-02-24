import { MdOutlinePlaylistAdd } from 'react-icons/md'

import { RecommnedSongPropsType, Song } from '../utils/types'
import SongItem from './SongItem'

const RecommendedSong = ({ songs, setPlayingSong, trackList, setTrackList }: RecommnedSongPropsType) => {
  const addToTrackList = (addSong: Song) => {
    if (trackList.findIndex(trackItem => trackItem.id === addSong.id) !== -1)
      return

    setTrackList([...trackList, addSong])
  }

  return (
    <div>
      <div className="flex relative items-center mt-10">
        <span className="text-xl font-poppins text-gray3 font-semibold">You may like</span>
      </div>
      <div className="flex flex-col mt-5 gap-y-9px">
        {songs.map((song, idx) => (
          <div key={idx} className="flex">
            <SongItem song={song} setPlayingSong={setPlayingSong} />
            <button
              onClick={_ => addToTrackList(song)} >
              <MdOutlinePlaylistAdd fontSize={22} className="text-gray1 hover:text-gray2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendedSong
