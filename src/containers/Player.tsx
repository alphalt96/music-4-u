import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineHeart } from 'react-icons/ai'

import { Discover, Tracklist, AudioPlayer } from '../components'
import client from '../utils/client'
import photo from '../assets/default.png'
import { Song } from '../utils/types'

const Player = () => {
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([])
  const [topChartSongs, setTopChartSongs] = useState<Song[]>([])
  const [playingSong, setPlayingSong] = useState<Song | null>(null)
  const [trackList, setTrackList] = useState<Song[]>([])
  const [isTrackListLooped, setIsTrackListLooped] = useState(false)

  useEffect(() => {
    client.getRecommendedSongs().then(async songs => {
      const songList = await Promise.all(songs.map(async song => {
        const imageUrl = await client.getSongImageUrl(song.id)
        return {
          ...song,
          img: imageUrl,
          releasedDate: new Date(song.releasedDate)
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
          releasedDate: new Date(song.releasedDate)
        }
      }))

      setTopChartSongs(songList)
    })
  }, [])

  const onSongFinished = () => {
    if (trackList.length === 0) return

    const indexInTracks = trackList.findIndex(item => item.id === playingSong?.id)
    if (indexInTracks !== -1) {
      if (indexInTracks < trackList.length - 1) {
        setPlayingSong(trackList[indexInTracks + 1])
      } else if (isTrackListLooped) {
        setPlayingSong(trackList[0])
      }
    } else {
      setPlayingSong(trackList[0])
    }
  }

  return (
    <div className="flex h-full">
      <Discover 
        topCharts={topChartSongs} 
        recommendedSongs={recommendedSongs} 
        setPlayingSong={setPlayingSong}
        trackList={trackList}
        setTrackList={setTrackList} />
      <div className="flex flex-col grow bg-sidebar">
        <div className="flex flex-col items-center pt-6">
          <span className="font-poppins font-semibold text-lg">Now playing {playingSong?.title}</span>
          <img
            className="w-300px h-300px mt-14 bg-black rounded-md shadow-lg"
            src={playingSong ? playingSong.img : photo}
            alt="song-photo" />
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
        <AudioPlayer playingSong={playingSong} onFinish={onSongFinished} />
      </div>
      <Tracklist 
        playingSong={playingSong}
        setPlayingSong={setPlayingSong}
        trackList={trackList}
        setTrackList={setTrackList} 
        isTrackListLooped={isTrackListLooped}
        setIsTrackListLooped={setIsTrackListLooped} />
    </div>
  )
}

export default Player
