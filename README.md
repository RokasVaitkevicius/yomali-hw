# Yomali HW

Project consists of three parts:

1. Static client website which has `user-tracker.js` script included
2. React dashboard which displays visits data
3. Node.js server which receives data from client website and stores it for future reads

## Resources

- DB uml: [link](https://drive.google.com/file/d/1P-LfEx0N00SsIkOu7P1ZAfOYYM79LDtT/view?usp=sharing)
- Demo Video (loom): [link](https://www.loom.com/share/6df87412c2b3448cb2972868a32cba3d?sid=2d063f4c-0527-4358-8097-0d3ca77c00fc)
- Doc with some questions: [link](https://docs.google.com/document/d/1HS7kFKOfQi7cvEsMUp6IZIy54fGm0AUCJsGo2BXI1co/edit)

## Easy start

Easiest way to run everything is using `Docker`.

First of all make sure `Docker` is running, then run the following command in the root directory of the project:

```bash
docker-compose up
```

This will start all three parts of the project.

If you want to seed some data, you can run:

To seed orgs (this is needed for everything to work, because there is no orgs management, so they have to be seeded):

```bash
docker exec -it yomali-hw-server-1 pnpm sequelize-cli db:seed --seed 20231109153821-demo-orgs.cjs
```

After running orgs seed, optionally you can seed some users and visits:

```bash
docker exec -it yomali-hw-server-1 pnpm sequelize-cli db:seed --seed 20231110093339-demo-users-visits.cjs
```

Then you can open:

- `http://localhost:3001` in your browser to see the client website
- `http://localhost:3000` in your browser to see the dashboard
- `http://localhost:8080` for server

## Project structure

### Client website

Static html website with three pages, which have `user-tracker.js` included. This script on page load sends a request to the server with the following data:

- `identifier` - unique user identifier stored in local storage
- `pageUrl` - current page url
- `visitedAt` - timestamp of the visit

**Things to improve:**

- API key should be passed to the script as a parameter and should come from environment, not be hardcoded like that
- Same applies to the server url
- A more advanced fingerprinting algorithm should be used to identify users: ip, user agent, screen size, etc. At the moment it's uuid that's stored in the local storage, which is not very reliable, because storage can be cleared

### Web dashboard

Simple React app which displays visits data in a table. For simplicity sake in it you can pick which org you want to see data for. In real life scenario, you'd have to login and then you'd see data only for your org.

**Things to improve:**

- Again, everything is hardcoded, so it should be configurable: api-key, server url, etc.
- Design and adding some charts to display data properly

### Server

Node.js react app which receives data from the client website and stores it in the database. It also has an endpoint to get visits data for a specific org.

It has two REST routes:

- `POST /visits` - receives data from the client website and stores it in the database
- `GET /visits` - returns aggregated visits data

#### `POST /visits`

As a more interesting approach here I've used `better-queue` package to queue requests. This helps us to respond as fast as possible to the client, and then process the data in the background.

Having a queue also allows us to control pressure on the server and down the line on the database.

This is of course an in memory queue, so if server stops, data would be lost, but in production, I would use something like SNS/SQS combo or other persistent message queueing system.

#### `GET /visits`

This endpoint returns aggregated visits. It's possible to pick aggregation granularity and timeframe using url query params:

- `aggregation` - minute, hour, day, month
- `dateFrom` - start date
- `dateTo` - end date

Example response:

```json
{
  "data": {
    "http://example.com/features": [
      {
        "timeframe": "2023-11-01T00:00:00.000Z",
        "visit_count": 26
      }
    ],
    "http://example.com/pricing": [
      {
        "timeframe": "2023-11-01T00:00:00.000Z",
        "visit_count": 31
      }
    ],
    "http://example.com/support": [
      {
        "timeframe": "2023-11-01T00:00:00.000Z",
        "visit_count": 34
      }
    ]
  }
}
```

**Things to improve:**

- Add better query params validation and constraints, so that very large timeframes can't be requested

#### Database

Schema is simplistic: there are three tables: `orgs`, `users` and `visits`. `orgs` and `users` are self explanatory, `visits` stores visits data.

I've added indexes where they made the most impact based on `EXPLAIN` query results.

**Things to improve:**

- First thing I'd do is create read/write replicas to separate reads from writes.
- Then I might consider partitioning data probably by `visited_at` column. Having partitions would help us not only with queries, but if we'd decide to archive old data, we could copy them to cold storage and drop partitions from the database. Of course managing partitions is not easy, so it's a tradeoff.
- I'd also consider using timeseries database like `InfluxDB` or `TimescaleDB` for storing visits data. This would allow us to have even faster reads and more flexibility in terms of querying data.
- I'd also change how I manage multitenancy, so that it would be flexible enough to support dedicated databases for each org. This would allow us to scale better and have more control over data. (this of course depends on the business requirements, if we want to support "enterprise" customer who'd get dedicated servers). Another thing is I'd add multiple api-keys support.

#### Things to improve in general

- Security: for example there is no rate limiting. Api-keys should be hashed in DB. Cors is not properly setup.
- Caching: could add redis to at least cache most used orgs
- Monitoring: no monitoring added. It could benefit from using like Data-Dog or something to keep an eye on queue size, server load, slow queries.
- Not production ready: would need to move DB credentials out from config, decide on DB migrations strategy, consider API versioning, add some tests, maybe use pm2 to manage server process.
