import { registerAs } from '@nestjs/config';
import { join } from 'path';
import devconfig from './devconfig';
// import { CognitoService } from 'src/aws/cognito/cognito.service';

export default registerAs('typeOrmConfig', async () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const data = devconfig();
  console.log(
    'data is ' + JSON.stringify(data),
    nodeEnv === 'development',
    process.env.DB_SYNC === 'true',
  );
  return {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    type: 'postgres' as 'postgres',
    host: data.host,
    port: parseInt(data.port),
    username: data.username,
    password: data.password,
    database: data.dbname,
    autoLoadEntities: true,
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
    migrationsTableName: 'typeorm_migrations',
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    cli: {
      migrationsDir: __dirname + '/../migrations',
    },
    synchronize: process.env.DB_SYNC === 'true',
    logging: true,
    pool: {
      max: 25,
      min: 1,
      maxWaitingClients: 10,
      idleTimeoutMillis: 300000,
    },
  };
});
