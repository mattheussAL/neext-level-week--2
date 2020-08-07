import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes)

try {
  app.listen(3333, () => {
    return console.log("Servidor rodando")
  })
} catch (err) {
  console.error("Houve um problema no servidor")
}