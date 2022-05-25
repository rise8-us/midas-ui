SET @userId = 1;
SET @measureId1 = nextId();
SET @measureId2 = nextId();
SET @assertionId1 = nextId();
SET @assertionId2 = nextId();
SET @completionId1 = nextId();
SET @completionId2 = nextId();

INSERT INTO `assertion` (`id`, `created_by_id`, `text`, `creation_date`, `parent_id`, `product_id`, `completed_at`, `status`, `is_archived`, `start_date`, `due_date`, `assigned_person_id`, `inherited_from`) VALUES
(@assertionId1,	@userId,	'Objective 1',	'2022-05-25 16:19:25',	NULL,	5,	NULL,	'NOT_STARTED',	CONV('0', 2, 10) + 0,	NULL,	NULL,	NULL,	NULL),
(@assertionId2,	@userId,	'Strategy 1',	'2022-05-25 16:19:25',	@assertionId1,	5,	NULL,	'NOT_STARTED',	CONV('0', 2, 10) + 0,	NULL,	NULL,	NULL,	NULL);

INSERT INTO `measure` (`id`, `assertion_id`, `creation_date`, `text`, `status`) VALUES
(@measureId1,	@assertionId1,	'2022-05-25 16:19:26',	'Goal 1',	'NOT_STARTED'),
(@measureId2,	@assertionId2,	'2022-05-25 16:19:26',	'Measure 1',	'NOT_STARTED');

INSERT INTO `completion` (`id`, `creation_date`, `start_date`, `due_date`, `completed_at`, `completion_type`, `value`, `target`) VALUES
(@completionId1,	'2022-05-25 16:19:26',	NULL,	NULL,	NULL,	'BINARY',	0,	1),
(@completionId2,	'2022-05-25 16:19:26',	NULL,	NULL,	NULL,	'BINARY',	0,	1);

INSERT INTO `completion_measure` (`completion_id`, `measure_id`) VALUES
(@completionId1, @measureId1),
(@completionId2, @measureId2);

