-- Seed hibernate_sequence with starting ID value
INSERT INTO `hibernate_sequence` (`next_val`) VALUES (2);

-- Function for fetching (and incrementing) the ID which
-- should be used in creating the next record
DROP FUNCTION IF EXISTS nextID;
DELIMITER $$
CREATE FUNCTION nextID()
RETURNS BIGINT(20)
NOT DETERMINISTIC
BEGIN
  DECLARE response BIGINT(20);
  SET response = (SELECT `next_val` FROM `hibernate_sequence` LIMIT 1);
  UPDATE `hibernate_sequence` SET `next_val` = `next_val` + 1;
  RETURN (response);
END $$
DELIMITER ;