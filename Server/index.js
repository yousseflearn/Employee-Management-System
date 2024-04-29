import express from 'express';
import { adminRouter } from './Routes/AdminRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
);
app.use('/auth', adminRouter);
app.use(express.static('Public'));

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
