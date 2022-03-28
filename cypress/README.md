## Cypress testing

### Notes
* If all the tests stop working, did the database recently change? If that's the case, a quick update of `support\sql\schema.sql` will most likely fix the issue. 
   * One way to get a current copy of the schema is through Adminer. Just make sure to exclude the data when exporting.
* Seeding the database and creating new database objects.
   * If you are seeding the database with specific data to test a specific creation workflow, make sure to ids to high numbers or adjust the `next_val` field to avoid id collisions.