DROP TABLE IF EXISTS feature_requests;
CREATE TABLE feature_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  client TEXT NOT NULL,
  client_priority INTEGER NOT NULL,
  product_area TEXT NOT NULL,
  target_dt TIMESTAMP NOT NULL,
  created_dt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
