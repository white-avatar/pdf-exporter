import domtoimage from 'domtoimage';

import { DomToImages } from "./domToImage.d";
import { PDFPaperType } from "../image-to-pdf/imageToPDF.d";
import { PDF_PAPER_TYPE } from '../image-to-pdf/imageToPDF';

const ADDITIONAL_HEIGHT = 2;

const domToImages: DomToImages = async (targetPaperType: PDFPaperType) => {
	const targetDOM = document.getElementById('pdf-target');
  const mergedTableHeaderDOM = document.getElementsByClassName('merged-virtual-table-header');
  const tableHeaderDOM = document.getElementById('virtual-table-header');
  const tableRowDOM = document.getElementsByClassName('virtual-table-row')[0] as HTMLElement;

  if (targetDOM && mergedTableHeaderDOM && tableHeaderDOM && tableRowDOM) {
    const tableWidth = targetDOM.offsetWidth;
    const tableHeight = targetDOM.offsetHeight;
    const tableHeaderHeight =
      Array.from(mergedTableHeaderDOM).reduce((acc, cur) => acc + (cur as HTMLElement).offsetHeight, 0) +
      tableHeaderDOM.offsetHeight;
    const tableRowHeight = tableRowDOM.offsetHeight;

    const imageMaxHeight = (PDF_PAPER_TYPE[targetPaperType]['height'] * tableWidth) / PDF_PAPER_TYPE[targetPaperType]['width'];

    const firstImageAvailableRowCount = Math.floor((imageMaxHeight - tableHeaderHeight) / tableRowHeight);
    const firstImageMaxHeight = tableHeaderHeight + tableRowHeight * firstImageAvailableRowCount;
    const otherImageAvailableRowCount = Math.floor(imageMaxHeight / tableRowHeight);
    const otherImageMaxHeight = tableRowHeight * otherImageAvailableRowCount;

    const imageURLs: string[] = [];

    if (tableHeight < imageMaxHeight) {
      const firstImageURL = await domtoimage.toPng(targetDOM, {
        width: tableWidth,
        height: tableHeight + ADDITIONAL_HEIGHT,
      });
      imageURLs.push(firstImageURL);

      return imageURLs;
    } else {
      try {
        const firstImageURL = await domtoimage.toPng(targetDOM, {
          width: tableWidth,
          height: firstImageMaxHeight + ADDITIONAL_HEIGHT,
        });
        imageURLs.push(firstImageURL);

        let currentYOffset = firstImageMaxHeight;

        while (currentYOffset < tableHeight) {
          let otherImageURL: string;
          if (tableHeight - currentYOffset < otherImageMaxHeight) {
            otherImageURL = await domtoimage.toPng(targetDOM, {
              width: tableWidth,
              height: tableHeight - currentYOffset + ADDITIONAL_HEIGHT,
              style: { marginTop: `${-currentYOffset}px` },
            });
          } else {
            otherImageURL = await domtoimage.toPng(targetDOM, {
              width: tableWidth,
              height: otherImageMaxHeight + ADDITIONAL_HEIGHT,
              style: { marginTop: `${-currentYOffset}px` },
            });
          }

          imageURLs.push(otherImageURL);
          currentYOffset += otherImageMaxHeight;
        }

        return imageURLs;
      } catch (error) {
        throw error;
      }
    }
  } else {
    throw 'Not enough PDF related DOMs rendered';
  }
}

export {
	domToImages
}