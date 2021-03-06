from flask import jsonify


from models.Person import PersonDAO
from controller.Room import Room
from models.Room import RoomDAO
from models.AvailablePerson import AvailablePersonDAO


class Person(object):

    def build_person_map(self, row):
        result = {'p_id': row[0], 'p_fname': row[1], 'p_lname': row[2], 'p_role': row[3], 'p_email': row[4],
                  'p_phone': row[5], 'p_gender': row[6],'p_password': row[7]}
        return result
    def build_room1(self, row: tuple):
        result = {
            "r_id": row[0],
            "r_building": row[1],
            "r_dept": row[2],
            "r_type": row[3]
        }
        return result

    def build_person_map_info(self, row):
        result = {'p_fname': row[0], 'p_lname': row[1], 'p_role': row[2],
                  'p_email': row[3], 'p_phone': row[4], 'p_gender': row[5],'p_password': row[6]}
        return result

    def build_person_attr_dict(self, p_id, p_fname, p_lname, p_role, p_email, p_phone, p_gender,p_password):
        result = {'p_id': p_id, 'p_fname': p_fname, 'p_lname': p_lname, 'p_role': p_role, 'p_email': p_email,
                  'p_phone': p_phone, 'p_gender': p_gender,'p_password': p_password}
        return result

    def build_person_update_attr_dict(self, p_fname, p_lname, p_email, p_phone, p_gender,p_password):
        result = {'p_fname': p_fname, 'p_lname': p_lname, 'p_email': p_email,
                  'p_phone': p_phone, 'p_gender': p_gender,'p_password': p_password}
        return result

    def build_role_map_dict(self, row):
        result = {'p_role': row}
        return result

    def build_available_time_person_map(self, row):
        result = {'pa_id': row[0], 'st_dt': row[1],
                  'et_dt': row[2], 'person_id': row[3]}
        return result
    def build_mostusedroom_attrdict(self,row):
        result = {'start_time': row[0], 'finish_time': row[1], 'activebooking': row[2]}
        return result

    def build_mostbookedperson_attrdict(self,row):
        result = {'p_id': row[0], 'p_fname': row[1], 'p_lname': row[2], 'count': row[3]}
        return result

    def build_mostsharedperson_attrdict(self,row):
        result = {'p_id': row[0]}
        return result

    def build_student_info_attrdict(self, row):
        result = {'start_time': row[0], 'finish_time': row[1], 'room_id': row[2], 'host_id':row[3]}
        return result

    def build_prof_info_attrdict(self, row):
        result = {'start_time': row[0], 'finish_time': row[1], 'room_id': row[2], 'host_id': row[3], 'invite_id': row[4]}
        return result

    def build_staff_info_attrdict(self, row):
        result = {'b_id': row[0], 'start_time': row[1], 'finish_time': row[2], 'invited_id': row[3],
                  'host_id': row[4], 'room_id': row[5]}
        return result

    def create_new_person(self, json):
        p_fname = json['p_fname']
        p_lname = json['p_lname']
        p_role = json['p_role']
        p_email = json['p_email']
        p_phone = json['p_phone']
        p_gender = json['p_gender']
        p_password = json['p_password']
        method = PersonDAO()
        p_id = method.create_new_person(p_fname, p_lname, p_role, p_email, p_phone, p_gender,p_password)
        result = self.build_person_attr_dict(p_id, p_fname, p_lname, p_role, p_email, p_phone, p_gender,p_password)
        return jsonify(result)

    def get_all_persons(self, json=None):

        method = PersonDAO()
        if json and "p_id" in json:
            person_list = method.get_all_person_but(json["p_id"])
        else:
            person_list = method.get_all_person()

        if not person_list:
            return jsonify("Nobody is on the list! It feels, lonely.."), 404
        else:
            result_list = []
        for row in person_list:
            obj = self.build_person_map(row)
            result_list.append(obj)
        return jsonify(result_list)

    def get_all_persons_by_role(self, p_role):
        method = PersonDAO()

        person_list = method.get_all_person_by_role(p_role)
        if not person_list:
            return jsonify("Nobody is on the list! It feels, lonely.."), 404
        else:
            result_list = []
        for row in person_list:
            obj = self.build_person_map(row)
            result_list.append(obj)
        return jsonify(result_list)

    def get_persons_by_id(self, p_id):
        method = PersonDAO()
        person_tuple = method.get_person_by_id(p_id)
        if not person_tuple:
            return jsonify("Not Found"), 404
        else:
            result = self.build_person_map_info(person_tuple)
            return jsonify(result), 200

    def persons_by_id_exist(self, p_id):
        method = PersonDAO()
        person_tuple = method.get_person_by_id(p_id)
        if not person_tuple:
            return False
        else:
            return True

    def get_persons_by_role(self, r_id: int):
        method = PersonDAO()
        count = method.count_person_by_role(r_id)
        if count != 0:
            data = method.get_all_person_by_role(r_id)
            result: list = []
            for row in data:
                result.append({
                    'p_id': row[0],
                    'fname': row[1],
                    'lname': row[2],
                    'p_email': row[4],
                    'p_gender': row[6]
                })
            return jsonify(result), 200
        else:
            return jsonify("There are no Persons around"), 404

    def get_most_booked_persons(self, limit_thingy=10):
        method = PersonDAO()
        bookedperson_tuple = method.get_person_who_booked_most(limit_thingy)
        if not bookedperson_tuple:
            return jsonify("Not Found"), 404
        else:
            result_list = []
            for row in bookedperson_tuple:
                obj = self.build_mostbookedperson_attrdict(row)
                result_list.append(obj)
            return jsonify(result_list)

    def get_most_used_room(self, p_id):
        method = PersonDAO()
        most_used = method.get_most_used_room(p_id)
        method2 = RoomDAO()
        if not most_used:
            return jsonify("Not Found"), 404
        else:
            room = Room()
            most_used_room = method2.get_room_by_id(most_used[0])
            return(jsonify({
                "r_id": most_used[0],
                "r_name": most_used_room[0],
                "r_dept": most_used_room[2],
                "r_building": most_used_room[1],
                "r_type": most_used_room[3]
            })), 200

    def get_person_that_most_share_with_person(self, p_id):
        method = PersonDAO()
        most_shared = method.get_person_that_most_share_with_person(p_id)
        if not most_shared:
            return jsonify("Person does not share any booking"), 404
        return jsonify({
            "p_id": p_id,
            "shared": most_shared
        }), 200

    def update_person(self, json):
        p_id = json['p_id']
        p_fname = json['p_fname']
        p_lname = json['p_lname']
        p_email = json['p_email']
        p_phone = json['p_phone']
        p_gender = json['p_gender']
        p_password = json['p_password']
        method = PersonDAO()
        exist = self.persons_by_id_exist(p_id)
        updated_info = method.update_person(p_id, p_fname, p_lname, p_email, p_phone, p_gender, p_password)
        if updated_info and exist:
            result = self.build_person_update_attr_dict(p_fname, p_lname, p_email, p_phone, p_gender, p_password)
            return jsonify(result)
        else:
            return jsonify('Not found person')

    def get_account_by_email_and_password(self,json):
        p_email = json['p_email']
        p_password = json['p_password']
        method = PersonDAO()
        person_tuple = method.get_account_by_email_and_password(p_email, p_password)
        if not person_tuple:
            return jsonify("Not Found"), 404
        else:
            return jsonify({
                'p_email': person_tuple[0],
                'p_password': person_tuple[1],
                "p_id": person_tuple[2],
                "p_role": person_tuple[3]
            }), 200

    def get_person_ids_by_email(self, json: dict):
        p_email = json['p_email']
        method = PersonDAO()
        person_tuple = method.get_person_id_by_email(p_email)
        if not person_tuple:
            return jsonify("Not Found"), 404
        else:
            result = {"person_id": person_tuple}
            return jsonify(result), 200

    def delete_person(self, p_id):
        method = PersonDAO()
        result = method.delete_person(p_id)
        if result:
            method2 = AvailablePersonDAO()
            method2.delete_unavailable_person_schedule(p_id)
            return jsonify("DELETED")
        else:
            return jsonify("NOT FOUND"), 404

    def person_to_get_access_to_room_info(self, p_id):
        method = PersonDAO()
        role = method.get_person_role_by_id(p_id)

        if role == 1:
            info = method.get_info_for_student()

        elif role == 2:
            info = method.get_info_for_professor()

        elif role == 3:
            info = method.get_info_for_staff()

        elif role == 4:
            info = method.get_info_for_instructor()

        elif role == 5:
            info = method.get_info_for_visitor()

        else:
            return jsonify("Role Not found"), 404
        result = []
        for row in info:
            print(row)
            result.append({
                "r_id": row[0],
                "r_building": row[1],
                "r_department": row[2],
                "r_type": row[3],
                "r_name": row[4]
            })
        return jsonify(result), 200


    def role_to_get_access_to_room_info(self, json):
        method = PersonDAO()
        p_role = json['p_role']
        role_access_dict = {
            1 : (5),
            2 : (1,2,4,5),
            3 : tuple(range(1,6)),
            4 : (1,4,5),
            5: (5)
        }

        if p_role not in role_access_dict.keys():
            return jsonify("Role Not found"), 404

        info = method.get_rooms_for_role(role_access_dict[p_role])
        result_list = []
        for row in info:

            obj = self.build_room1(row=row)
            result_list.append(obj)
        return jsonify(result_list), 200

