import { useEffect, useState } from "react";
import HistoryCards from "../components/HistoryCards";
import axios from "axios";

function History() {
  const [packetData, setPacketData] = useState([]);

  useEffect(() => {
    // Load existing history from localStorage
    const loadHistory = () => {
      const storedHistory = localStorage.getItem("packetHistory");
      return storedHistory ? JSON.parse(storedHistory) : [];
    };

    // Fetch new data and update history
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/results");
        const newData = response.data.parsedData;

        setPacketData((prevData) => {
          const updatedData = [...prevData];
          if (
            !updatedData.some((item) => item.startTime === newData.startTime)
          ) {
            updatedData.push(newData);
          }
          // Save the updated history to localStorage
          localStorage.setItem("packetHistory", JSON.stringify(updatedData));
          return updatedData;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initialize with existing history and fetch new data
    setPacketData(loadHistory());
    fetchData();
  }, []);

  const handleDelete = (index) => {
    setPacketData((prevData) => {
      const updatedData = prevData.filter((_, i) => i !== index);
      localStorage.setItem("packetHistory", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const getSiteName = (res) => {
    const services = [];
    if (res.numberOfNetflixPackets > 0) services.push("Netflix");
    if (res.numberOfYouTubePackets > 0) services.push("YouTube");
    return services.length > 0 ? services.join(" & ") : "Unknown";
  };

  return (
    <div className="w-full font-poppin">
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-72 py-5 sm:py-10">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl pb-3 sm:pb-5">
          History
        </h1>
        {packetData.length > 0 ? (
          packetData.map((res, index) => (
            <div key={index} className="p-2">
              <HistoryCards
                siteName={getSiteName(res)}
                packetCount={res.numberOfIpPackets}
                packetLength={res.numberOfIpBytes}
                numberOfIpPackets={res.numberOfIpPackets}
                numberOfIpBytes={res.numberOfIpBytes}
                numberOfUdpPackets={res.numberOfUdpPackets}
                startTime={res.startTime}
                endTime={res.endTime}
                throughput={res.trafficThroughput}
                numberOfNetflixPackets={res.numberOfNetflixPackets}
                numberOfYouTubePackets={res.numberOfYouTubePackets}
                onDelete={() => handleDelete(index)}
                index={index}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-xl sm:text-2xl md:text-3xl text-white">
            No data available
          </p>
        )}
      </div>
    </div>
  );
}

export default History;
