import { Request, Response, Router } from 'express';
import ProductsService from '../services/products.services'
import { Product } from '../models/products.model';

const productRouter = Router();

productRouter.get('/get/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const product = await ProductsService.getById(id)
    res.status(200).send(product)
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.get('/get-all', async (req: Request, res: Response) => {
  try{
    const products = await ProductsService.getAll()
    res.status(200).send({products: products})
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
  
})

productRouter.post('/create', async (req: Request, res: Response) => {
   try {
    await ProductsService.create(req.body)
    res.status(201).send('Product created successfully')
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.put('/edit/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await ProductsService.update(id, req.body)
    res.status(204).send('Product updated successfully')
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.delete('/remove/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await ProductsService.delete(id)
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
  res.status(204).send('Product deleted successfully')
})

export default productRouter;