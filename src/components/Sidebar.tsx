import React, { useState } from 'react'
import { RiNeteaseCloudMusicLine } from 'react-icons/ri'
import { AiOutlineSetting, AiOutlineDashboard, AiOutlineLogout } from 'react-icons/ai'
import { CiLogout, CiLogin } from 'react-icons/ci'
import { FiHeadphones, FiHeart, FiBookmark } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'

import { SidebarPropType } from '../utils/types';
import photo from '../assets/default.png'

const inactivatedMenu = 'p-2.5 rounded-lg'
const activatedMenu = 'bg-green2 text-white p-2.5 rounded-2xl'

const Sidebar = ({ user }: SidebarPropType) => {
  return (
    <div className="h-full relative flex flex-col shrink-0 w-16 bg-sidebar items-center">
      <div className="flex flex-col items-center border-b-2 py-6 gap-y-7">
        <RiNeteaseCloudMusicLine fontSize={40} className="text-green2" />
        <Link to={'/'}>
          <img className="w-10 h-10 rounded-full" src={photo} alt="user-photo" />
        </Link>
      </div>
      <div className="flex flex-col gap-y-5 mt-5">
        <NavLink to={'/'} className={({ isActive }) => isActive ? activatedMenu : inactivatedMenu}>
          <AiOutlineDashboard fontSize={24} />
        </NavLink>
        <NavLink to={'/player'} className={({ isActive }) => isActive ? activatedMenu : inactivatedMenu}>
          <FiHeadphones fontSize={24} />
        </NavLink>
        <NavLink to={'/likes'} className={({ isActive }) => isActive ? activatedMenu : inactivatedMenu}>
          <FiHeart fontSize={24} />
        </NavLink>
        <NavLink to={'/bookmarks'} className={({ isActive }) => isActive ? activatedMenu : inactivatedMenu}>
          <FiBookmark fontSize={24} />
        </NavLink>
      </div>
      <div className="flex flex-col absolute bottom-7 gap-y-5">
        <Link to={'/'}>
          <AiOutlineSetting fontSize={25} />
        </Link>
        {user ? (
          <Link to={'/'}>
            <CiLogout fontSize={25} />
          </Link>
        ) : (
          <Link to={'/'}>
            <CiLogin fontSize={25} />
          </Link>
        )}
      </div>
    </div>
  )
}

export default Sidebar
