const pool = require('./src/database/connection');

(async () => {
  try {
    const [rows] = await pool.execute('DESCRIBE menu_items');
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
