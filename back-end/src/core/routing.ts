import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import board from '../resources/board/board.routing';
import task from '../resources/task/task.routing';
import app from './appSetup';

dotenv.config();

const port = process.env.PORT;
const allowedOrigins = process.env.CORS_ORIGIN;
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

function setUpRoutes() {
  app.use(bodyParser.json());
  app.use(cors(corsOptions));

  app.use('/boards', board);
  app.use('', task);

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

export default setUpRoutes;
