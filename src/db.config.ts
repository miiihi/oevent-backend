/**
 * DB configuration taken from ENV variables or defaults.
 */
const Firebird = require('node-firebird');

export function  getDbPool() {
  const options: any = {};
  options.host = process.env.DB_HOST || '127.0.0.1';
  options.port = process.env.DB_PORT || 3050;
  options.database = process.env.DB_NAME || 'C:/Work/OKSG/Competition.gdb';
  options.user = process.env.DB_USER || 'SYSDBA';
  options.password = process.env.DB_PWD || 'masterkey';
  // 10 = the number is count of opened sockets
  return Firebird.pool(process.env.DB_POOL_CONN || 10, options);
}
