export interface IClientUpdateDto {
  id: string
  name: string
  birthDate: Date
  cpf: string
  // Addresses -----------------
  addresses: [
    {
      city: string
      district: string
      number: string
      street: string
      uf: string
      zipCode: string
      complement: string
    }
  ]
}
