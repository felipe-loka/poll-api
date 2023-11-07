-- migrate:up
CREATE TABLE poll (
    poll_id VARCHAR(36), -- UUID
    question VARCHAR(500) NOT NULL,
    multi_choice BOOLEAN NOT NULL,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (poll_id)
);

CREATE TABLE choice (
    choice_id INT AUTO_INCREMENT,
    poll_id VARCHAR(36),
    choice VARCHAR(255) NOT NULL,
    PRIMARY KEY (choice_id),
    FOREIGN KEY (poll_id) REFERENCES poll(poll_id)
);

CREATE TABLE vote (
    vote_id INT AUTO_INCREMENT,
    vote_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (vote_id)
);

CREATE TABLE choice_vote (
    choice_vote_id INT AUTO_INCREMENT,
    choice_id INT,
    vote_id INT,
    PRIMARY KEY (choice_vote_id),
    FOREIGN KEY (choice_id) REFERENCES choice(choice_id),
    FOREIGN KEY (vote_id) REFERENCES vote(vote_id)
);

-- migrate:down
DROP TABLE choice_vote;
DROP TABLE vote;
DROP TABLE choice;
DROP TABLE poll;