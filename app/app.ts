import express = require('express');
// Connect to mongo database via import side effects.
import('./data_connection');
import { BuffModel } from './models/buff';
import { BuffController } from './controllers/buff_controller';
import { StatController } from './controllers/stat_controller';
import { BuffStatValueController } from './controllers/buff_stat_value_controller'

// Create a new express application instance
const app: express.Application = express();
app.use(express.json());

// Set the path where all the view files are stored.
app.set('views', './views');

// Set the templating engine used to create views.
app.set('view engine', 'pug');

app.get('/index', async function (req, res) {
  try {
    const buffs = await BuffModel.find().exec();
    res.render('index', { title: "Classic.Buffed", buffs: buffs });
  } catch (error) {
    console.log(error);
  }
})

// Controller and methods used for the Buff api
const buffController: BuffController = new BuffController();
app.route('/buffs')
  .get(buffController.getBuffs.bind(buffController))
  .post(buffController.createBuff.bind(buffController));

// Controller and routed methods used for Stat API
const statController: StatController = new StatController();
app.route('/stat')
  .post(statController.createStat.bind(statController));

// Controller and routed methods used for BuffStatValue API
const buffStatValueController: BuffStatValueController = new BuffStatValueController();
app.route('/buffstatvalue')
  .get(buffStatValueController.getBuffStatValue)
  .post(buffStatValueController.addNewBuffStatValue);

// Start app listening on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});