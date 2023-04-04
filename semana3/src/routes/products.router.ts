import { Request, Response, Router } from 'express';
import { iNewProduct, iProduct } from '../utils/enumerators';

const productRouter = Router();

let products = [
  { 
    id: 1, description: 'Notebook S51', 
    img: 'https://images.samsung.com/is/image/samsung/br-notebook-style-s51-np730xbe-kp1br-np730xbe-kp1br-fronttitanumsilver-185313138?$720_576_PNG$', 
    price: 5000, 
    quantity: 5 
  }, 
  { 
    id: 2, description: 'Notebook Samsung Book E30 Intel Core i3 4GB 1TB - 15,6” Full HD Windows 10', 
    img: 'https://a-static.mlcdn.com.br/1500x1500/notebook-samsung-book-e30-intel-core-i3-4gb-1tb-156-full-hd-windows-10/magazineluiza/135258300/44bf629ad1472f3a86f5ae8b55ed0672.jpg', 
    price: 3500, 
    quantity: 3 
  }, 
  { 
    id: 3, 
    description: 'Notebook Acer Aspire 5 A514-53-59QJ Intel Core I5 8GB 256GB SSD 14 Windows 10', 
    img: 'https://acerstore.vteximg.com.br/arquivos/ids/157506-760-760/A514-53-54_SSD_01.jpg?v=637396805695270000', 
    price: 4000, 
    quantity: 2 
  }, 
  { id: 4, 
    description: 'Notebook Samsung Book E30 15.6" Intel® Core™ i3-10110U 4GB/1TB Windows 10 Home', 
    img: 'https://d3bkgvrq5dqryp.cloudfront.net/Custom/Content/Products/34/17/3417_product-00079815_m39_637400210574011388', 
    price: 3000, 
    quantity: 0 
  }, 
  { 
    id: 5, 
    description: 'Notebook ASUS VivoBook X543UA-GQ3157T Cinza Escuro', 
    img: 'https://www.lojaasus.com.br/media/catalog/product/cache/e62f984c1b34771579d59f0076d196f0/0/0/00asus_laptop_x543_cinza_escuro_13_1_8.png', 
    price: 3350, 
    quantity: 2 
  }
];


productRouter.get('/get-all', (req: Request, res: Response) => {
  try {
    res.status(200).send({products: products})
  } catch (err) {
    res.status(500).send(err)
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
    const id: number = products[products.length - 1].id + 1;

    const newProduct: iNewProduct = { id, description, img, price, quantity }
    products.push(newProduct)
    res.status(201).send(products)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRouter.put('/edit/:id', (req: Request, res: Response) => {

  const { id } = req.params;

  const productUpdated: iProduct = { 
    description: req.body.description, 
    img: req.body.img, 
    price: req.body.price, 
    quantity: req.body.quantity
   };

  try {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
      return res.status(404).send('Product not found');
    }
    products.map((product) => {
      if (JSON.parse(id) === product.id) {
        productUpdated.description && (product.description = productUpdated.description);
        productUpdated.img && (product.img = productUpdated.img);
        productUpdated.price && (product.price = productUpdated.price);
        productUpdated.quantity && (product.quantity = productUpdated.quantity);
      }
    })
    res.status(200).send(products)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRouter.delete('/remove/:id', (req: Request, res: Response) => {

  const { id } = req.params;

  try {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
      return res.status(404).send('Product not found');
    }
    products = products.filter(product => product.id !== parseInt(id));
    
    res.status(200).send(products)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default productRouter;