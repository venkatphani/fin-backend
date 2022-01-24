# fin-backend

add the following in `.env` file -
`POSTGRES_PASSWORD=password`
`POSTGRES_USER=docker`
`POSTGRES_DB=testdb`
`JWT_PRIVATE_KEY=MEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCDTw8T2tU5rO+ZGrASECSkygxfLfNmYsiEf2CxjKJ5uow==`
Run Postgress using this command -
`docker-compose -f docker-compose.postgresql.yml up`
Start the server -
`npm run serve`
