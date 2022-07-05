INSERT INTO `capability` (`id`, `title`, `description`, `is_archived`, `creation_date`, `reference_id`) VALUES
(5,	'Test Requirement',	NULL,	CONV('0', 2, 10) + 0,	'2022-07-01 17:03:10',	1);

INSERT INTO `capability_deliverable` (`capability_id`, `deliverable_id`) VALUES
(5,	7);

INSERT INTO `deliverable` (`id`, `title`, `is_archived`, `creation_date`, `status`, `reference_id`, `position`, `parent_id`, `product_id`, `assigned_to_id`) VALUES
(7,	'Test Deliverable',	CONV('0', 2, 10) + 0,	'2022-07-01 17:03:18',	'NOT_STARTED',	0,	0,	NULL,	NULL,	1);

INSERT INTO `portfolio_capability` (`portfolio_id`, `capability_id`) VALUES
(4,	5);