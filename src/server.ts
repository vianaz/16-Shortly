import chalk from 'chalk';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(chalk.bold.blue(`Server opening in port ${PORT}`));
});
