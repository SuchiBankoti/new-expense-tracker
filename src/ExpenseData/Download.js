import React from "react";
import { useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
function DownloadButton() {
    const{allExpenses}=useSelector(state=>state.expense)
  const downloadFile = () => {
    // Replace this with your stringified array or any other content.
    const fileContent = JSON.stringify(allExpenses);

    // Create a data URI for the file you want to download.
    const fileDataURI = "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent);

    // Create an anchor element and set its attributes for downloading the file.
    const anchor = document.createElement("a");
    anchor.href = fileDataURI;
    anchor.download = "example.json";

    // Trigger a click event on the anchor element to initiate the download.
    anchor.click();
  };

  return (
    <div style={{marginLeft:"20px"}}>
      <FaDownload onClick={downloadFile} className="icon"/>
    </div>
  );
}

export default DownloadButton;
