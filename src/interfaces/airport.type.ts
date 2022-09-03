export default interface AirportData {
  name: string
  code: string
  country: string
  id: number
  images: {
    thumb: string
    small: string
    full: string
  }
  averageRating: number
  directionCodes?: Array<string>
}
