# Yomali HW

Project consists of three parts:

1. Static client website which has `user-tracker.js` script included
2. React dashboard which displays visits data
3. Node.js server which receives data from client website and stores it for future reads

## Easy start

Easiest way to run everything is using `Docker`.

First of all make sure `Docker` is running, then run the following command in the root directory of the project:

```bash
docker-compose up
```

This will start all three parts of the project.

If you want to seed some data, you can run:

To seed orgs (this is needed for everything to work, because there is not orgs management, so they have to be seeded):

```bash
docker exec -it yomali-hw-server-1 pnpm sequelize-cli db:seed --seed 20231109153821-demo-orgs.cjs
```

After running orgs seed, optionally you can seed some users and visits:

```bash
docker exec -it yomali-hw-server-1 pnpm sequelize-cli db:seed --seed 20231110093339-demo-users-visits.cjs
```

## Project structure

### Client website

Static html website with three pages, which have `user-tracker.js` included. This script on page load sends a request to the server with the following data:

- `identifier` - unique user identifier stored in local storage
- `pageUrl` - current page url
- `visitedAt` - timestamp of the visit

Things to improve:

- API key should be passed to the script as a parameter and should come from environment, not be hardcoded like that
- Same applies to the server url
- A more advanced fingerprinting algorithm should be used to identify users: ip, user agent, screen size, etc. At the moment it's uuid that's stored in the local storage, which is not very reliable, because storage can be cleared

### Web dashboard

Simple React app which displays visits data in a table. For simplicity sake in it you can pick which org you want to see data for. In real life scenario, you'd have to login and then you'd see data only for your org.

Things to improve:

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

TBD

notes:
aggregation
timeframe

#### Database

TBD

`<-uml->`

notes:
Multitenant (would be better to have logic to pick the right db based on the org)
Read-write replicas
Partitioning
Timeseries DB

#### General

TBD

#### Things to improve

TBD
