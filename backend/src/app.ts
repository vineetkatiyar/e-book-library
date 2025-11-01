import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { errorHandler } from './middleware/globalErrorHndler';
import userRouter from './user/user.routes';
import bookRouter from './books/book.router';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/v1/users', userRouter);
app.use("/api/books", bookRouter)

app.use(errorHandler);

export default app;
