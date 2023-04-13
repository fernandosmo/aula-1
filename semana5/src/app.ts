import express from 'express';
import cors from 'cors';
import routes from './routes';
import connection from './config/database';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes)

const port = 8000;

connection.then(() => {
  console.log(`Database connected!`);
  app.listen(port, () => {
  console.log(`Application running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
}).catch((err) => console.log(err));

