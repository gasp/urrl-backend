# run it locally

- classic `yarn` to install dependencies
- run `yarn load` to set up sqlite3 database and fixtures
- run `docker run -p 6379:6379 -it redis/redis-stack-server:latest`
- `yarn dev` hosts the backend on port 8001 (see .env API_PORT)

# troubleshooting

- to re-initialize sequelize: `yarn reset && yarn load`
- to access redis data `docker exec -it 0fb72ba093d1 redis-cli` where 0fb72ba093d1 is the id of the container.

# todo

- [ ] add helmet, compression, cors
