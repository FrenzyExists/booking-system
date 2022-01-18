from flask import jsonify

from models.Booking import BookingDAO
from models.Person import PersonDAO
from models.Room import RoomDAO

from models.AvailablePerson import AvailablePersonDAO
from models.AvailableRoom import AvailableRoomDAO

class Booking:

    def build_timeframe_attrdict(self, row):
        result = {'start_time': row[0], 'finish_time': row[1], 'activebooking': row[2]}
        return result

    def build_booking_map_dict(self, row):
        result = {'b_id': row[0], 'st_dt': row[1], 'et_dt': row[2], 'invited_id': row[3],
                  'host_id': row[4], 'room_id': row[5]}
        return result

    def build_booking_attr_dict(self, b_id, st_dt, et_dt, invited_id, host_id, room_id):

        if type(b_id) == list:
            result = []
            for bookingid in b_id:
                result.append(self.build_booking_map_dict([bookingid, st_dt, et_dt, invited_id, host_id, room_id]))
            return result

        elif type(b_id) == int:

            return self.build_booking_map_dict([b_id, st_dt, et_dt, invited_id, host_id, room_id])

    """
    This method, as the name says, communicates with the model, which then creates a new booking entry
    To do this, the controller side first checks if:
    a) The room exists
    b) The host and invitee/s exists
    c) Both the invitee and the host are available in set timeframe
    d) The room is also available in set timeframe
    
    NOTE: Certain rooms cannot be added depending of the host's role
    
    Breaking each part...
    """

    def create_new_booking(self, json):
        st_dt = json['st_dt']
        et_dt = json['et_dt']
        invited_id = json['invited_id']  # list or int
        host_id = json['host_id']
        room_id = json['room_id']

        # Checking if the room exists
        room_dao = RoomDAO()
        room = room_dao.get_room(room_id)
        if not room:
            return jsonify("Room Not Found"), 404

        # Checking if the room is available

        # Check if both the host and the invitee exists
        person_dao = PersonDAO()

        # Invitees may be actually a list of ids, therefore, we iterate over all of em
        print(invited_id)
        if type(invited_id) == list:
            for i in invited_id:
                print(person_dao.get_person_by_id(i))
                if not person_dao.get_person_by_id(i):
                    return jsonify("Oops! Seems one of your invitees do not exists in our database. Their id is: %s",
                                   i), 404

        elif type(invited_id) == int:
            print(person_dao.get_person_by_id(invited_id))
            if not person_dao.get_person_by_id(invited_id):
                return jsonify("Oops! Seems your invitee does not exists in our database. Its id is: %s",
                               invited_id), 404

        # Checks if the Host exists
        host = person_dao.get_dict_person_by_id(host_id)
        htr = host["p_role"]  # We will use this to check the host role
        print(host)
        print(room)
        rty = room[2]  # the room's type, ie, what kind of room is
        if not host:
            return jsonify("I'm sorry, but this host does not exists in our database")

        # Check if host meet role requirements
        # Student can be a host for...
        # - Office
        # - Student Space
        #
        # Instructor can be a host for...
        # - Student Space
        # - Office
        # - Lab
        #
        # Professor can host for:
        # - Student Space
        # - Office
        # - Lab
        # - Classroom
        #
        # Staff can host anything
        if (
                (htr == person_dao.R_STUDENT and (rty == room_dao.T_OFFICE or rty == room_dao.T_STY_SPACE)) or
                (htr == person_dao.R_INSTRUCTOR and (
                        rty == room_dao.T_OFFICE or rty == room_dao.T_STY_SPACE or rty == room_dao.T_LAB)) or
                (htr == person_dao.R_PROF and (
                        rty == room_dao.T_OFFICE or rty == room_dao.T_STY_SPACE or rty == room_dao.T_CLASSROOM)) or
                (htr == person_dao.R_VISITOR and (rty == room_dao.T_STY_SPACE)) or
                (htr == person_dao.R_STAFF)
        ):

            # Host has the right role, so now we check if either the host, the room or the invitees have set any
            # period to not know about the outside world. For that, we input the id, and booking timeframe,
            # and search if there's any availableperson timeframe (which again, represents a "no, plz leave me
            # alone". If there is one, check if the timeframe overlaps with the booking timeframe, if so, panic
            booking_dao = BookingDAO()

            # Is there a conflict with the room?
            print(AvailableRoomDAO().verify_available_room_at_timeframe(room_id, st_dt, et_dt), "A list of conflicts...")
            r =AvailableRoomDAO().verify_available_room_at_timeframe(room_id, st_dt, et_dt)
            if True in r:
                return jsonify("I'm sorry, but there's a schedule conflict with this room in your booking"), 404

            print("No conflicts yay!")

            # Is there a conflict with the invited? If not, then generate the booking, we done boys
            if type(invited_id) == list:

                b_id = []
                for inv in invited_id:
                    p = AvailablePersonDAO().verify_available_person_at_timeframe(inv, st_dt, et_dt)
                    print(inv)
                    print(p)
                    if True in p:
                        userdict = person_dao.get_dict_person_by_id(inv)
                        print("User has a conflict: ")
                        print(userdict)

                    else:
                        b_id.append(booking_dao.create_new_booking(st_dt, et_dt, inv, host_id, room_id))
                        # TODO use create_unavailable_room_dt with room_id,st_dt,et_dt
                        # TODO code create_unavailable_person_dt
                        # TODO use create_unavailable_person_dt with each person_id,st_dt,et_dt

                # for inv in invited_id:
                #     print(inv)
                #     if not (AvailablePersonDAO().verify_conflict_at_timeframe(inv, st_dt, et_dt)):
                #     else:
                #         print("There is a conflict")

                mega_map = {}
                print(b_id, "This is the BID")
                for i, b in enumerate(b_id):
                    mega_map[i] = self.build_booking_attr_dict(b, st_dt, et_dt, invited_id[i], host_id, room_id)
                print(mega_map)

                return jsonify(mega_map)

            elif type(invited_id) == int:

                conflict = AvailablePersonDAO().verify_available_person_at_timeframe(invited_id, st_dt, et_dt)
                if True in conflict:
                    return jsonify("I'm sorry, but it seems that there's a schedule conflict with your invitee in "
                                   "your booking"), 404
                print("There's no conflicts, yay")
                b_id = booking_dao.create_new_booking(st_dt, et_dt, invited_id, host_id, room_id)
                # TODO use create_unavailable_room_dt with room_id,st_dt,et_dt
                # TODO code create_unavailable_person_dt
                # TODO use create_unavailable_person_dt with the person_id,st_dt,et_dt

                return jsonify(self.build_booking_attr_dict(b_id, st_dt, et_dt, invited_id, host_id, room_id))
        else:
            return jsonify("I'm sorry, but that host cannot book for this particular room")

    # returns a full query of all booking entries
    def get_all_booking(self):
        method = BookingDAO()
        bookings = method.get_all_booking()
        if not bookings:
            return jsonify("No Meetings, Free day!!!!!!!")
        else:
            result_list = []
            for row in bookings:
                obj = self.build_booking_map_dict(row)
                result_list.append(obj)
        return jsonify(result_list)

    # Returns a single booking entry according to its id

    def get_meetings_by_id(self, json):

        booking_id = json['b_id']
        booking_dao = BookingDAO()
        meeting_by_id = booking_dao.get_meetings_by_id(booking_id)

        if not meeting_by_id:
            return jsonify("There's no meetings by such booking id!"), 404
        else:
            mega_map = {}
            for i, meet in enumerate(meeting_by_id):
                mega_map[i] = self.build_booking_map_dict(meet)

            return jsonify(mega_map)

    def get_booking_by_id(self, json):
        b_id = json["b_id"]

        method = BookingDAO()
        booking_tuple = method.get_booking_by_id(b_id)
        if not booking_tuple:
            return jsonify("Not Found"), 404
        else:
            result = self.build_booking_map_dict([b_id, booking_tuple[0], booking_tuple[1], booking_tuple[2],
                                                  booking_tuple[3], booking_tuple[4]])
            return jsonify(result), 200

    def get_host_at_dt(self, json):
        room_id = json['room_id']
        st_dt = json['st_dt']
        et_dt = json['et_dt']
        method = BookingDAO()
        host_id = method.get_host_at_dt(room_id, st_dt, et_dt)

        if not host_id:
            return jsonify("Not Found"), 404
        else:
            result = {}
            result['host_id'] = host_id
            return jsonify(result), 200

    # updates a booking entry
    def update_booking(self, json):
        b_id = json['b_id']
        st_dt = json['st_dt']
        et_dt = json['et_dt']
        invited_id = json['invited_id']
        host_id = json['host_id']
        room_id = json['room_id']
        method = BookingDAO()
        updatedinfo = method.update_booking(b_id, st_dt, et_dt, invited_id, host_id, room_id)
        if updatedinfo:
            result = self.build_booking_attr_dict(b_id, st_dt, et_dt, invited_id, host_id, room_id)
            return jsonify(result)
        else:
            return jsonify('Not found person')

    def delete_booking(self, json):
        b_id = json["b_id"]
        if type(b_id) == int:
            b_id = (b_id,)

        else:
            b_id = tuple(b_id)
        method = BookingDAO()
        result = method.delete_booking(b_id)
        if result:
            return jsonify("DELETED")
        else:
            return jsonify("NOT FOUND"), 404

    def get_shared_free_timeslot(self, json):
        booking_dao = BookingDAO()
        booking_id = json['b_id']
        date = json['date']
        existent_booking = self.get_meetings_by_id(json).json
        print(existent_booking)
        person_dao = PersonDAO()
        person_tupple = []
        for value in existent_booking.values():
            person = person_dao.get_person_by_id(value['invited_id'])

            if not person:
                return jsonify("Person not found"), 404

            # hours = AvailablePersonDAO().get_all_day_schedule(value['invited_id'], date)

            person_tupple.append(value['invited_id'])

        free_time = booking_dao.get_free_time_of_day(tuple(person_tupple),date)

        mega_map = {}
        print(free_time, "This is the free time")
        for i, b in enumerate(free_time):
            print(b)
            mega_map[i] = {'free_start': str(b[0]), 'free_end': str(b[1]), 'delta_time': str(b[2])}
        print(mega_map)
        return jsonify(mega_map)

    def get_busiest_hours(self):
        method = BookingDAO()
        busiest = method.get_busiest_hours()
        if not busiest:
            return jsonify("Not Found"), 404
        else:
            result_list = []
            for row in busiest:
                obj = self.build_timeframe_attrdict(row)
                result_list.append(obj)
            return jsonify(result_list)

    def get_shared_free_timeslot_users(self, json):
        booking_dao = BookingDAO()
        booking_id = json['b_id']
        date = json['date']
        existent_booking = self.get_meetings_by_id(json).json
        print(existent_booking)
        person_dao = PersonDAO()
        person_tupple = []
        for value in existent_booking.values():
            person = person_dao.get_person_by_id(value['invited_id'])
            if not person:
                return jsonify("Person not found"), 404
            # hours = AvailablePersonDAO().get_all_day_schedule(value['invited_id'], date)
            person_tupple.append(value['invited_id'])
        free_time = booking_dao.get_free_time_of_day(tuple(person_tupple),date)
        mega_map = {}
        print(free_time, "This is the free time")
        for i, b in enumerate(free_time):
            print(b)
            mega_map[i] = {'free_start': str(b[0]), 'free_end': str(b[1]), 'delta_time': str(b[2])}
        print(mega_map)
        return jsonify(mega_map)
