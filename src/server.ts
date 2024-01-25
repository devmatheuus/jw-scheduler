import { app } from './app';
import { appDataSource } from './dataSource';

(async () => {
  await appDataSource.initialize().catch((err: any) => {
    console.error('Failed to connect to database', err.message);
    process.exit(1);
  });

  app.listen(3001, () => {
    console.log('Server is running on port 3000');
  });
})();
