import { PDF_PAPER_TYPE } from './imageToPDF';

interface PaperSize {
	width: number;
	height: number;
}

type PDFPaperType = keyof typeof PDF_PAPER_TYPE;

type ExportPDF = (imageURLs: string[], targetPaperType: PDFPaperType, fileName?: string) => Promise<void>

export type {
	PaperSize,
	PDFPaperType,
	ExportPDF
}