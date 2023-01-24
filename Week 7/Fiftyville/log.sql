-- Keep a log of any SQL queries you execute as you solve the mystery.

-- Search for the description of the crime.
select description from crime_scene_reports
where year = 2021
and month = 7
and day = 28
and street = 'Humphrey Street';
--+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
--|                                                                                                       description                                                                                                        |
--+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
--| Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were conducted today with three witnesses who were present at the time – each of their interview transcripts mentions the bakery. |
--| Littering took place at 16:36. No known witnesses.                                                                                                                                                                       |
--+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-- Search for interviews that took place on that day.
select * from interviews
where transcript like '%bakery%'
and year = 2021
and month = 7
and day = 28;
--+-----+---------+------+-------+-----+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
--| id  |  name   | year | month | day |                                                                                                                                                     transcript                                                                                                                                                      |
--+-----+---------+------+-------+-----+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
--| 161 | Ruth    | 2021 | 7     | 28  | Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away. If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.                                                          |
--| 162 | Eugene  | 2021 | 7     | 28  | I don't know the thief's name, but it was someone I recognized. Earlier this morning, before I arrived at Emma's bakery, I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.                                                                                                 |
--| 163 | Raymond | 2021 | 7     | 28  | As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call, I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow. The thief then asked the person on the other end of the phone to purchase the flight ticket. |
--+-----+---------+------+-------+-----+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

-- Search for the theft's car
select * from bakery_security_logs
where year = 2021
and month = 7
and day = 28
and hour = 10
and minute <= 25;
--+-----+------+-------+-----+------+--------+----------+---------------+
--| id  | year | month | day | hour | minute | activity | license_plate |
--+-----+------+-------+-----+------+--------+----------+---------------+
--| 258 | 2021 | 7     | 28  | 10   | 8      | entrance | R3G7486       |
--| 259 | 2021 | 7     | 28  | 10   | 14     | entrance | 13FNH73       |
--| 260 | 2021 | 7     | 28  | 10   | 16     | exit     | 5P2BI95       |
--| 261 | 2021 | 7     | 28  | 10   | 18     | exit     | 94KL13X       |
--| 262 | 2021 | 7     | 28  | 10   | 18     | exit     | 6P58WS2       |
--| 263 | 2021 | 7     | 28  | 10   | 19     | exit     | 4328GD8       |
--| 264 | 2021 | 7     | 28  | 10   | 20     | exit     | G412CB7       |
--| 265 | 2021 | 7     | 28  | 10   | 21     | exit     | L93JTIZ       |
--| 266 | 2021 | 7     | 28  | 10   | 23     | exit     | 322W7JE       |
--| 267 | 2021 | 7     | 28  | 10   | 23     | exit     | 0NTHK55       |
--+-----+------+-------+-----+------+--------+----------+---------------+
-- Nothing found!

-- Search for the ATM transaction
select * from atm_transactions
where year = 2021
and month = 7
and day = 28
and atm_location = 'Leggett Street'
and transaction_type = 'withdraw';
--+-----+----------------+------+-------+-----+----------------+------------------+--------+
--| id  | account_number | year | month | day |  atm_location  | transaction_type | amount |
--+-----+----------------+------+-------+-----+----------------+------------------+--------+
--| 246 | 28500762       | 2021 | 7     | 28  | Leggett Street | withdraw         | 48     |
--| 264 | 28296815       | 2021 | 7     | 28  | Leggett Street | withdraw         | 20     |
--| 266 | 76054385       | 2021 | 7     | 28  | Leggett Street | withdraw         | 60     |
--| 267 | 49610011       | 2021 | 7     | 28  | Leggett Street | withdraw         | 50     |
--| 269 | 16153065       | 2021 | 7     | 28  | Leggett Street | withdraw         | 80     |
--| 288 | 25506511       | 2021 | 7     | 28  | Leggett Street | withdraw         | 20     |
--| 313 | 81061156       | 2021 | 7     | 28  | Leggett Street | withdraw         | 30     |
--| 336 | 26013199       | 2021 | 7     | 28  | Leggett Street | withdraw         | 35     |
--+-----+----------------+------+-------+-----+----------------+------------------+--------+

-- Search for person-ids of these account_numbers.
select distinct person_id from bank_accounts
join atm_transactions on atm_transactions.account_number = bank_accounts.account_number
where bank_accounts.account_number in (
    select account_number from atm_transactions
    where year = 2021
    and month = 7
    and day = 28
    and atm_location = 'Leggett Street'
    and transaction_type = 'withdraw'
);
--+-----------+
--| person_id |
--+-----------+
--| 686048    |
--| 514354    |
--| 458378    |
--| 395717    |
--| 396669    |
--| 467400    |
--| 449774    |
--| 438727    |
--+-----------+

