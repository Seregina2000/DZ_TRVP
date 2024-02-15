import pgPromise from 'pg-promise';

const connection = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'main',
  user: 'postgres',
  password: '123456',
};

const pgp = pgPromise({});
export const db = pgp(connection);

export function deleteExpiredOrdersOnStartup() {
  console.log('Удаление истекших заказов...');
  return db.tx(async transaction => {
    await transaction.none('delete from "twrp-009".order_info where date < CURRENT_TIMESTAMP', []);
  });
}
