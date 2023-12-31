-- migrate:up
INSERT INTO poll (poll_id, question, multi_choice, creation_date)
VALUES
("3cf01771-98e6-4ee9-ab27-8d431ce2f6ec", "What is the best holiday of the year?", FALSE, "2023-11-03 15:01:29"),
("562714ae-8aae-49a2-bb74-92d6c66dc5cf", "Should we travel next year?", FALSE, "2023-09-15 05:02:59"),
("268fc4fb-2114-41f5-a362-7fc86a2ccd7d", "What are the best things in life?", TRUE, "2023-10-15 13:00:02");

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

INSERT INTO vote (vote_id, vote_date)
VALUES
(1,"2023-11-03 05:01:29"),
(2,"2023-11-04 05:05:29"),
(3,"2023-11-05 05:05:29"),
(4,"2023-11-06 05:09:29"),
(5,"2023-11-07 15:01:29"),
(6,"2023-11-08 15:01:29"),
(7,"2023-11-09 19:01:29"),
(8,"2023-11-13 19:01:29"),
(9,"2023-11-23 20:05:29"),
(10,"2023-11-23 17:11:29"),
(11,"2023-11-30 18:11:29"),
(12,"2023-12-03 18:11:29"),
(13,"2023-12-04 18:01:29"),
(14,"2023-12-04 19:01:29"),
(15,"2023-12-04 19:01:29"),
(16,"2023-12-05 19:01:29"),
(17,"2023-12-05 19:01:29"),
(18,"2023-12-05 23:01:29"),
(19,"2023-12-05 23:01:29"),
(20,"2023-12-05 23:01:29"),
(21,"2023-12-05 23:01:29"),
(22,"2023-12-05 23:01:29"),
(23,"2023-12-06 05:01:29"),
(24,"2023-12-07 05:01:29"),
(25,"2023-12-08 15:01:29"),
(26,"2023-12-08 15:01:29"),
(27,"2023-12-08 12:01:29"),
(28,"2023-12-09 12:01:29"),
(29,"2023-12-13 12:03:29"),
(30,"2023-12-13 12:03:29"),
(31,"2023-11-13 15:03:29"),
(32,"2023-11-23 11:01:29"),
(33,"2023-11-24 11:01:29"),
(34,"2023-11-25 11:01:29"),
(35,"2023-11-26 15:01:29");


INSERT INTO choice_vote (choice_vote_id, choice_id, vote_id)
VALUES
(1,1,1),
(2,1,2),
(3,1,3),
(4,2,4),
(5,2,5),
(6,2,6),
(7,2,7),
(8,2,8),
(9,3,9),
(10,3,10),
(11,3,11),
(12,3,12),
(13,5,13),
(14,5,14),
(15,5,15),
(16,5,16),
(17,5,17),
(18,5,18),
(19,6,19),
(20,6,20),
(21,6,21),
(22,7,22),
(23,8,22),
(24,9,22),
(25,8,23),
(26,8,24),
(27,7,25),
(28,8,25),
(29,9,25),
(30,8,26),
(31,9,26),
(32,8,27),
(33,9,27),
(34,9,28),
(35,10,28),
(36,9,29),
(37,9,30),
(38,9,31),
(39,10,31),
(40,9,32),
(41,9,33),
(42,9,34),
(43,10,34),
(46,10,35);

-- migrate:down
DELETE FROM choice_vote WHERE TRUE = TRUE;
DELETE FROM vote WHERE TRUE = TRUE;
DELETE FROM choice WHERE TRUE = TRUE;
DELETE FROM poll WHERE TRUE = TRUE;