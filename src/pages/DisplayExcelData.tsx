import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DisplayExcelData = () => {
  const { id } = useParams<{ id: string }>();
  const [fileData, setFileData] = useState<any[][] | null>(null);

  useEffect(() => {
    const storedFiles = localStorage.getItem("excelFiles");
    if (storedFiles && id !== undefined) {
      const files = JSON.parse(storedFiles);
      setFileData(files[parseInt(id)].data);
    }
  }, [id]);

  return (
    <div className="container mx-auto py-10 px-10 bg-slate-200 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>File Data</CardTitle>
          <Link to="/excelListing" className="text-blue-500 underline">
            Go Back
          </Link>
        </CardHeader>
        <CardContent>
          {fileData ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {fileData[0].map((header, index) => (
                    <TableHead key={index} className="border px-4 py-2">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {fileData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="border px-4 py-2">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No data available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayExcelData;
