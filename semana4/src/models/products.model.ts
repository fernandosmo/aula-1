export interface iProduct {
  id: number
  description: string
  img: string
  price: number
  quantity: number
}

export interface iNewProduct {
  id?: number
  description: string
  img: string
  price: number
  quantity: number
}

export interface iProductEdit {
  id?: number, 
  description?: string, 
  img?: string, 
  price?: number, 
  quantity?: number 
}