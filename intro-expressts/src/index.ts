import express, { Express, Request, Response } from 'express';
import fs from 'fs';

const appServer: Express = express();
// Body Parser  : Method agar API Express kita dapat mengambil req.body
appServer.use(express.json());
const port = 5000;

appServer.get('/api', (_: Request, res: Response) => {
  res.json({
    status: 200,
    message: 'Welcome to Express.ts API',
  });
});

// req.url, req.body, req.headers
// req.url : params
//         : query ?start-date=2024-01-01&end-date=2024-02-02&category=TRANSPORT
appServer.get(
  '/api/expenses/:expenseId',
  async (req: Request, res: Response) => {
    // Step-01: Get expenseId from params
    const { expenseId } = req.params;

    // Step-02: Find data expenses with expenseId
    const db = fs.readFileSync('./src/db/db.json', 'utf8');
    const dbParse = await JSON.parse(db);

    const findExpenseByExpenseId = dbParse?.expenses?.filter(
      (expense) => expense.id === parseInt(expenseId)
    );

    if (findExpenseByExpenseId.length === 0)
      res.status(404).json({
        message: `Get detail expense with id = ${expenseId} not found`,
      });

    res.status(200).json({
      message: `Get detail expense with id = ${expenseId} successfull`,
      expense: findExpenseByExpenseId,
    });
  }
);

appServer.get('/api/expenses', async (req: Request, res: Response) => {
  const query = req.query;
  const startDate = query['start-date'];
  const endDate = query['end-date'];
  const category = query['category'];

  const db = fs.readFileSync('./src/db/db.json', 'utf8');
  const dbParse = await JSON.parse(db);

  const findExpensesByCategoryOrDateRange = dbParse?.expenses?.filter(
    (expense) => {
      return (
        expense.category === category ||
        (expense.date >= startDate! && expense.date <= endDate!)
      );
    }
  );

  res.status(200).json({
    message: `Get expense by date range or category success`, 
    expenses: findExpensesByCategoryOrDateRange
  })
});

appServer.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
