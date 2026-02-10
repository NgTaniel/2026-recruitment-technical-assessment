// import React from 'react'

import freeroomsIcon from '../../assets/freeRoomsLogo.png'
import searchIcon from '../../icon-assets/search_24.png'
import gridIcon from '../../icon-assets/grid_view_24.png'
import mapIcon from '../../icon-assets/map_24.png'
import darkIcon from '../../icon-assets/dark_mode.png'

const Navbar = () => {
  return (
    <div>
      <div className='flex border-b border-gray-300 justify-between items-center'>
        {/* left side */}
        <div className='flex px-1.5 w-full ml-2 my-2 justify-start rounded-sm sm:w-1/4 lg:w-1/8'>
          <img src={freeroomsIcon} alt="freerooms logo" className='w-1/4 text-black'/>
          <h1 className='font-josefin text-3xl pt-0.5 text-[#ed6d00] font-semibold sm:block hidden'>Freerooms</h1>
        </div>

        {/* Right side */}
        <div className='flex justify-center items-center gap-2 mr-4'>
          <div className='border border-[#ed6d00] p-2 h-7/8 rounded-sm'>
            <img src={searchIcon} alt="search logo" className='w-15 sm:w-5 text-black'/>
          </div>
          <div className='border border-[#ed6d00] bg-[#ed6d00] p-2 h-7/8 rounded-sm'>
            <img src={gridIcon} alt="grid logo" className='w-15 sm:w-5 text-black'/>
          </div>
          <div className='border border-[#ed6d00] p-2 h-7/8 rounded-sm'>
            <img src={mapIcon} alt="map logo" className='w-15 sm:w-5 text-black'/>
          </div>
          <div className='border border-[#ed6d00] p-2 h-7/8 rounded-sm'>
            <img src={darkIcon} alt="dark mode logo" className='w-15 sm:w-5 text-black'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar