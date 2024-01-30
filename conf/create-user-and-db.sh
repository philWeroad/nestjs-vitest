#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER dev with password 'password';
    CREATE DATABASE vitest WITH OWNER dev;

    \connect vitest;

    CREATE EXTENSION pgcrypto;

    CREATE TABLE IF NOT EXISTS "author" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR(250) NOT NULL,
        "email" VARCHAR(250) NOT NULL,
        "bio" TEXT,
        "active" BOOLEAN NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "book" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" VARCHAR(250) NOT NULL,
        "code" VARCHAR(250) NOT NULL,
        "author" UUID,
        CONSTRAINT fk_author FOREIGN KEY("author") REFERENCES "author"("id") ON DELETE NO ACTION
    );

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev;
    GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dev;
EOSQL