CREATE TABLE dates (
    should_be_UTC_TIMESTAMP TIMESTAMP DEFAULT now() NOT NULL,
    should_be_local_TIMESTAMP TIMESTAMP DEFAULT now() NOT NULL,
    should_be_UTC_TIMESTAMPTZ TIMESTAMPTZ DEFAULT now() NOT NULL,
    should_be_local_TIMESTAMPTZ TIMESTAMPTZ DEFAULT now() NOT NULL
);