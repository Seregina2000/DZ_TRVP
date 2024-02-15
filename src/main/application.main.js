import { app } from './express/express.initializer.js';
import { db, deleteExpiredOrdersOnStartup } from './db/mysql.connector.js';

/*const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'test'
});*/
// database instance;

db.connect().then(() => {
  console.log('Connected to database successfully!');
  deleteExpiredOrdersOnStartup()
    .then(console.log('Удаление успешно!'))
    .catch(err => {
      console.log('Ошибка при удалении истекших заказов');
      console.log(err);
    });
});

//connection.connect();

const port = 8080;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
