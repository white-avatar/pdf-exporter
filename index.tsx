/*
  This file is for show-case, not running.

  Set your project's data to here, not modify "id" or "className" because i'm remove not necessary parameters.
*/

import React, { useState } from 'react';

import { PDFExporterProps } from './index.d'

import { domToImages } from './utils/dom-to-image/domToImage';
import { exportPDF, PDF_PAPER_TYPE } from './utils/image-to-pdf/imageToPDF';

function Exporter<T>(props: PDFExporterProps): JSX.Element {
  const [tableDatas, setTableDatas] = useState<Array<any>>();

  const onClickExport = async (e: any): Promise<void> => {
    e.preventDefault();

    // Set document type for something like radio-btn or select-box, and so on
    const documentType = PDF_PAPER_TYPE.PDF_A4;

    try {
      const imageURLs = await domToImages(documentType);
      await exportPDF(imageURLs, documentType);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <button onClick={onClickExport}>Export</button>

      {/* PDF Table DOM part, not show on screen */}
      <div className="pdf-containment">
        <div className="pdf-container">
          <table id="pdf-target">
            <colgroup>
              {props.tableHeaders?.map((value, index) => (
                <col key={index} style={{ width: `${value.colWidths}px` }} />
              ))}
            </colgroup>
            <thead>
              {props.mergedTableHeaders &&
                props.mergedTableHeaders.map((data, outerIndex) => {
                  return (
                    <tr key={outerIndex} className="merged-virtual-table-header">
                      {data.map((innerData, index) => (
                        <th key={`mergedTable${index}`} colSpan={innerData.colSpan} className={innerData.className}>
                          {innerData.headerText}
                        </th>
                      ))}
                    </tr>
                  );
                })}
              <tr id="virtual-table-header">
                {props.tableHeaders?.map((value, index) => (
                  <th scope="col" key={index} className={value.className}>
                    {value.headerText}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableDatas.map((data, index) => {
                <tr  key={index} className="virtual-table-row">
                  <td>{data}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* PDF Table DOM part, not show on screen */}
    </>
  );
}

export default Exporter;
