import { Dispatch, SetStateAction } from 'react'
import { User } from './models/user'

export type SidebarPropType = {
  user?: User | null
}

export type Song = {
  id: number
  title: string
  artist: string
  img: string
  releasedDate: Date
  duration: number
}

export type SongItemPropType = {
  isActive?: boolean
  song: Song
  setPlayingSong: Dispatch<SetStateAction<Song | null>>
}

export type DiscoverPropsType = {
  topCharts: Song[]
  recommendedSongs: Song[]
  setPlayingSong: Dispatch<SetStateAction<Song | null>>
  trackList: Song[]
  setTrackList: Dispatch<SetStateAction<Song[]>>
}

export type TracklistPropsType = {
  playingSong: Song | null
  setPlayingSong: Dispatch<SetStateAction<Song | null>>
  trackList: Song[]
  setTrackList: Dispatch<SetStateAction<Song[]>>
  isTrackListLooped: boolean
  setIsTrackListLooped: Dispatch<SetStateAction<boolean>>
}

export type TopChartPropsType = {
  songs: Song[]
  trackList: Song[]
  setPlayingSong: Dispatch<SetStateAction<Song | null>>
  setTrackList: Dispatch<SetStateAction<Song[]>>
} 

export type RecommnedSongPropsType = {
  songs: Song[]
  trackList: Song[]
  setPlayingSong: Dispatch<SetStateAction<Song | null>>
  setTrackList: Dispatch<SetStateAction<Song[]>>
}

export type AudioPlayerPropsType = {
  playingSong: Song | null
  onFinish: () => void
}
