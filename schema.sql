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

INSERT INTO feature_requests (title, description, client, client_priority, product_area, target_dt)
VALUES ("Create simple application", "Put together a simple application using Flask and Knockout.js", "Client A", 1, "Policies", "2018-08-05");
