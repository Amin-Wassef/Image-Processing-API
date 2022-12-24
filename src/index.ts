import express from 'express';
import router from './routes/api';

const app = express();

const port = 8000;
app.listen(port, () => {
  console.log(`Server has been started`);
  console.log(`http://localhost:${8000}`);
});

app.get('/', (req, res) => {
  res.send('Server is built successfully');
});

app.use('/api', router);

export default app
