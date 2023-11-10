export interface ApiBarcodeSearchByEanResponse {
  barcode: {
    name: string
    issuingCountry: string
    ean: string
    categoryName: string
  }
}
