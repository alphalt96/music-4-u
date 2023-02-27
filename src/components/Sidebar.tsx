import { RiNeteaseCloudMusicLine } from 'react-icons/ri'
import { AiOutlineSetting, AiOutlineDashboard } from 'react-icons/ai'
import { CiLogout, CiLogin } from 'react-icons/ci'
import { FiHeadphones, FiHeart, FiBookmark } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'

import { SidebarPropType } from '../utils/types';
import photo from '../assets/default.png'

const inactivatedMenu = 'p-2.5 rounded-lg'
const activatedMenu = 'bg-green2 text-white p-2.5 rounded-2xl'

const Sidebar = ({ user }: SidebarPropType) => {
  return (
    <div className="md:h-full relative flex md:flex-col md:order-first md:py-0 py-2.5 shrink-0 md:w-16 bg-sidebar items-center">
      <div className="hidden md:flex flex-col items-center border-b-2 py-6 gap-y-7">
        <RiNeteaseCloudMusicLine fontSize={40} className="text-green2" />
        <Link to={'/'}>
          <img className="w-10 h-10 rounded-full" src={photo} alt="user-avatar" />
        </Link>
      </div>
      <div className="flex md:flex-col md:w-auto md:justify-start md:gap-y-5 md:mt-5 md:self-center w-full justify-center gap-x-14 self-end">
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
      <div className="hidden md:flex flex-col absolute bottom-7 gap-y-5">
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
