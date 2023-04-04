import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes)

const port = 8000;

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`http://localhost:${port}`);
});