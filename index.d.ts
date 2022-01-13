interface PDFTableHeaderTypes {
	headerText: string;
  colWidths?: number;
  className?: string;
}

interface PDFTableMergedHeaderTypes {
  headerText: string;
  colSpan: number;
  className?: string;
}

interface PDFExporterProps {
  fileName?: string;
  tableHeaders: PDFTableHeaderTypes[];
  mergedTableHeaders?: PDFTableMergedHeaderTypes[][];
  tableBody?: JSX.Element[];
}

export type {
	PDFExporterProps
}