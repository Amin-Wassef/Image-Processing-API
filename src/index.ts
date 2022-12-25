import express, { Request, Response } from 'express';
import router from './routes/api';

// Start up an instance of app
const app = express();

// Server Setup
const port = 8000;
app.listen(port, () => {
  console.log(`Server has been started`);
  console.log(`http://localhost:${8000}`);
});

// Main route
app.get('/', (req: Request, res: Response): void => {
  res.send('Server is built successfully');
});

app.use('/api', router);

export default app;
