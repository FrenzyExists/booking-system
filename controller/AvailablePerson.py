from flask import jsonify

from controller.Person import Person
from models.AvailablePerson import AvailablePersonDAO
from models.Person import PersonDAO
from models.Room import RoomDAO


class AvailablePerson:
    def build_available_time_person_map(self, row):
        result = {'pa_id': row[0], 'st_dt': row[1], 'et_dt': row[2], 'person_id': row[3]}
        return result

    def build_unavailable_time_person_info(self, row):
        result = {'st_dt': row[0],
                  'et_dt': row[1],
                  'person_id': row[2]
                  }
        return result

    def build_unavailable_person_attr_dict(self, pa_id, st_dt, et_dt, p_id):
        result = {'pa_id': pa_id, 'st_dt': st_dt,
                  'et_dt': et_dt, 'person_id': p_id}
        return result

    ####################
    def create_unavailable_time_schedule(self, json):
        method = Person()
        person_id = json['person_id']
        st_dt = json['st_dt']
        et_dt = json['et_dt']
        exist = method.persons_by_id_exist(person_id)
        if not exist:
            return jsonify("Person doesn't exist")
        else:
            method2 = AvailablePersonDAO()
            pa_id = method2.create_unavailable_person_time(st_dt, et_dt, person_id)
            result = self.build_unavailable_person_attr_dict(pa_id, st_dt, et_dt, person_id)
            return jsonify(result)

    def verify_available_user_at_timeframe(self, p_id: int, st_dt, et_dt):

        method = AvailablePersonDAO()
        available_users_list = method.verify_available_person_at_timeframe(p_id, st_dt, et_dt)
        result = {"Unavailable": available_users_list[0]}

        return jsonify(result)

    def get_all_unavailable_persons(self):
        method = AvailablePersonDAO()
        available_users_list = method.get_all_unavailable_person()
        if not available_users_list:
            return jsonify("Everyone is Available!!!!!!!")
        else:
            result_list = []
            for row in available_users_list:
                obj = self.build_available_time_person_map(row)
                result_list.append(obj)
        return jsonify(result_list)

    ########
    def get_unavailable_person_by_id(self, pa_id):
        method = AvailablePersonDAO()
        person = method.get_unavailable_person_by_id(pa_id)
        if not person:
            return jsonify("That person is available")
        else:
            result = self.build_unavailable_time_person_info(person)
        return jsonify(result)

    def get_unavailable_person_by_person_id(self, p_id):
        method = AvailablePersonDAO()

        person_dao = PersonDAO()
        existing_person = person_dao.get_person_by_id(p_id)

        if not existing_person:
            return jsonify("That person is available")
        else:
            res = method.get_unavailable_person_by_person_id(p_id)
            result = []
            for pa_id, st_dt, et_dt in res:
                result.append({
                    "pa_id": pa_id,
                    "st_dt": st_dt,
                    "et_dt": et_dt
                })
            return jsonify(result), 200

    ########

    # def update_unavailable_schedule(self):
    def update_unavailable_schedule(self, json):
        pa_id = json['pa_id']
        person_id = json['person_id']
        st_dt = json['st_dt']
        et_dt = json['et_dt']
        method = AvailablePersonDAO()
        method2 = Person()
        exist = method2.persons_by_id_exist(person_id)
        updated_info = method.update_unavailable_person(pa_id, st_dt, et_dt, person_id)

        if updated_info and exist:
            result = self.build_unavailable_person_attr_dict(pa_id, st_dt, et_dt, person_id)
            return jsonify(result)
        else:
            return jsonify('Not found person')

    def delete_unavailable_schedule(self, pa_id: int):
        method = AvailablePersonDAO()
        result = method.delete_unavailable_person_schedule(pa_id)
        if result:
            return jsonify("DELETED")
        else:
            return jsonify("NOT FOUND")

    # Deletes an entry where person is unavailable if given the exact timeframe
    def delete_unavailable_person_schedule_at_certain_time(self, json: dict):
        p_id = json["p_id"]
        st_dt = json["st_dt"]
        et_dt = json["et_dt"]

        dao = AvailablePersonDAO()
        person_dao = PersonDAO()

        existing_person = person_dao.get_person_by_id(p_id)

        if not existing_person:
            return jsonify("Room Not Found"), 404

        res = dao.delete_unavailable_person_schedule_at_certain_time(p_id, st_dt, et_dt)
        if res:
            return jsonify("DELETED")
        else:
            return jsonify("NOT FOUND")

    # Returns the timeframe for a room (all day)
    def get_all_day_schedule(self, json: dict):
        person_id = json['p_id']
        date = json['date']

        dao = AvailablePersonDAO()
        person_dao = PersonDAO()

        existing_person = person_dao.get_person_by_id(person_id)

        if not existing_person:
            return jsonify("Room Not Found"), 404

        res = dao.get_all_day_schedule(person_id, date)
        result = []
        for row in res:
            result.append({
                "b_name": row[0],
                "r_name": row[1],
                "st_dt": row[2],
                "et_dt": row[3]
            })
        return jsonify(result), 200

    def get_schedule(self, p_id: int):
        dao = AvailablePersonDAO()
        person_dao = PersonDAO()
        room_dao = RoomDAO()
        existing_room = person_dao.get_person_by_id(p_id)
        if not existing_room:
            return jsonify("Person Not Found"), 404
        else:
            res = dao.get_all_schedule(p_id)
            result = []
            # t_dt, et_dt, b_id, b_name
            for row in res:
                if row[2] >= 0:
                    roomname = room_dao.get_name_by_room_id(row[2])[0]
                else:
                    roomname = "Unavailable"

                result.append({
                    "name": row[3],
                    "st_dt": row[0],
                    "et_dt": row[1],
                    "room_id": row[2],
                    "room_name": roomname
                })
            return jsonify(result), 200

    def delete_all_unavailable_person_schedule(self, json: dict):
        p_id = json["p_id"]

        dao = AvailablePersonDAO()
        person_dao = PersonDAO()

        if not person_dao.get_person_by_id(p_id):
            return jsonify("Room Not Found"), 404

        res = dao.delete_all_unavailable_person_schedule(p_id)
        if res:
            return jsonify("DELETED")
        else:
            return jsonify("NOT FOUND")

    def get_who_appointed_at_given_room_and_time(self, json: dict):
        r_id = json['r_id']
        st_dt = json["st_dt"]
        et_dt = json["et_dt"]

        method = AvailablePersonDAO()
        method_2 = RoomDAO()
        if not method_2.check_if_room_exists(r_id):
            return jsonify("Room does not exist"), 404
        res = method.find_available_persons_in_room(r_id, st_dt, et_dt)
        result = []
        for row in res:
            result.append({
                "p_id": row[0],
            })
        return jsonify(result), 200

