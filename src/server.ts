import { app } from './app';
import { appDataSource } from './dataSource';

(async () => {
  await appDataSource.initialize().catch((err: any) => {
    console.error('Failed to connect to database', err.message);
    process.exit(1);
  });

  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
})();
