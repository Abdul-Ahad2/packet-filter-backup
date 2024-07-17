import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useState } from "react";
import CaptureLoader from "../components/CaptureLoader";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptureLoading, setIsCaptureLoading] = useState(false);

  const handleCaptureClick = async () => {
    setIsCaptureLoading(true);

    try {
      const response = await axios.get("http://localhost:3001/live-capture");
      console.log(response.data);
      localStorage.setItem("packet-data", JSON.stringify(response.data.data));
      setIsCaptureLoading(false);
      navigate("/results");
    } catch (error) {
      console.error("Error capturing live data:", error);
      setIsCaptureLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("pcapFile", file);

      try {
        const response = await axios.post(
          "https://substantial-cloud-animal.glitch.me/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("packet-data", JSON.stringify(response.data.data));
        setIsLoading(false);
        navigate("/results");
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isCaptureLoading && <CaptureLoader />}
      <div className="relative w-full h-[60vh] sm:h-[80vh] font-poppin">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black h-full w-full bg-opacity-50 p-4 sm:p-8 flex flex-col justify-center items-center text-center">
            <p className="text-white text-3xl sm:text-5xl md:text-7xl mb-4">
              Video Traffic Filtering Solutions.
            </p>
            <p className="text-white text-sm sm:text-base">
              Unleash the power of precision with our video traffic filtering
              solution – where every frame counts and unwanted content takes a
              backseat.
            </p>
            <div className="flex flex-col sm:flex-row mt-6 sm:mt-10">
              <label className="bg-white m-2 sm:m-3 relative w-80 text-center py-3 sm:py-5 cursor-pointer">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0"
                  accept=".pcap"
                  onChange={handleFileChange}
                />
                Upload PCAP file
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex items-center justify-center font-poppin bg-[#012948] text-white">
        <div className="py-10 sm:py-20 px-4 sm:px-20 md:px-44 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl">
            About VTFSols and Team
          </h1>
          <div className="text-base sm:text-lg md:text-xl">
            <p className="my-6 sm:my-10 md:my-14">
              At VTF Sols., we pride ourselves on pioneering solutions that
              redefine the landscape of video traffic management. With a
              commitment to excellence and a passion for innovation, our
              dedicated team brings together diverse expertise to address the
              challenges of the digital age. From seasoned developers and
              cybersecurity specialists to visionary leaders, each member of our
              team is driven by a shared goal: to empower businesses with
              cutting-edge video traffic filtering solutions.
            </p>
            <p className="my-6 sm:my-10 md:my-14">
              Our collaborative spirit extends beyond technology, fostering an
              environment where creativity thrives and ideas flourish. We
              believe in the power of teamwork to unlock new possibilities,
              ensuring that our clients receive not just a product, but a
              transformative experience. Together, we are shaping the future of
              video content delivery, one breakthrough at a time.
            </p>
            <p className="my-6 sm:my-10 md:my-14">
              At the core of our success is a team of individuals who embody our
              values of integrity, innovation, and customer satisfaction. Our
              leadership brings a wealth of experience, guiding the company with
              a vision that embraces both efficiency and ethical business
              practices. With VTF Sols., you're not just partnering with a
              technology provider; you're joining forces with a passionate team
              committed to revolutionizing the way the world engages with video
              content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
