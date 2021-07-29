-- Seed hibernate_sequence with starting ID value
INSERT INTO `hibernate_sequence` (`next_val`) VALUES (2);

DROP FUNCTION IF EXISTS `nextID`;

DELIMITER ;;

CREATE FUNCTION `nextID`() RETURNS bigint
BEGIN
  DECLARE response BIGINT(20);
  SET response = (SELECT `next_val` FROM `hibernate_sequence` LIMIT 1);
  UPDATE `hibernate_sequence` SET `next_val` = `next_val` + 1;
  RETURN (response);
END;;

DELIMITER ;

