CREATE TYPE gender AS ENUM
('male', 'female', 'other', 'undisclosed');

CREATE TYPE diff_level AS ENUM
('easy', 'average', 'hard');

CREATE TABLE users
(
  username VARCHAR(30) NOT NULL PRIMARY KEY UNIQUE,
  name VARCHAR(25) NOT NULL,
  password text NOT NULL,
  age SMALLINT NOT NULL,
  gender gender NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE habits
(
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  username VARCHAR(10) NOT NULL,
  diff_level diff_level NOT NULL,
  icon VARCHAR(10),
  reminder TIMESTAMP,
  coins SMALLINT,
  diamonds SMALLINT,
  completed_dates TIMESTAMP
  [],
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

  CREATE TABLE tokens
  (
    token text NOT NULL UNIQUE PRIMARY KEY,
    username VARCHAR(10) NOT NULL
  );
