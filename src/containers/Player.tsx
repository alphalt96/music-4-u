import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineHeart } from 'react-icons/ai'
import { MdPlaylistPlay, MdOutlineFeaturedPlayList } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

import { useAppDispatch, useAppSelector } from '../shared/hooks'
import { setPlayingSong, unsetPlayingSong } from '../shared/reducers/playerSlice'
import { Discover, Tracklist, AudioPlayer } from '../components'
import client from '../utils/client'
import photo from '../assets/default.png'
import { Song } from '../utils/types'

const Player = () => {
  const dispatch = useAppDispatch()

  const playingSong = useAppSelector(state => state.player.playingSong)
  const trackList = useAppSelector(state => state.player.trackList.data)
  const isTrackListLooped = useAppSelector(state => state.player.trackList.isTrackListLooped)
  const [toggleTrackList, setToggleTrackList] = useState(false)

  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([])
  const [topChartSongs, setTopChartSongs] = useState<Song[]>([])

  useEffect(() => {
    client.getRecommendedSongs().then(async songs => {
      const songList = await Promise.all(songs.map(async song => {
        const imageUrl = await client.getSongImageUrl(song.id)
        return {
          ...song,
          img: imageUrl,
          releasedDate: new Date(song.releasedDate).toString()
        }
      }))

      setRecommendedSongs(songList)
    })

    client.getTopChartSongs().then(async songs => {
      const songList = await Promise.all(songs.map(async song => {
        const imageUrl = await client.getSongImageUrl(song.id)
        return {
          ...song,
          img: imageUrl,
          releasedDate: new Date(song.releasedDate).toString()
        }
      }))

      setTopChartSongs(songList)
    })
  }, [])

  const onSongFinished = useCallback(() => {
    if (trackList.length === 0) return

    const indexInTracks = trackList.findIndex(item => item.id === playingSong?.id)
    if (indexInTracks !== -1) {
      if (indexInTracks < trackList.length - 1) {
        dispatch(setPlayingSong(trackList[indexInTracks + 1]))
      } else if (isTrackListLooped) {
        dispatch(unsetPlayingSong())
        setTimeout(() => {
          dispatch(setPlayingSong(trackList[0]))
        })
      }
    } else {
      dispatch(setPlayingSong(trackList[0]))
    }
    // eslint-disable-next-line
  }, [playingSong])

  return (
    <div className="flex h-full">
      <div className="hidden md:block">
        <Discover
          topCharts={topChartSongs}
          recommendedSongs={recommendedSongs} />
      </div>
      <div className="flex flex-col grow bg-sidebar">
        <div className="flex flex-col items-center pt-6">
          <span className="font-poppins font-semibold text-lg">Now playing {playingSong?.title}</span>
          <img
            className="w-300px h-300px mt-14 rounded-md shadow-lg object-contain"
            src={playingSong ? playingSong.img : photo}
            alt="song-cover" />
          <div className="flex w-300px h-45px justify-between mt-5">
            <button>
              <AiOutlinePlus fontSize={20} />
            </button>
            <div className="flex flex-col items-center">
              <span className="font-poppins text-gray3 font-semibold">{playingSong ? playingSong.title : ''}</span>
              <span className="font-poppins text-gray2">{playingSong ? playingSong.artist : ''}</span>
            </div>
            <button>
              <AiOutlineHeart fontSize={20} />
            </button>
          </div>
        </div>
        <AudioPlayer onFinish={onSongFinished} />
        <div className="flex md:hidden justify-center mt-10">
          <div className="flex w-300px justify-between">
            <button>
              <MdOutlineFeaturedPlayList fontSize={25} />
            </button>
            <button
              onClick={_ => setToggleTrackList(!toggleTrackList)} >
              <MdPlaylistPlay 
                fontSize={25}
                className={toggleTrackList ? 'text-green2': ''} />
            </button>
          </div>
        </div>
      </div>

      {/* For desktop devices */}
      <div className="hidden md:block">
        <Tracklist />
      </div>

      {/* For mobile devices */}
      {toggleTrackList && (
        <div className="flex md:hidden relative">
          <Tracklist />
          <button 
            className="absolute right-5 top-3"
            onClick={_ => setToggleTrackList(false)} >
            <RxCross1 className="text-gray4" fontSize={25} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Player
