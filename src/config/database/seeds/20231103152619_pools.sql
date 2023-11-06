-- migrate:up
INSERT INTO poll (poll_id, question, multi_choice, creation_date)
VALUES
("3cf01771-98e6-4ee9-ab27-8d431ce2f6ec", "What is the best holiday of the year?", FALSE, "2023-11-03 15:01:29"),
("562714ae-8aae-49a2-bb74-92d6c66dc5cf", "Should we travel next year?", FALSE, "2023-09-15 05:02:59"),
("268fc4fb-2114-41f5-a362-7fc86a2ccd7d", "What's the best thing in life?", TRUE, "2023-10-15 13:00:02");

INSERT INTO choice (choice_id, poll_id, choice)
VALUES
(1, "3cf01771-98e6-4ee9-ab27-8d431ce2f6ec", "Easter"),
(2, "3cf01771-98e6-4ee9-ab27-8d431ce2f6ec", "Christmas"),
(3, "3cf01771-98e6-4ee9-ab27-8d431ce2f6ec", "Thanksgiving"),
(4, "3cf01771-98e6-4ee9-ab27-8d431ce2f6ec", "Halloween"),
(5, "562714ae-8aae-49a2-bb74-92d6c66dc5cf", "Yes"),
(6, "562714ae-8aae-49a2-bb74-92d6c66dc5cf", "No"),
(7, "268fc4fb-2114-41f5-a362-7fc86a2ccd7d", "Play video games"),
(8, "268fc4fb-2114-41f5-a362-7fc86a2ccd7d", "Travel to a new country"),
(9, "268fc4fb-2114-41f5-a362-7fc86a2ccd7d", "Explore the nature"),
(10, "268fc4fb-2114-41f5-a362-7fc86a2ccd7d", "Meet new people");

INSERT INTO vote (choice_id)
VALUES
(1),
(1),
(1),
(2),
(2),
(2),
(2),
(2),
(3),
(3),
(3),
(4),
(5),
(5),
(5),
(5),
(5),
(5),
(6),
(6),
(6),
(7),
(7),
(7),
(8),
(8),
(8),
(8),
(8),
(8),
(8),
(8),
(9),
(9),
(9),
(9),
(9),
(9),
(9),
(9),
(9),
(9),
(9),
(10),
(10),
(10);

-- migrate:down
DELETE FROM vote WHERE TRUE = TRUE;
DELETE FROM choice WHERE TRUE = TRUE;
DELETE FROM poll WHERE TRUE = TRUE;