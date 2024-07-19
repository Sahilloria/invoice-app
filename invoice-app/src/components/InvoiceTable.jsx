import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceTable = ({ invoices, isModal, handleModal, addInvoice, invoiceInfo, handleInvoiceInfoChange }) => {
  const footData = []

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);

    doc.text("GAGG FOODS", 5, 5);
    doc.text("Unit 6A Millennia Park", 65, 10);
    doc.text("Thornes Rd, Wakefield - WF2 8PW", 5, 10);
    doc.text("Mob: 07984 143344", 65, 15);
    doc.text("Email: mdgfoods@hotmail.com", 5, 15);

    doc.text(`Invoice To: ${invoiceInfo.invoiceTo}`, 120, 5);
    doc.text(`Invoice Number: ${invoiceInfo.invoiceNumber}`, 120, 10);
    doc.text(`Week Ending: ${invoiceInfo.weekEnding}`, 165, 15);
    doc.text(`Invoice Date: ${invoiceInfo.invoiceDate}`, 120, 15);
    
    const tableColumn = ["Description", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Total", "Price", "Amount"];
    const tableRows = invoices.map(invoice => [
      invoice.description,
      `${invoice.sun === 0 ? "" : invoice.sun}       ${invoice.sunReturn ??""}`,
      `${invoice.mon === 0 ? "" : invoice.mon}        ${invoice.sunReturn ??""}  `,
      `${invoice.tue === 0 ? "" : invoice.tue}         ${invoice.sunReturn ??""}`,
      `${invoice.wed === 0 ? "" : invoice.wed}         ${invoice.sunReturn ??""}`,
      `${invoice.thu === 0 ? "" : invoice.thu}          ${invoice.sunReturn ??""}`,
      `${invoice.fri === 0 ? "" : invoice.fri}     ${invoice.sunReturn ??""}`,
      `${invoice.sat === 0 ? "" : invoice.sat}    ${invoice.sunReturn ??""}`,
      calculateTotal(invoice),
      invoice.price,
      (calculateTotal(invoice) * invoice.price).toFixed(2),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      startY: 20,
      startX: 5,
      styles: { fontSize: 7 }, // Reduce font size
      margin: { top: 20, left: 5, right: 5 }, // Adjust top margin
      tableWidth: 'auto',
      bodyStyles: {
        fontSize: 7, // Adjust the font size for the body
        // font: 'Newsreader', // Set the font family for the body
        cellPadding: { top: 1, right: 5, bottom: 1, left: 2 }, // Adjust cell padding
        textColor: [0, 0, 0], // Set text color for the body
        rowPageBreak: 'avoid', // Avoid row page breaks
      },
    });

    const pageHeight = doc.internal.pageSize.height;
    const footerStartY = pageHeight - 10; // Adjust this value as needed
    doc.setFontSize(5);
    doc.text(`Balance On Last Invoice: £150.25`, 14, footerStartY);
    doc.text(`Payments Received This Week: £150.25`, 14, footerStartY + 3);
    doc.text(`Net Amount: £126.44`, 14, footerStartY + 6);
    doc.text(`VAT Amount: £0.00`, 24, footerStartY + 9);
    doc.text(`Invoice Total: £126.44`, 24, footerStartY + 12);
    doc.text(`Balance B/F: £0.00`, 24, footerStartY + 15);
    doc.text(`Amount Due: £126.44`, 24, footerStartY + 18);

    doc.save(`${invoiceInfo.invoiceTo}${invoiceInfo.invoiceDate}.pdf`);
  };

  const calculateTotal = (invoice) => {
    return (
      parseInt(invoice.sun) +
      parseInt(invoice.mon) +
      parseInt(invoice.tue) +
      parseInt(invoice.wed) +
      parseInt(invoice.thu) +
      parseInt(invoice.fri) +
      parseInt(invoice.sat)
    );
  };

  const calculateTotalPerDayInWeek = (day) => {
    let result = 0
    for (let i = 0; i < invoices.length; i++) {
      result += parseInt(invoices[i][day])
    };
    footData.push(result)
    return result

  };

  return (
    <div>
      <button onClick={generatePDF} className="generate-pdf-button">Generate PDF</button>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Total</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} onClick={() => handleModal(invoice.id)}>
              <td>{invoice.description}</td>
              <td><span>{invoice.sun === 0 ? "" : invoice.sun} </span> <span style={{ float: "right" }}>{invoice.sunReturn ?? ""}</span></td>
              <td><span>{invoice.mon === 0 ? "" : invoice.mon}</span><span style={{ float: "right" }}>{invoice.monReturn ?? ""}</span></td>
              <td><span>{invoice.tue === 0 ? "" : invoice.tue}</span> <span style={{ float: "right" }}>{invoice.tueReturn ?? ""}</span></td>
              <td><span>{invoice.wed === 0 ? "" : invoice.wed}</span> <span style={{ float: "right" }}>{invoice.wedReturn ?? ""}</span></td>
              <td><span>{invoice.thu === 0 ? "" : invoice.thu}</span>  <span style={{ float: "right" }}>{invoice.thuReturn ?? ""}</span></td>
              <td><span>{invoice.fri === 0 ? "" : invoice.fri}</span> <span style={{ float: "right" }}>{invoice.friReturn ?? ""}</span></td>
              <td><span>{invoice.sat === 0 ? "" : invoice.sat}</span> <span style={{ float: "right" }}>{invoice.satReturn ?? ""}</span></td>
              <td>{calculateTotal(invoice)}</td>
              <td>£ {invoice.price}</td>
              <td>{(calculateTotal(invoice) * invoice.price).toFixed(2)}</td>
              {/* <td>{invoice.vat}</td> */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{calculateTotalPerDayInWeek("sun")}</td>
            <td>{calculateTotalPerDayInWeek("mon")}</td>
            <td>{calculateTotalPerDayInWeek("tue")}</td>
            <td>{calculateTotalPerDayInWeek("wed")}</td>
            <td>{calculateTotalPerDayInWeek("thu")}</td>
            <td>{calculateTotalPerDayInWeek("fri")}</td>
            <td>{calculateTotalPerDayInWeek("sat")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceTable;
