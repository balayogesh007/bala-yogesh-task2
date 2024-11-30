import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfiguration from './dbconfig';

ConfigModule.forRoot({
  isGlobal: true,
});

const dataSource = async () => {
  const getDbConfig = await dbConfiguration();
  delete getDbConfig.cli;
  delete getDbConfig.autoLoadEntities;
  delete getDbConfig.pool;
  return new DataSource(getDbConfig);
};
export default dataSource();
