import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GeneratePDF = ({ data, total, vat, invoiceInfo }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Sanjeev Foods Ltd', 20, 10);
    doc.text('Unit 6A Millennia Park', 20, 20);
    doc.text('Thornes Rd, Wakefield - WF2 8PW', 20, 30);
    doc.text('Mob: 07984 143344', 20, 40);
    doc.text('Email: mdgfoods@hotmail.com', 20, 50);

    doc.text(`Invoice To: ${invoiceInfo.invoiceTo}`, 20, 70);
    doc.text(`Delivery To: ${invoiceInfo.deliveryTo}`, 20, 80);
    doc.text(`Invoice Number: ${invoiceInfo.invoiceNumber}`, 20, 90);
    doc.text(`Customer Number: ${invoiceInfo.customerNumber}`, 20, 100);
    doc.text(`Week Ending: ${invoiceInfo.weekEnding}`, 20, 110);
    doc.text(`Invoice Date: ${invoiceInfo.invoiceDate}`, 20, 120);

    const tableColumn = ["Code", "Description", "Qty", "Price", "Amount", "VAT"];
    const tableRows = [];

    data.forEach(item => {
      const itemData = [
        item.id,
        item.name,
        item.description,
        item.quantity,
        item.price,
        item.amount,
        item.vat,
      ];
      tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 130 });
    doc.text(`Total: £${total.toFixed(2)}`, 20, doc.previousAutoTable.finalY + 10);
    doc.text(`VAT: £${vat.toFixed(2)}`, 20, doc.previousAutoTable.finalY + 20);

    doc.save("invoice.pdf");
  };

  return (
    <button onClick={generatePDF} className="generate-pdf-button">
      Generate PDF
    </button>
  );
};

export default GeneratePDF;
