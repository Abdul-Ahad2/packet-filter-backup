import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";

function HistoryCards({
  siteName,
  packetCount,
  packetLength,
  numberOfIpPackets,
  numberOfIpBytes,
  numberOfUdpPackets,
  startTime,
  endTime,
  throughput,
  numberOfNetflixPackets,
  numberOfYouTubePackets,
  onDelete,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleDelete = () => {
    onDelete(); // Using startTime as a unique identifier
    setDeleteConfirmOpen(false);
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const toggleDeleteConfirm = (e) => {
    e.stopPropagation();
    setDeleteConfirmOpen(!deleteConfirmOpen);
  };

  return (
    <div>
      <div
        className="w-full h-[20vh] border-2 border-black bg-[#012948] rounded-md flex justify-between text-white items-center p-14 cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={toggleModal}
      >
        <div className="text-lg">
          <h1>
            <b>Site Name:</b> {siteName}
          </h1>
          <h1>
            <b>Packet Count:</b> {packetCount}
          </h1>
          <h1>
            <b>Packet Length:</b> {packetLength}
          </h1>
        </div>
        <div className="text-3xl" onClick={toggleDeleteConfirm}>
          <MdDelete />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            padding: "24px",
          },
        }}
      >
        <div className="font-poppin">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Detailed Result
          </h2>
          <h3 className="text-xl sm:text-2xl font-medium mb-4">
            Analysis Report
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
            <p>
              <b>Number of IP Packets:</b> {numberOfIpPackets}
            </p>
            <p>
              <b>Number of IP Bytes:</b> {numberOfIpBytes}
            </p>
            <p>
              <b>Number of UDP Packets:</b> {numberOfUdpPackets}
            </p>
            <p>
              <b>Start Time:</b> {startTime}
            </p>
            <p>
              <b>End Time:</b> {endTime}
            </p>
            <p>
              <b>Traffic Throughput (bytes/s):</b> {throughput}
            </p>
          </div>

          <h3 className="text-xl sm:text-2xl font-medium mt-8 mb-4">
            Detected Protocols
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
            <div>
              <p>
                <b>Domain Name:</b> Youtube
              </p>
              <p>
                <b>Number of Packets:</b> {numberOfYouTubePackets}
              </p>
            </div>
            <div>
              <p>
                <b>Domain Name:</b> Netflix
              </p>
              <p>
                <b>Number of Packets:</b> {numberOfNetflixPackets}
              </p>
            </div>
          </div>

          <div className="mt-10 text-right">
            <button
              className="text-white bg-red-500 px-6 py-3 rounded-md text-base sm:text-lg hover:bg-red-600 transition-colors duration-200"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmOpen}
        onRequestClose={toggleDeleteConfirm}
        contentLabel="Delete Confirmation"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "300px",
            padding: "20px",
          },
        }}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          Confirm Deletion
        </h2>
        <p className="text-sm sm:text-base mb-4">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded text-sm sm:text-base hover:bg-gray-300 transition-colors duration-200"
            onClick={toggleDeleteConfirm}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded text-sm sm:text-base hover:bg-red-600 transition-colors duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default HistoryCards;
