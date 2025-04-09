import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatNumber } from '../../utility/FormatModifier';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons';


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
}


const AssetReport: React.FC<AssetReportProps> = ({ title, date, assets, overallTotal }) => {
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Title
        doc.setFontSize(18);
        doc.text(title, 14, 20);
    
        // Date
        doc.setFontSize(12);
        doc.text(`Date: ${date}`, 14, 30);
    
        // Table
        autoTable(doc, {
            startY: 40,
            head: [['Index', 'Code', 'Value', 'Quantity', 'Total']],
            body: assets.map(asset => [
                asset.index,
                asset.code,
                formatNumber(Number(asset.value), 3),
                asset.quantity,
                formatNumber(Number(asset.total), 3),
            ]),
            foot: [['', '', '', 'Overall Total', formatNumber(Number(overallTotal), 3)]],
            styles: { halign: 'right' },
            columnStyles: {
                1: { halign: 'left' }, 
                2: { halign: 'right' }, 
                3: { halign: 'right' },
                4: { halign: 'right' },
            },
        });
    
        doc.save('Individual_Asset_Report.pdf');
    };
  
    return (
      <div>
        <button onClick={handleDownloadPDF}><FontAwesomeIcon icon={ faFileExport }/></button>
      </div>
    );
  };
  
  export default AssetReport;


export const ReportDisplay = ({ title, date, assets, overallTotal }: AssetReportProps) => {
  return (
    <div className="report-container">                                                                                                                                          
      <h2>{title}</h2>
      <p>Date: {date}</p>
      <table className="report-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Value</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.index}>
              <td>{asset.index}</td>
              <td>{asset.code}</td>
              <td>{asset.value.toFixed(2)}</td>
              <td>{asset.quantity}</td>
              <td>{asset.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="total-row">
            <td colSpan={4}>Overall Total</td>
            <td>{overallTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};