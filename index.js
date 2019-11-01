import express from 'express';
import cors from 'cors';
import routers from './server/routers';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/', routers);

app.use((request, response) => {
  response.status(404).send({
    status: 404,
    error: 'Not Found !',
  });
});

app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});

export default app;