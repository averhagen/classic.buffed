import express = require('express');
// Connect to mongo database via import side effects.
import('./models/data_connection');
import { BuffController } from './routes/buff_controller';
import { StatController } from './routes/stat_controller';

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Controller and methods used for the Buff api
const buffController: BuffController = new BuffController();
app.route('/buff')
  .get(buffController.getBuffs)
  .post(buffController.addNewBuff);

const statController: StatController = new StatController();
app.route('/stat')
  .post(statController.addNewStat);

// Start app listening on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});