import React, { useState } from 'react'
import { FiRepeat } from 'react-icons/fi'
import { BsShuffle } from 'react-icons/bs'
import { RxDragHandleHorizontal } from 'react-icons/rx'

import SongItem from './SongItem'
import { useAppDispatch, useAppSelector } from '../shared/hooks'
import { setTrackList, setTrackListLooped } from '../shared/reducers/playerSlice'

const Tracklist = () => {
  const dispatch = useAppDispatch()

  const playingSong = useAppSelector(state => state.player.playingSong)
  const trackList = useAppSelector(state => state.player.trackList.data)
  const isTrackListLooped = useAppSelector(state => state.player.trackList.isTrackListLooped)

  const [selectItemIdx, setSelectItemIdx] = useState<number | null>(null)
  const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null)

  const onDragStart = (e: any, idx: number) => {
    setSelectItemIdx(idx)
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 10, 20)
  }

  const onDragEnd = () => {
    if (dragOverItemIdx === selectItemIdx) return

    const newSongList = trackList.filter((_, i) => i !== selectItemIdx)
    newSongList.splice(dragOverItemIdx!, 0, trackList[selectItemIdx!])
    dispatch(setTrackList(newSongList))
    setSelectItemIdx(null)
    setDragOverItemIdx(null)
  }

  const onDragEnter = (idx: number) => {
    setDragOverItemIdx(idx)
  }

  return (
    <div className="md:flex md:static md:h-full md:rounded-none md:bg-transparent h-4/5 bg-gray-800 rounded-md right-0 absolute flex-col w-80 px-4">
      <div className="flex flex-col gap-y-3 mt-6">
        <span className="font-poppins text-gray4 md:text-gray3 text-xl font-bold">Track list</span>
        <div className="flex gap-x-4">
          <button>
            <BsShuffle
              fontSize={20}
              className="text-gray4" />
          </button>
          <button onClick={_ => dispatch(setTrackListLooped(!isTrackListLooped))}>
            <FiRepeat
              fontSize={20}
              className={isTrackListLooped ? 'text-green2' : 'text-gray4'} />
          </button>
        </div>
        <span className="font-poppins text-gray1 text-sm">Playing next</span>
      </div>
      <div className="flex flex-col gap-y-9px mt-3 overflow-scroll hide-scrollbar">
        {trackList.map((song, idx) => (
          <div key={idx} onDragEnter={_ => onDragEnter(idx)} className="flex items-center gap-x-2">
            <button
              draggable={song.id !== playingSong?.id}
              onDragStart={e => onDragStart(e, idx)}
              onDragEnd={onDragEnd}>
              <RxDragHandleHorizontal className="text-gray1" />
            </button>
            <SongItem isActive={song.id === playingSong?.id} song={song} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tracklist
