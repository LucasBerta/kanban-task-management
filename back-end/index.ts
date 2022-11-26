import connectToDataBase from './src/core/db';
import setUpRoutes from './src/core/routing';

setUp();

async function setUp() {
  await connectToDataBase();
  setUpRoutes();
}
