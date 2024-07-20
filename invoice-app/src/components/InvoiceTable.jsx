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
    const tableFoot= ["Total",`${footData[0]}   ${footData[1]}`, `${footData[2]}   ${footData[3]}`,`${footData[4]}   ${footData[5]}`,`${footData[6]}   ${footData[7]}`,`${footData[8]}   ${footData[9]}`,`${footData[10]}   ${footData[11]}`,`${footData[12]}   ${footData[13]}`,`${totalDeliver}  ${totalReturn}`,"",`${totalAmount}`]
    const tableRows = invoices.map(invoice => [
      invoice.description,
      `${invoice.sun === 0 ? "" : invoice.sun}       ${invoice.sunReturn ?? ""}`,
      `${invoice.mon === 0 ? "" : invoice.mon}        ${invoice.monReturn ?? ""}  `,
      `${invoice.tue === 0 ? "" : invoice.tue}         ${invoice.tueReturn ?? ""}`,
      `${invoice.wed === 0 ? "" : invoice.wed}         ${invoice.wedReturn ?? ""}`,
      `${invoice.thu === 0 ? "" : invoice.thu}          ${invoice.thuReturn ?? ""}`,
      `${invoice.fri === 0 ? "" : invoice.fri}     ${invoice.friReturn ?? ""}`,
      `${invoice.sat === 0 ? "" : invoice.sat}    ${invoice.satReturn ?? ""}`,
      calculateTotal(invoice),
      invoice.price,
      (calculateAmount(invoice)),
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      foot:[tableFoot],
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
    doc.setFontSize(8);
    doc.text(`Net Amount: ${totalAmount.toFixed(2)}`, 5, footerStartY +1);
    doc.text(`VAT Amount: £0.00`, 40, footerStartY + 1);
    doc.text(`Invoice Total: ${totalAmount.toFixed(2)}`, 80, footerStartY + 1);
    doc.text(`Balance B/F: £0.00`, 125, footerStartY + 1);
    doc.text(`Amount Due: ${totalAmount.toFixed(2)}`, 160, footerStartY + 1);

    doc.save(`${invoiceInfo.invoiceTo}${invoiceInfo.invoiceDate}.pdf`);
  };

  let totalDeliver =0;
  let totalReturn=0;
  let totalAmount=0;
  const calculateTotal = (invoice) => {
    totalReturn+=( parseInt(invoice?.sunReturn ?? 0)+
    parseInt(invoice?.monReturn ?? 0)+
    parseInt(invoice?.tueReturn ?? 0) +
    parseInt(invoice?.wedReturn ?? 0)+
    parseInt(invoice?.thuReturn ?? 0)+
    parseInt(invoice?.friReturn ?? 0)+
    parseInt(invoice?.satReturn ?? 0) )
   totalDeliver+=(parseInt(invoice.sun) + parseInt(invoice?.sunReturn ?? 0) +
    parseInt(invoice.mon) + parseInt(invoice?.monReturn ?? 0) +
    parseInt(invoice.tue) + parseInt(invoice?.tueReturn ?? 0) +
    parseInt(invoice.wed) + parseInt(invoice?.wedReturn ?? 0) +
    parseInt(invoice.thu) + parseInt(invoice?.thuReturn ?? 0) +
    parseInt(invoice.fri) + parseInt(invoice?.friReturn ?? 0) +
    parseInt(invoice.sat) + parseInt(invoice?.satReturn ?? 0))
    return (
      parseInt(invoice.sun) + parseInt(invoice?.sunReturn ?? 0) +
      parseInt(invoice.mon) + parseInt(invoice?.monReturn ?? 0) +
      parseInt(invoice.tue) + parseInt(invoice?.tueReturn ?? 0) +
      parseInt(invoice.wed) + parseInt(invoice?.wedReturn ?? 0) +
      parseInt(invoice.thu) + parseInt(invoice?.thuReturn ?? 0) +
      parseInt(invoice.fri) + parseInt(invoice?.friReturn ?? 0) +
      parseInt(invoice.sat) + parseInt(invoice?.satReturn ?? 0)
    );
  };

  const calculateTotalPerDayInWeek = (day, ret) => {
    let result = 0;

    for (let i = 0; i < invoices.length; i++) {
      result += isNaN(parseInt(invoices[i][day])) ? 0 : parseInt(invoices[i][day])
     
    };
    footData.push(result)
    return result

  };
  
  const calculateAmount= (invoice) =>{
  const total= ( parseInt(invoice.sun) + parseInt(invoice?.sunReturn ?? 0) +
    parseInt(invoice.mon) + parseInt(invoice?.monReturn ?? 0) +
    parseInt(invoice.tue) + parseInt(invoice?.tueReturn ?? 0) +
    parseInt(invoice.wed) + parseInt(invoice?.wedReturn ?? 0) +
    parseInt(invoice.thu) + parseInt(invoice?.thuReturn ?? 0) +
    parseInt(invoice.fri) + parseInt(invoice?.friReturn ?? 0) +
    parseInt(invoice.sat) + parseInt(invoice?.satReturn ?? 0));
    totalAmount+= parseInt(total)* invoice.price
    return total*invoice.price
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
              <td>£ {(calculateAmount(invoice))}</td>
              {/* <td>{invoice.vat}</td> */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              <span>{calculateTotalPerDayInWeek("sun")}</span>
              <span style={{ float: "right" }}>{calculateTotalPerDayInWeek("sunReturn")}</span>
            </td>
            <td>
              <span> {calculateTotalPerDayInWeek("mon")}</span>
              <span style={{ float: "right" }}> {calculateTotalPerDayInWeek( "monReturn")}</span>
            </td>
            <td>
              <span>{calculateTotalPerDayInWeek("tue")}</span>
              <span style={{ float: "right" }}>{calculateTotalPerDayInWeek("tueReturn")}</span>
              </td>
            <td>
              <span>{calculateTotalPerDayInWeek("wed")}</span>
              <span style={{ float: "right" }}>{calculateTotalPerDayInWeek("wedReturn")}</span>
            </td>
            <td>
              <span>{calculateTotalPerDayInWeek("thu")}</span>
              <span style={{ float: "right" }}>{calculateTotalPerDayInWeek("thuReturn")}</span>
            </td>
            <td>
              <span>{calculateTotalPerDayInWeek("fri")}</span>
              <span style={{ float: "right" }}>{calculateTotalPerDayInWeek( "friReturn")}</span>
              </td>
            <td>
              <span>{calculateTotalPerDayInWeek("sat")}</span>
              <span style={{ float: "right" }}>{calculateTotalPerDayInWeek("satReturn")}</span>
            </td>
            <td>
              <span>{totalDeliver}</span>
              <span style={{ float: "right" }}>{totalReturn}</span>
            </td>
            <td>
            </td>
            <td>
              <span>£ {totalAmount}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceTable;
