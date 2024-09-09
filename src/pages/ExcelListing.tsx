import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import excelImage from '../assets/excelImage.png'
const acceptedExtensions = ["xlsx", "xls", "csv"];

interface ExcelFile {
  name: string;
  data: unknown[][];
}

const ExcelListing = () => {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [savedFiles, setSavedFiles] = useState<ExcelFile[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedFiles = localStorage.getItem('excelFiles');
    if (storedFiles) {
      setSavedFiles(JSON.parse(storedFiles));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (acceptedExtensions.includes(fileExtension)) {
        setErrorMessage("");
        setFile(selectedFile);
      } else {
        setErrorMessage("Please upload a valid Excel file.");
        setFile(null);
      }
    }
  };

  const handleSubmit = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        const newFile = {
          name: file.name,
          data: jsonData as unknown[][],
        };

        // Save the file data to localStorage
        const existingFiles = [...savedFiles, newFile];
        localStorage.setItem('excelFiles', JSON.stringify(existingFiles));
        setSavedFiles(existingFiles);

        alert('File uploaded and saved!');
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select a file first.');
    }
  };


  const handleFileClick = (fileIndex: number) => {
    navigate(`/displayExcelData/${fileIndex}`);
  };

  return (
    <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Upload Excel File</h1>
    <input type="file" accept={acceptedExtensions.map(ext => `.${ext}`).join(',')} onChange={handleFileChange} />
    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={handleSubmit}
      disabled={!file}
    >
      Upload
    </button>

    <div className="mt-6">
      <h2 className="text-lg font-bold">Uploaded Files:</h2>
      {savedFiles.length > 0 ? (
        <ul>
          {savedFiles.map((savedFile, index) => (
            <li
              key={index}
              className="cursor-pointer text-blue-500 underline mt-2"
              onClick={() => handleFileClick(index)}
            >
              <img src={excelImage} alt="excel"  className="h-20"/>
              {savedFile.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  </div>
  );
};

export default ExcelListing;
