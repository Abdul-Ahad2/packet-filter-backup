import { ImFacebook2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaCopyright } from "react-icons/fa6";

function Footer() {
  return (
    <div className="w-full bg-[#091e2e] flex flex-col sm:flex-row justify-between font-poppin items-center text-white p-4 sm:p-10">
      <h1 className="flex text-sm sm:text-xl mb-4 sm:mb-0">
        <span className="mr-1">
          <FaCopyright />
        </span>
        All Rights Reserved | {new Date().getFullYear()}
      </h1>
      <h1 className="text-3xl sm:text-5xl font-extrathin mb-4 sm:mb-0">
        VTFSols.
      </h1>
      <div className="flex text-xl sm:text-2xl">
        <span className="mx-2 sm:mx-3">
          <ImFacebook2 />
        </span>
        <span className="mx-2 sm:mx-3">
          <BsTwitterX />
        </span>
        <span className="mx-2 sm:mx-3">
          <RiInstagramFill />
        </span>
      </div>
    </div>
  );
}

export default Footer;
