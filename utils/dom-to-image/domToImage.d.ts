import { PDFPaperType } from '../image-to-pdf/imageToPDF.d'

type DomToImages = (targetPaperType: PDFPaperType) => Promise<Array<string>>;

export {
	DomToImages
}