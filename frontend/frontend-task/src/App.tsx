import Navbar from "../components/Navbar.tsx"

// building data
import buildingData from "../../data.json"
import agsm from "../../assets/agsm.webp"
import ainsworth from "../../assets/ainsworth.webp"
import anitb from "../../assets/anitab.webp"
import biological from "../../assets/biologicalScience.webp"
import biologicalWest from "../../assets/biologicalScienceWest.webp"
import blockhouse from "../../assets/blockhouse.webp"
import business from "../../assets/businessSchool.webp"
import civil from "../../assets/civilBuilding.webp"
import colombo from "../../assets/colombo.webp"
import cse from "../../assets/cseBuilding.webp"

// middle icons
import searchbarIcon from "../../icon-assets/search_24dp_7A7A7A_FILL0_wght400_GRAD0_opsz24.png"
import filterAltIcon from "../../icon-assets/filter_alt_24.png"
import filterListIcon from "../../icon-assets/filter_list_24.png"

import greenDot from "../../icon-assets/circle_24dp_4DAE53_FILL1_wght400_GRAD0_opsz24.png"

function App() {
  const data = buildingData;

  const buildingList: Record<string, string> = {
    "./agsm.webp": agsm,
    "./ainsworth.webp": ainsworth,
    "./anitb.webp": anitb,
    "./biologicalScience.webp": biological,
    "./biologicalScienceWest.webp": biologicalWest,
    "./blockhouse.webp": blockhouse,
    "./businessSchool.webp": business,
    "./civilBuilding.webp": civil,
    "./colombo.webp": colombo,
    "./cseBuilding.webp": cse
  }

  return (
    <>
      <Navbar />

      {/* middle section */}
      <div className="flex flex-col sm:flex-row px-2 py-3 ml-2 justify-between mr-2 gap-1.5 sm:gap-3">
        <button className="order-1 sm:order-2 py-1.5 flex sm:flex-[0.9] lg:flex-[0.58] items-center border-2 border-gray-300 rounded">
          <img src={searchbarIcon} alt="gray search bar" className="flex justify-center ml-3 mr-2 text-black w-5 h-5" />
          <p className="text-gray-400 text-sm">
            Search for a building...
          </p>
        </button>
        <div className="order-2 sm:order-1 sm:contents flex justify-between">
          <button className="items-center flex py-1.5 px-4 border-2 border-[#ed6d00] rounded-lg">
            <img src={filterAltIcon} alt="filter alt icon" className="w-full text-black w-1/2 h-4 sm:h-6 sm:w-6" />
            <p className="text-[#ed6d00] font-bold px-2 mr-2 sm:px-4 text-xs sm:text-sm">
              Filters
            </p>
          </button>
          <button className="order-3 items-center flex py-1.5 px-5 border-2 border-[#ed6d00] rounded-lg">
            <img src={filterListIcon} alt="filter list icon" className="w-full text-black w-1/2 h-6 sm:h-6 sm:w-6" />
            <p className="text-[#ed6d00] font-bold px-2 mr-2 sm:px-4 text-xs sm:text-sm">
              Sort
            </p>
          </button>
        </div>

      </div>
      {/* building grid list */}
      <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-2 mx-4 mb-2 gap-4">
        {data.map((item, index) => {
          const image = item.building_file || item.building_picture
          return (
            <div key={index} style={{backgroundSize: "cover", backgroundPosition: "60% center", backgroundImage: `url(${buildingList[image as keyof typeof buildingList]})`}} className="relative h-20 sm:h-42 lg:h-75 rounded-md overflow-hidden items-center">
              <div className="absolute right-2 top-2 bg-white py-2 px-1 md:mx-1 rounded-xl flex items-center gap-2 ">
                <img src={greenDot} alt="green dot" className='w-1/10 ml-1'/>
                <p className="text-black text-[11px] font-semibold">
                  {item.rooms_available} rooms available
                </p>
              </div>

              <div className="flex items-center justify-center">
                <h3 className="py-3.25 px-4 rounded-lg bg-[#ed6d00] font-semibold text-sm absolute bottom-2 text-xs text-white w-[95%]">
                  {item.name}
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
