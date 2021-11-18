import psycopg2
from config.dbcondig import db_root_config


class PersonDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (db_root_config['dbname'],
                                                                            db_root_config['user'],
                                                                            db_root_config['password'],
                                                                            db_root_config['dbport'],
                                                                            db_root_config['host'])
        self.conn = psycopg2.connect(connection_url)

    def create_new_person(self, p_fname, p_lname, p_role, p_email, p_phone, p_gender):
        cursor = self.conn.cursor()
        query = 'insert into "person" (p_fname, p_lname, p_role, p_email, p_phone,p_gender) values (%s,%s,%s,%s,%s,' \
                '%s) returning p_id; '
        cursor.execute(query, (p_fname, p_lname, p_role, p_email, p_phone, p_gender,))
        p_id = cursor.fetchone()[0]
        self.conn.commit()
        return p_id

    def update_person(self, p_id, p_fname, p_lname, p_email, p_phone, p_gender):
        cursor = self.conn.cursor()
        query = 'update "person" ' \
                'set p_fname = %s, p_lname= %s, p_email= %s , p_phone = %s ,p_gender= %s ' \
                'where p_id = %s '
        cursor.execute(query, (p_fname, p_lname, p_email, p_phone, p_gender, p_id))
        self.conn.commit()
        return True

    def delete_person(self, p_id):
        cursor = self.conn.cursor()
        query = 'delete from "person" where p_id = %s;'
        cursor.execute(query, (p_id,))
        deleted_rows = cursor.rowcount
        self.conn.commit()
        return deleted_rows != 0

    def get_all_person(self):
        cursor = self.conn.cursor()
        query = 'select p_id, p_fname, p_lname, p_role, p_email, p_phone ,p_gender from "person";'
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_person_by_id(self, p_id):
        cursor = self.conn.cursor()
        query = 'select p_fname, p_lname, p_role, p_email, p_phone, p_gender ' \
                'from "person" where p_id = %s;'
        cursor.execute(query, (p_id, ))
        result = cursor.fetchone()
        return result

    def get_all_available_person(self):
        cursor = self.conn.cursor()
        query = 'select  st_dt, et_dt, person_id ' \
                'from "availableperson";'
        cursor.execute(query)
        result = []
        # ok
        for row in cursor:
            result.append(row)
        return result

    def get_person_role_by_id(self, p_id):
        cursor = self.conn.cursor()
        query = 'select p_role ' \
                'from "person" where p_id = %s;'
        cursor.execute(query, (p_id,))
        result = cursor.fetchone()
        return result


    def get_most_booked_persons(self):
        cursor = self.conn.cursor()
        query = 'select p_id, p_fname , p_lname,  count(booking.host_id) as bookings ' \
                'from booking inner join person on person.p_id = booking.host_id ' \
                'GROUP BY p_id  order by bookings desc limit 10; '
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_most_used_room(self, p_id):
        cursor = self.conn.cursor()
        query = 'select r_id, count(booking.room_id) as uses ' \
                'from booking inner join person on person.p_id = booking.invited_id inner join room on booking.room_id = room.r_id ' \
                'group by r_id ' \
                ' order by uses desc limit 1; '
        cursor.execute(query, (p_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_person_that_most_share_with_person(self, p_id):
        cursor = self.conn.cursor()
        query = 'select p_id, p_fname , p_lname, count(b.invited_id) as shared ' \
                'from booking as b inner join person ' \
                'on b.invited_id = %s ' \
                'group by b.invited_id, p_id ' \
                'order by shared desc limit 1; '
        cursor.execute(query, (p_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_busiest_hours(self):
        cursor = self.conn.cursor()
        query = 'select st_dt, et_dt, count(*) as activeinthehour' \
                'from booking  ' \
                ' group by st_dt ' \
                'ordered by activeinthehour desc limit 5;'
        cursor.execute(query, )
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_info_for_student(self):
        cursor = self.conn.cursor()
        query = 'select st_dt, et_dt, room_id, host_id' \
                'from booking;  '
        cursor.execute(query, )
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_info_for_professor(self):
        cursor = self.conn.cursor()
        query = 'select st_dt, et_dt, room_id, host_id, invite_id' \
                'from booking;  '
        cursor.execute(query, )
        result = []
        for row in cursor:
            result.append(row)
        return result

    def get_info_for_staff(self):
        cursor = self.conn.cursor()
        query = 'select *' \
                'from booking;  '
        cursor.execute(query, )
        result = []
        for row in cursor:
            result.append(row)
        return result