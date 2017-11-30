# burger
A simple node/express/mysql app to create burgers and eat them,


Schema:
mysql> describe ready;
+--------------+-------------+------+-----+---------+----------------+
| Field        | Type        | Null | Key | Default | Extra          |
+--------------+-------------+------+-----+---------+----------------+
| id           | int(11)     | NO   | PRI | NULL    | auto_increment |
| user_created | varchar(30) | NO   |     | NULL    |                |
| burger_name  | varchar(30) | NO   |     | NULL    |                |
| date_created | varchar(40) | YES  |     | NULL    |                |
| is_eaten     | tinyint(1)  | YES  |     | NULL    |                |
+--------------+-------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

mysql>
