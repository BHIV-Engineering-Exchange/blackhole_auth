# DEPLOYMENT GUIDE

## Backend

npm install

npm start

## Frontend

npm install

npm start

## Database

mysql -u root -p

CREATE DATABASE uccis;

Import schema.sql

Import seed.sql

## Environment Variables

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=password

DB_NAME=uccis

## Demo Sequence

1. Start Backend
2. Start Frontend
3. Start Database
4. Open Dashboard
5. Trigger Flood Scenario
6. Verify Incident
7. Verify Escalation
8. Verify Decision
9. Verify Replay
10. Verify Runtime Logs

## Known Limitations

Replay engine is simplified.

Scenario generation is seeded.

Authentication disabled for demo.
