import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get('/api/feedbacks', async (req, res) => {
  const feedbacks = await prisma.feedback.findMany();
  res.json(feedbacks);
});

app.post('/api/feedbacks', async (req, res) => {
  const { company, badgeLetter, upvoteCount, daysAgo, text } = req.body;
  const result = await prisma.feedback.create({
    data: {
      company,
      badgeLetter,
      upvoteCount,
      daysAgo,
      text,
    },
  });
  res.json(result);
});

app.get('/api/feedbacks/:id', async (req, res) => {
  const { id }: { id?: string } = req.params;

  const feedback = await prisma.feedback.findUnique({
    where: { id: Number(id) },
  });
  res.json(feedback);
});

app.put('/api/feedbacks/:id', async (req, res) => {
  const { id }: { id?: string } = req.params;
  const { company, badgeLetter, upvoteCount, daysAgo, text } = req.body;

  const feedback = await prisma.feedback.findUnique({
    where: { id: Number(id) },
  });
  res.json(feedback);

  try {
    const feedback = await prisma.feedback.update({
      where: { id: Number(id) },
      data: {
        company,
        badgeLetter,
        upvoteCount,
        daysAgo,
        text,
      },
    });

    res.json(feedback);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

app.delete('/api/feedbacks/:id', async (req, res) => {
  const { id }: { id?: string } = req.params;

  const feedback = await prisma.feedback.delete({
    where: { id: Number(id) },
  });
  res.json(feedback);
});

app.listen(PORT, () =>
  console.log(`🚀 REST API server ready at: http://localhost:${PORT}`)
);
