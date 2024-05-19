import React, { useState } from "react";

function UploadFile({ setIsDocumentUploaded }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setIsLoading(true);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("files", selectedFile);

      try {
        const response = await fetch("http://localhost:8000/upload/", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // if (data) {
        //   setIsDocumentUploaded(true);
        // }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="file-upload flex items-center">
      {isLoading ? (
        <div className="loader mr-4"></div>
      ) : (
        file && (
          <span className="mr-4 text-sm text-green-400">
            {file.name}
          </span>
        )
      )}
      <input
        type="file"
        onChange={handleFileChange}
        hidden
        id="actual-button"
        className="mr-2"
      />
      <label
        htmlFor="actual-button"
        className="text-black sm:px-4 py-2 px-1 rounded-lg border-black border-2 cursor-pointer"
      >
        <i className="fa fa-circle-plus sm:px-4 px-1"></i>
        <strong className="hidden sm:inline">Upload PDF</strong>
      </label>
    </div>
  );
}

export default UploadFile;
