import jsPDF from 'jspdf';

import { ExportPDF, PaperSize } from "./imageToPDF.d";

const PDF_PAPER_TYPE = <const>{
	PDF_A4: 'PDF_A4',
	PDF_LETTER: 'PDF_LETTER'
}

const A4_SIZE: PaperSize = <const>{
	width: 297,
	height: 210,
};

const LETTER_SIZE: PaperSize = <const>{
	width: 279.4,
	height: 215.9,
};

const PAPER_ORIENTATION = 'landscape';

const IMAGE_TYPE = 'PNG';

const PAPER_UNIT = 'mm';

const DEFAULT_FILE_NAME = 'report.pdf';

const exportPDF: ExportPDF = async (imageURLs, targetPaperType, fileName) =>  {
	const pdfManager = new jsPDF(PAPER_ORIENTATION, PAPER_UNIT, [
    PDF_PAPER_TYPE[targetPaperType]['height'],
    PDF_PAPER_TYPE[targetPaperType]['width'],
  ]);
  const pdfFileName = fileName ? fileName : DEFAULT_FILE_NAME;

  try {
    await (async () => {
      for (let i = 0; i < imageURLs.length; i++) {
        const imageProps = pdfManager.getImageProperties(imageURLs[i]);
        const pdfWidth = pdfManager.internal.pageSize.getWidth();
        const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;

        if (i !== imageURLs.length - 1) {
          pdfManager.addImage(imageURLs[i], IMAGE_TYPE, 0, 0, pdfWidth, pdfHeight);
          pdfManager.addPage();
        } else {
          pdfManager.addImage(imageURLs[i], IMAGE_TYPE, 0, 0, pdfWidth, pdfHeight);
        }
      }
    })().then(() => {
      pdfManager.save(pdfFileName);
    });
  } catch (error) {
    throw 'Unexpected error has occured on export PDF file';
  }
}

export {
	PDF_PAPER_TYPE,
	exportPDF,
}