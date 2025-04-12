import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatNumber } from '../../utility/FormatModifier';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import './AssetReport.css';



interface AssetInfo {
  index: number;
  code: string;
  value: number;
  quantity: number;
  total: number;
}

interface AssetReportProps {
  title: string;
  date: string;
  assets: AssetInfo[];
  overallTotal: number;
  currencyType: string;
}


const AssetReport: React.FC<AssetReportProps> = ({ title, date, assets, overallTotal, currencyType }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title - center
    doc.setFontSize(18);
    doc.text(title, pageWidth / 2, 20, { align: 'center' });

    // Date - top-right
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, pageWidth - 14, 30, { align: 'right' });

    // Header separator line
    doc.setLineWidth(0.2);
    doc.line(14, 36, pageWidth - 14, 36); // visual break after header

    // Table
    autoTable(doc, {
      startY: 42,
      head: [['Index', 'Code', 'Value', 'Quantity', 'Total', 'Unit']],
      body: assets.map(asset => [
        asset.index,
        asset.code,
        formatNumber(Number(asset.value), 3),
        asset.quantity,
        formatNumber(Number(asset.total), 3),
        currencyType,  // Ensure currencyType is correctly passed
      ]),
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        lineColor: 50,
      },
      headStyles: {
        fillColor: [198, 235, 183],
        textColor: 0,
        halign: 'center',
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { halign: 'right', cellWidth: 15 },  // Index
        1: { halign: 'left', cellWidth: 30 },   // Code
        2: { halign: 'right', cellWidth: 40 },  // Value
        3: { halign: 'right', cellWidth: 30 },  // Quantity
        4: { halign: 'right', cellWidth: 50 },  // Total
        5: { halign: 'left', cellWidth: 17 },   // Currency
      }
    });

    const tableStartY = 36;
    const rowHeight = 8; // Estimate row height (adjust as necessary based on font size)
    const tableHeight = assets.length * rowHeight + 20; // Adjust for header and some padding
    const tableEndY = tableStartY + tableHeight;

    // Add a horizontal line below the table
    doc.setLineWidth(0.3);
    doc.line(14, tableEndY + 5, pageWidth - 14, tableEndY + 5);

    const labelText = "Overall Total:";
    const valueText = `${formatNumber(Number(overallTotal), 3)} ${currencyType}`;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    const quantityX = 102; // index + code + value + quantity widths
    const totalX = quantityX + 86;  // add quantity width + total width
    const totalY = tableEndY + 10;

    doc.text(labelText, quantityX, totalY, { align: 'left' });
    doc.text(valueText, totalX, totalY, { align: 'right' });

    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank');
  };

  

  return (
    <div>
      <button id='export-icon' onClick={handleDownloadPDF}>
        <FontAwesomeIcon icon={faFileExport} />
      </button>
    </div>
  );
};
  
export default AssetReport;