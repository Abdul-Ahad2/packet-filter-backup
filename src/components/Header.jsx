import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-[#012948] text-white items-center font-poppin p-4">
      <div className="mb-4 sm:mb-0">
        <Link to={"/"} className="text-3xl sm:text-5xl">
          VTFSols.
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row text-lg sm:ml-auto">
        <Link className="my-2 sm:mx-5" to="/">
          Home
        </Link>
        <Link className="my-2 sm:mx-5" to="/results">
          Results
        </Link>
        <Link className="my-2 sm:mx-5" to="/history">
          History
        </Link>
      </div>
    </div>
  );
}

export default Header;
