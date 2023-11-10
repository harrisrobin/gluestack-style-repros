export interface Product {
  id: number
  title: string
  created_at: string
  updated_at: string
  price_string: string
  price: number
  thumbnail_url: string
  issuing_country: string
  ean_code: string

  serpapi_dump: {
    shopping_results: Array<SerpShoppingResult>
  }
}

interface SerpShoppingResult {
  position: number
  title: string
  link: string
  product_link: string
  product_id: string
  serpapi_product_api: string
  number_of_comparisons: string
  comparison_link: string
  serpapi_product_api_comparisons: string
  source: string
  price: string
  extracted_price: number
  rating: number
  reviews: number
  extensions: Array<string>
  badge: string
  thumbnail: string
  delivery: string
  store_rating: number
  store_reviews: number
}
