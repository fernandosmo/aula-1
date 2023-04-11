import { Request, Response, Router } from 'express';
import ProductsService from '../services/products.services'
import { iProductEdit } from '../models/products.model';

const productRouter = Router();

productRouter.get('/get/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).send('Need to enter a valid id');
  } 

  try {
    if (!ProductsService.getById(Number(id))) {
      return res.status(404).send('Product not found');
    }
    const product = ProductsService.getById(id);
    res.status(200).send(product)
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.get('/get-all', (req: Request, res: Response) => {
  const products = ProductsService.getAll()

  try {
    res.status(200).send({products: products})
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.post('/create', (req: Request, res: Response) => {
  const { description, img, price, quantity } = req.body;

  if (!description || typeof description !== 'string') {
    return res.status(400).send('Description is missing or has the wrong type');
  }

  if (!img || typeof img !== 'string') {
    return res.status(400).send('Image URL is missing or has the wrong type');
  }

  if (!price || typeof price !== 'number') {
    return res.status(400).send('Price is missing or has the wrong type');
  }

  if (!quantity || typeof quantity !== 'number') {
    return res.status(400).send('Quantity is missing or has the wrong type');
  }

  try {
    ProductsService.create({ description, img, price, quantity })
    res.status(201).send('Product created successfully')
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.put('/edit/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).send('Need to enter a valid id');
  }

  const productUpdated: iProductEdit = { 
    description: req.body.description, 
    img: req.body.img, 
    price: req.body.price, 
    quantity: req.body.quantity
   };

  try {
    ProductsService.update(id, productUpdated)
    res.status(204).send('Product updated successfully')
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

productRouter.delete('/remove/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).send('Need to enter a valid id');
  }

  try {
    ProductsService.delete(id)
    res.status(204).send('Product deleted successfully')
  } catch (err: any) {
    res.status(500).send({message: err.message})
  }
})

export default productRouter;