import React from "react";
import { useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
function DownloadButton() {
    const{allExpenses}=useSelector(state=>state.expense)
  const downloadFile = () => {
    const fileContent = JSON.stringify(allExpenses);

    const fileDataURI = "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent);

    const anchor = document.createElement("a");
    anchor.href = fileDataURI;
    anchor.download = "expenses.json";

    anchor.click();
  };

  return (
    <div style={{marginLeft:"20px"}}>
      <FaDownload onClick={downloadFile} className="icon"/>
    </div>
  );
}

export default DownloadButton;
