-- SET timezone="UTC";
BEGIN;

TRUNCATE
dates
RESTART IDENTITY CASCADE;

INSERT INTO dates (
    should_be_UTC_TIMESTAMP,
    should_be_local_TIMESTAMP,
    should_be_UTC_TIMESTAMPTZ,
    should_be_local_TIMESTAMPTZ,
)
VALUES 
(
    '2020-01-01T00:00:00',
    '2020-01-01T00:00:00',
    '2020-01-01T00:00:00',
    '2020-01-01T00:00:00',
    )

-- SELECT setval('dates_id_seq', (SELECT MAX(id) from "dates"));

COMMIT;