import express = require('express');
// Connect to mongo database via import side effects.
import('./data_connection');
import { BuffModel } from './models/buff';
import { statModel } from './models/stat';
import { restRouter } from './routes/rest';
import { buffRouter } from './routes/webapp/buff';
import { statRouter } from './routes/webapp/stats';
import { buffCategoryRouter } from './routes/webapp/buff_category';
import { statCategoryRouter } from './routes/webapp/stat_category';

// Create a new express application instance
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded());

// Set the path where all public files are accessed.
app.use(express.static('public'));

// Set the path where all the view files are stored.
app.set('views', './views');

// Set the templating engine used to create views.
app.set('view engine', 'pug');

app.get('/index', async function (req, res) {
  try {
    const buffs = await BuffModel.find().exec();
    const stats = await statModel.find().exec();
    res.render('index', { title: "Classic.Buffed", stats: stats, buffs: buffs });
  } catch (error) {
    console.log(error);
  }
})

app.use('/rest', restRouter);
app.use('/buffs', buffRouter);
app.use('/stats', statRouter);
app.use('/buffcategory', buffCategoryRouter);
app.use('/statcategory', statCategoryRouter);

// Start app listening on port 3000
app.listen(3000, function () {
  console.log('Classic.Buffed listening on port 3000!');
});