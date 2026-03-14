import * as XLSX from "xlsx";
import { SheetHeaders } from "../constants/mapConstants";

const sampleRows = [
  [
    "Green Valley Landcare",
    "Community landcare group focused on native revegetation",
    "Landcare Group",
    "PO Box 123",
    "https://example.com/image1.jpg",
    "45 Valley Road",
    "Bendigo",
    "3550",
    "0354441234",
    "0354441235",
    "info@greenvalley.org.au",
    "https://greenvalley.org.au",
    "Jane Smith",
    "revegetation,restoration",
    "-36.7570,144.2794",
  ],
  [
    "River Watch Inc",
    "Monitoring water quality along the Murray River",
    "Friends Group",
    "PO Box 456",
    "",
    "12 River Street",
    "Echuca",
    "3564",
    "0354442345",
    "",
    "contact@riverwatch.org",
    "https://riverwatch.org",
    "Bob Jones",
    "water quality,monitoring",
    "-36.1432,144.7521",
  ],
];

export const exampleImportMarkersFile = (format: "csv" | "xlsx" = "csv") => {
  const worksheet = XLSX.utils.aoa_to_sheet([SheetHeaders, ...sampleRows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  if (format === "xlsx") {
    XLSX.writeFile(workbook, "example-map-markers-import-template.xlsx");
  } else {
    XLSX.writeFile(workbook, "example-map-markers-import-template.csv");
  }
};
