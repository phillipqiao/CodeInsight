select * FROM users where username = 'john_doe' or email = 'alice.jones@example.com'; 

select id, username from users where email = 'jane.smith@example.com'; 

DROP TABLE IF EXISTS userAttempts;
DROP TABLE IF EXISTS questionAttempts; 
DROP TABLE IF EXISTS userStats;
DROP TABLE IF EXISTS users; 

-- INSERT INTO users (id, username, email, password, created_at)
-- VALUES (
--     id:integer,
--     'username:character varying',
--     'email:character varying',
--     'password:character varying',
--     'created_at:timestamp without time zone'
--   );    
            
            -- how to insert 

CREATe table users (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id,username, email, password)
VALUES
(1,'john_doe', 'john.doe@example.com', 'password123'),
(2,'jane_smith', 'jane.smith@example.com', 'securepass456'),
(3,'alice_jones', 'alice.jones@example.com', 'mypassword789');

            -- Creating table users 

-- TESTING

-- DROP TYPE Human; 
DROP TABLE IF EXISTS programmers; 
DROP TYPE IF EXISTS Human; 

CREATE TYPE Human AS (
    name TEXT,
    birthday DATE,
    dna CHAR[4][4],    -- Must set the array's size
    bio JSON
);


CREATE TABLE programmers (
    id INT PRIMARY KEY,        -- Serial?
    details Human
); 

INSERT INTO programmers (id, details) 
VALUES (
    10,
    ('Jeff', '1969-08-15', ARRAY['A','T','G','C'], '{"about": "Jeff is 10x dev"}'::json)::Human
);

SELECT (details).dna, (details).bio, (details).birthday     -- dot notation to access objects
FROM programmers 
WHERE (details).name = 'Jeff';
