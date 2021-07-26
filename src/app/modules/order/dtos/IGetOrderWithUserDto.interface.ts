export interface IGetOrderWithUserDto {
  amount: number
  dateOder: Date
  client: {
    id: number
    name: string
    cpf: string
  }
}
