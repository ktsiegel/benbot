DROP TABLE IF EXISTS practices;

CREATE TABLE practices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    -- Can be nullable if not specified
    stroke TEXT
);