import express = require('express');
// Connect to mongo database via import side effects.
import('./data_connection');
import { BuffController } from './routes/buff_controller';
import { StatController } from './routes/stat_controller';
import { BuffStatValueController } from './routes/buff_stat_value_controller'

// Create a new express application instance
const app: express.Application = express();
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Controller and methods used for the Buff api
const buffController: BuffController = new BuffController();
app.route('/buff')
  .get(buffController.getBuffs)
  .post(buffController.addNewBuff);

// Controller and routed methods used for Stat API
const statController: StatController = new StatController();
app.route('/stat')
  .post(statController.addNewStat);

// Controller and routed methods used for BuffStatValue API
const buffStatValueController: BuffStatValueController = new BuffStatValueController();
app.route('/buffstatvalue')
  .get(buffStatValueController.getBuffStatValue)
  .post(buffStatValueController.addNewBuffStatValue);

// Start app listening on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});