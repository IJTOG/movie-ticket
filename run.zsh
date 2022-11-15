docker-compose up -d
npm run typeorm migration:run
npm run db:seed
npm run dev