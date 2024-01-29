#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER dev with password 'password';
    CREATE DATABASE vitest WITH OWNER dev;

    \connect vitest;

    CREATE EXTENSION pgcrypto;

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev;
EOSQL