import Navbar from "../components/Navbar.tsx"

// middle icons
import searchbarIcon from "../../icon-assets/search_24dp_7A7A7A_FILL0_wght400_GRAD0_opsz24.png"
import filterAltIcon from "../../icon-assets/filter_alt_24.png"
import filterListIcon from "../../icon-assets/filter_list_24.png"

function App() {

  return (
    <>
      <Navbar />

      {/* middle section */}
      <div className="flex flex-col px-2 pt-2 pb-1 ml-2 justify-between mr-2 gap-1.5">
        <div className="flex justify-between">
          <button className="items-center flex py-1.5 px-5 border-2 border-[#ed6d00] rounded-lg">
            <img src={filterAltIcon} alt="filter alt icon" className="w-full text-black w-1/2 h-6" />
            <p className="text-[#ed6d00] font-bold px-2 mr-2 text-sm">
              Filters
            </p>
          </button>
          <button className="items-center flex py-1.5 px-5 border-2 border-[#ed6d00] rounded-lg">
            <img src={filterListIcon} alt="filter list icon" className="w-full text-black w-1/2 h-6" />
            <p className="text-[#ed6d00] font-bold px-2 mr-2 text-sm">
              Sort
            </p>
          </button>
        </div>
        <button className="py-1.5 flex items-center border-2 border-gray-300 rounded">
          <img src={searchbarIcon} alt="gray search bar" className="flex justify-center ml-3 mr-2 text-black w-5 h-5" />
          <p className="text-gray-400">
            Search for a building...
          </p>
        </button>

      </div>
    </>
  )
}

export default App
