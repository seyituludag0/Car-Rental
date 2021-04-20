export interface RentalDetail {
  id?:number;
  modelName:string
  brandName:string
  colorName:string
  companyName:string
  firstName:string
  lastName:string
  dailyPrice:number
  modelYear:number
  rentDate:Date;
  returnDate?:Date;
  description:string
  customerId:number;
}