-- Search for phone-calls with the given discription.
select * from phone_calls
where year = 2021
and month = 7
and day = 28
and duration < 60;
--+-----+----------------+----------------+------+-------+-----+----------+
--| id  |     caller     |    receiver    | year | month | day | duration |
--+-----+----------------+----------------+------+-------+-----+----------+
--| 221 | (130) 555-0289 | (996) 555-8899 | 2021 | 7     | 28  | 51       |
--| 224 | (499) 555-9472 | (892) 555-8872 | 2021 | 7     | 28  | 36       |
--| 233 | (367) 555-5533 | (375) 555-8161 | 2021 | 7     | 28  | 45       |
--| 251 | (499) 555-9472 | (717) 555-1342 | 2021 | 7     | 28  | 50       |
--| 254 | (286) 555-6063 | (676) 555-6554 | 2021 | 7     | 28  | 43       |
--| 255 | (770) 555-1861 | (725) 555-3243 | 2021 | 7     | 28  | 49       |
--| 261 | (031) 555-6622 | (910) 555-3251 | 2021 | 7     | 28  | 38       |
--| 279 | (826) 555-1652 | (066) 555-9701 | 2021 | 7     | 28  | 55       |
--| 281 | (338) 555-6650 | (704) 555-2131 | 2021 | 7     | 28  | 54       |
--+-----+----------------+----------------+------+-------+-----+----------+

-- Search for passengers of the first flight of the the next day
select * from passengers
join flights on passengers.flight_id = flights.id
join airports on flights.origin_airport_id = airports.id
where airports.city = 'Fiftyville'
and flights.year = 2021
and flights.month = 7
and flights.day = 29
and flights.hour = (
    select min(hour) from flights
    join airports on flights.origin_airport_id = airports.id
    where airports.city = 'Fiftyville'
    and flights.year = 2021
    and flights.month = 7
    and flights.day = 29
);
--+-----------+-----------------+------+----+-------------------+------------------------+------+-------+-----+------+--------+----+--------------+-----------------------------+------------+
--| flight_id | passport_number | seat | id | origin_airport_id | destination_airport_id | year | month | day | hour | minute | id | abbreviation |          full_name          |    city    |
--+-----------+-----------------+------+----+-------------------+------------------------+------+-------+-----+------+--------+----+--------------+-----------------------------+------------+
--| 36        | 7214083635      | 2A   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 1695452385      | 3B   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 5773159633      | 4A   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 1540955065      | 5C   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 8294398571      | 6C   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 1988161715      | 6D   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 9878712108      | 7A   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--| 36        | 8496433585      | 7B   | 36 | 8                 | 4                      | 2021 | 7     | 29  | 8    | 20     | 8  | CSF          | Fiftyville Regional Airport | Fiftyville |
--+-----------+-----------------+------+----+-------------------+------------------------+------+-------+-----+------+--------+----+--------------+-----------------------------+------------+

-- Search for the desitantion.
select city from airports
where airports.id = 4;
--+---------------+
--|     city      |
--+---------------+
--| New York City |
--+---------------+

-- Search for the thief
select * from people
where id in (
    select distinct person_id from bank_accounts
    join atm_transactions on atm_transactions.account_number = bank_accounts.account_number
    where bank_accounts.account_number in (
        select account_number from atm_transactions
        where year = 2021
        and month = 7
        and day = 28
        and atm_location = 'Leggett Street'
        and transaction_type = 'withdraw'
    )
)
and phone_number in (
    select caller from phone_calls
    where year = 2021
    and month = 7
    and day = 28
    and duration < 60
)
and passport_number in (
    select passport_number from passengers
    join flights on passengers.flight_id = flights.id
    join airports on flights.origin_airport_id = airports.id
    where airports.city = 'Fiftyville'
    and flights.year = 2021
    and flights.month = 7
    and flights.day = 29
    and flights.hour = (
        select min(hour) from flights
        join airports on flights.origin_airport_id = airports.id
        where airports.city = 'Fiftyville'
        and flights.year = 2021
        and flights.month = 7
        and flights.day = 29
    )
)
and license_plate in (
    select license_plate from bakery_security_logs
    where year = 2021
    and month = 7
    and day = 28
    and hour = 10
    and minute <= 25
);
--+--------+-------+----------------+-----------------+---------------+
--|   id   | name  |  phone_number  | passport_number | license_plate |
--+--------+-------+----------------+-----------------+---------------+
--| 686048 | Bruce | (367) 555-5533 | 5773159633      | 94KL13X       |
--+--------+-------+----------------+-----------------+---------------+

-- Search for the accomplice
select * from people
where phone_number in (
    select receiver from phone_calls
    where caller = '(367) 555-5533'
    and year = 2021
    and month = 7
    and day = 28
    and duration < 60
);
--+--------+-------+----------------+-----------------+---------------+
--|   id   | name  |  phone_number  | passport_number | license_plate |
--+--------+-------+----------------+-----------------+---------------+
--| 864400 | Robin | (375) 555-8161 |                 | 4V16VO0       |
--+--------+-------+----------------+-----------------+---------------+