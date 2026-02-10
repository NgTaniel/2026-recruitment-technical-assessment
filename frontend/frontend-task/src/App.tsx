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
      <div className="flex flex-col sm:flex-row px-2 pt-2 pb-1 ml-2 justify-between mr-2 gap-1.5">
        <button className="order-1 sm:order-2 py-1.5 flex flex-[0.575] items-center border-2 border-gray-300 rounded">
          <img src={searchbarIcon} alt="gray search bar" className="flex justify-center ml-3 mr-2 text-black w-5 h-5" />
          <p className="text-gray-400">
            Search for a building...
          </p>
        </button>
        <div className="order-2 sm:order-1 sm:contents flex justify-between">
          <button className="items-center flex py-1.5 px-5 border-2 border-[#ed6d00] rounded-lg">
            <img src={filterAltIcon} alt="filter alt icon" className="w-full text-black w-1/2 h-6" />
            <p className="text-[#ed6d00] font-bold px-2 mr-2 text-sm">
              Filters
            </p>
          </button>
          <button className="order-3 items-center flex py-1.5 px-5 border-2 border-[#ed6d00] rounded-lg">
            <img src={filterListIcon} alt="filter list icon" className="w-full text-black w-1/2 h-6" />
            <p className="text-[#ed6d00] font-bold px-2 mr-2 text-sm">
              Sort
            </p>
          </button>
        </div>

      </div>
      {/* building grid list */}
      <div className="grid grid-cols-5 mx-4 my-1">
        {data.map((item, index) => {
          const image = item.building_file || item.building_picture
          return (
            <div key={index} style={{backgroundSize: "cover", backgroundPosition: "50% center", backgroundImage: `url(${buildingList[image as keyof typeof buildingList]})`}} className="relative h-75 rounded-md overflow-hidden items-center">
              
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
