import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

function Results() {
  const [reportData, setReportData] = useState(null);
  const [packetsData, setPacketsData] = useState(null);

  // Function to fetch data from server
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/results");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPacketsData(data.packetDetails);
      setReportData(data.parsedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error fetching data (show message, retry, etc.)
    }
  };

  // Function to convert data to XLSX format
  const convertToXLSX = (data) => {
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    return excelBuffer;
  };

  // Function to handle saving XLSX file
  const handleSave = () => {
    if (!reportData || !packetsData) {
      console.error("No data to export");
      return;
    }

    // Convert reportData to Excel
    const reportDataSheet = XLSX.utils.json_to_sheet([reportData]);
    const reportWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      reportWorkbook,
      reportDataSheet,
      "Report Data"
    );
    const reportExcelBuffer = XLSX.write(reportWorkbook, {
      bookType: "xlsx",
      type: "array",
    });
    const reportBlob = new Blob([reportExcelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Convert packetsData to Excel
    const packetsDataSheet = XLSX.utils.json_to_sheet(packetsData);
    const packetsWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      packetsWorkbook,
      packetsDataSheet,
      "Packet Details"
    );
    const packetsExcelBuffer = XLSX.write(packetsWorkbook, {
      bookType: "xlsx",
      type: "array",
    });
    const packetsBlob = new Blob([packetsExcelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the Excel files
    saveAs(reportBlob, "analysis_report.xlsx");
    saveAs(packetsBlob, "packet-details.xlsx");
  };

  // Fetch data on component mount (optional)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full h-auto bg-[#113b62] p-4 sm:p-10 md:p-20">
        <div className="overflow-x-auto font-poppin">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-5">
            Analysis Report
          </h1>
          {reportData ? (
            <div className="overflow-x-auto">
              <table className="table-auto text-sm sm:text-base md:text-lg border-gray-900 text-white bg-[#012948] w-full">
                <tbody>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Number of IP Packets
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.numberOfIpPackets}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Number of IP Bytes
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.numberOfIpBytes}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Number of UDP Packets
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.numberOfUdpPackets}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Start Time
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.startTime}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      End Time
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.endTime}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Traffic Throughput (bytes/s)
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.trafficThroughput}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white">Loading report data...</p>
          )}
        </div>

        <div className="overflow-x-auto font-poppin mt-10 sm:mt-16 md:mt-20 px-2 sm:px-16 md:px-32">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-5 text-center">
            Detected Domains
          </h1>
          {reportData ? (
            <div className="overflow-x-auto">
              <table className="table-auto text-sm sm:text-base md:text-lg border-gray-900 text-white bg-[#012948] w-full">
                <tbody>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Domain Name
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Number of Packets
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Netflix
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.numberOfNetflixPackets}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      Youtube
                    </td>
                    <td className="px-2 sm:px-4 py-1 sm:py-2 border-gray-900 border-2">
                      {reportData.numberOfYouTubePackets}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white">Loading protocol data...</p>
          )}
          {reportData && (
            <div className="text-right mt-6 sm:mt-8 md:mt-12">
              <button
                onClick={handleSave}
                className="bg-[#012948] mx-2 sm:mx-4 px-3 sm:px-5 py-1 sm:py-2 text-white text-lg sm:text-xl md:text-2xl hover:scale-110 transition-transform duration-300"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Results;
