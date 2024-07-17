import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoiceTable = ({ invoices, isModal, handleModal, addInvoice, invoiceInfo, handleInvoiceInfoChange }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("GAGG FOODS", 14, 20);
    doc.text("Unit 6A Millennia Park", 14, 25);
    doc.text("Thornes Rd, Wakefield - WF2 8PW", 14, 30);
    doc.text("Mob: 07984 143344", 14, 35);
    doc.text("Email: mdgfoods@hotmail.com", 14, 40);

    // Add invoice details next to company details
    doc.text(`Invoice To: ${invoiceInfo.invoiceTo}`, 105, 20);
    doc.text(`Delivery To: ${invoiceInfo.deliveryTo}`, 105, 25);
    doc.text(`Invoice Number: ${invoiceInfo.invoiceNumber}`, 105, 30);
    doc.text(`Customer Number: ${invoiceInfo.customerNumber}`, 105, 35);
    doc.text(`Week Ending: ${invoiceInfo.weekEnding}`, 105, 40);
    doc.text(`Invoice Date: ${invoiceInfo.invoiceDate}`, 105, 45);

    // Prepare table data
    const tableColumn = ["Code", "Description", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Total", "Price", "Amount", "VAT"];
    console.log("invoices",invoices)
    const tableRows = invoices.map(invoice => [
      invoice.id,
      `${invoice.name} £ ${invoice.price}`,
      invoice.sun,
      invoice.mon,
      invoice.tue,
      invoice.wed,
      invoice.thu,
      invoice.fri,
      invoice.sat,
      calculateTotal(invoice),
      invoice.price,
      calculateTotal(invoice) * invoice.price,
      invoice.vat,
    ]);

    // Add table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,

      startY: 60,
    });

    // Add footer details
    const pageHeight = doc.internal.pageSize.height;
    const footerStartY = pageHeight - 40; // Adjust this value as needed
    doc.setFontSize(10);
    doc.text(`Balance On Last Invoice: £150.25`, 14, footerStartY);
    doc.text(`Payments Received This Week: £150.25`, 14, footerStartY + 5);
    doc.text(`Net Amount: £126.44`, 14, footerStartY + 10);
    doc.text(`VAT Amount: £0.00`, 14, footerStartY + 15);
    doc.text(`Invoice Total: £126.44`, 14, footerStartY + 20);
    doc.text(`Balance B/F: £0.00`, 14, footerStartY + 25);
    doc.text(`Amount Due: £126.44`, 14, footerStartY + 30);

    // Save PDF
    doc.save("invoice.pdf");
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
    let result=0
    for (let i = 0; i < invoices.length; i++) {
      result +=parseInt(invoices[i][day])
    };
    return result

  }

  return (
    <div>
      <button onClick={generatePDF} className="generate-pdf-button">Generate PDF</button>
      <table>
        <thead>
          <tr>
            <th>Code</th>
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
            {/* <th>VAT</th> */}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} onClick={() => handleModal(invoice.id)}>
              <td>{invoice.id}</td>
              <td>{invoice.name} £ {invoice.price}</td>
              <td>{invoice.sun}</td>
              <td>{invoice.mon}</td>
              <td>{invoice.tue}</td>
              <td>{invoice.wed}</td>
              <td>{invoice.thu}</td>
              <td>{invoice.fri}</td>
              <td>{invoice.sat}</td>
              <td>{calculateTotal(invoice)}</td>
              <td>£ {invoice.price}</td>
              <td>{calculateTotal(invoice) * invoice.price}</td>
              {/* <td>{invoice.vat}</td> */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
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
