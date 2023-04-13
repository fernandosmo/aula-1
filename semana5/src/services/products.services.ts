import { Product } from "../models/products.model";
import productRepository from "../repository/product.repository";

class ProductsService {
  getAll() {
    return productRepository.getAll()
  }

  getById(id: string) {
    return productRepository.getById(id)
  }

  create(product: typeof Product) {
    return productRepository.create(product)
  }

  update(id: string, product: Partial<typeof Product>) {
    return productRepository.update(id, product)
  }

  delete(id: string) {    
    return productRepository.delete(id)
  }
}

export default new ProductsService();