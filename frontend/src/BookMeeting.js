import React, {useEffect, useState} from 'react';
import {Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {Button, Container, Form, Modal, ModalDescription} from "semantic-ui-react";
import axios from "axios";
import * as PropTypes from "prop-types";
import DatePicker from 'react-date-picker';


DatePicker.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

function BookMeeting(){
    const [r, setr] = useState(false);
    const [t, sett] = useState(false);
    const [b, setb] = useState(false);
    const [dates, setDates] = useState([]);
    const [open, setOpen] = useState(false);
    const [booking, setbooking] = useState(false);
    const [book, setbook] = useState(false);
    const [unavailable, setavailable] = useState(false);
    const [unavail, setavail] = useState(false);
    const [mark,setmark] = useState(false);
    const localizer = momentLocalizer(moment)
    const [st_dt, setst_dt] = useState("");
    let [et_dt, setet_dt] = useState("");
    const[room_id,setroom_id] = useState("");
    const[invitee,setinvitee]=  useState("");
    const [g,setg]= useState(false);
    const [its,setits] = useState(false)
    const [Selected,SetSelect] = useState(false)
    const [free, setfree] = useState(false);
    const [updatebooking,setupdatebooking] = useState(false);
    const[deletebooking,setdeletebooking] =useState(false)
    const [updateunavailable,setupunavailable]= useState(false);
    const [deleteunavailable,setdeleteupunavailable]= useState(false);
    const [listfree,setlistfree]=useState([]);
    const [listfr,setlistfr]=useState([]);
    const [host,sethost] = useState([]);
 const [a,seta] =useState(false)
    let e = localStorage.getItem("login-data");
    let   dat = JSON.parse(e)
    const[un,setun] =  useState("");
    const [ba_id,setba_id] = useState("");
    const [New,setnew] = useState("");
    const[und,setund]= useState(false);
    const[delebook,setdelebook] = useState(false);
    const [rooms, setRooms] = useState([]);
    const[k,setk] = useState(false);
    const[y,sety] = useState(false);
    const[ts,sets]= useState([]);
    const[s,setl]= useState([]);
    const[h,seth]= useState(false);
    const[date,setdate]=useState("")
    const[sh,setlh]= useState(false);
    const[z,setz]=useState(false);
    const[all,setall]= useState([]);
    const[ty,setty]= useState([]);
const [he,sethe]=useState(false)
    const [pe,setpe] =useState("")
    const [je,setje]=useState(false)
    const [userday,setuserday] =useState(false)
    const [room,setroom] =useState(false)
    const[ho,setho]= useState(false);
    const[hosted,sethosted]= useState(false);
    const[ed,seted]= useState(false);
    const[hstd,sethstd]= useState(false);
    const[ost,setost]= useState(false);
    function getRooms(){
        if (k===false) {
            axios.get(`https://booking-system-pika.herokuapp.com/pika-booking/persons/person/${dat.p_id}/role-access`).then((res) => {
                    setRooms(res.data);
                    console.log(rooms)

                }, (error) => {
                    console.log(error);
                }
            );
        }

    }
    function getallbookingsofuser(){
        if (k===false) {
            axios.get(`https://booking-system-pika.herokuapp.com/pika-booking/booking/meet/host/${dat.p_id}`).then((res => {
                setl(res.data)
            }))
        }
    }
    const returnallfalse=()=>{
          setho(false)
        sethosted(false)
        setOpen(false)
        setst_dt("")
        setet_dt("")
        setroom_id("")
        setinvitee("")
        setg(false)
        setbooking(false)
        setbook(false)
        setavailable(false)
        setavail(false)
        setmark(false)
        SetSelect(false)
        setfree(false)
        setb(false)
        setba_id("")
        setun("")
        setdeleteupunavailable(false)
        setupdatebooking(false)
        setr(false)
        setdeletebooking(false)
        setdeleteupunavailable(false)
        sett(false)
setlistfr([])
seta(false)
        setnew("")
        setund(false)
        setdelebook(false)
        setk(false)
        sety(false)
        sets([])
        setl([])
        seth(false)
        setlh(false)
        setall([])
        sethe(false)
        setje(false)
        setroom(false)
        setuserday(false)
        setost(false)
        seted(false)
        sethstd(false)
        setpe("")
        sethost([])
    }
    const handler= ()=>{
    allbidofmeeting()

    }
    const handler1= ()=>{
        allbidofmeeting()
        setlh(true)
    }

function handler2 (){
    if(date===""|| invitee===""){
        return false
    }
  emailtoid()
    return true
}
    function handler3 (){
        if(date===""|| invitee===""){
            return false
        }
        emailtoid()
        return true
    }
function handlerfix(){
    if (listfree.length===0){
        setje(true)
    }else {
      seth(true)
    }
}
function handlerdate(j){
        setdate(j)
}
function gettherooms(){
        if (st_dt===""|| et_dt===""){
            return false
        }
      let  data = {"p_role":dat.p_role, "st_dt": st_dt,"et_dt": et_dt}
        axios.post(`https://booking-system-pika.herokuapp.com/pika-booking/rooms/available/timeframe/person-role`,data).then(
            res=>{


                setlistfree(res.data)
                console.log(res.data)
                console.log(listfree)
    }
        )
        setho(true)
}
function getusername(){
        console.log(ty)
        let data = {"p_id":ty[0]['person_id'][0], "date": date}
    console.log(data)
        axios.post(`https://booking-system-pika.herokuapp.com/pika-booking/persons/available/timeframe`,data).then(
            res =>{
                let result = []
                let i=0;
                for(let ts of res.data){ // data : [ {timeBlock1}, {timeBlock2}, {...} ]
                    const blockStart = ` ${ts.st_dt}-0400 (Atlantic Standard Time)`
                    const blockEnd = `${ts.et_dt}-0400 (Atlantic Standard Time)`;
                    const startDate = new Date(blockStart);
                    console.log(startDate);
                    const endDate = new Date(blockEnd);
                    console.log(endDate);
                    result.push({start: startDate, end: endDate, r_name: ts.r_name, b_name: ts.b_name})
                    i++
                }
                 setlistfr(result)
                console.log(res.data)
                console.log(listfr)
            }
        )
        sethstd(true)
}
    function allbidofmeeting(){

            axios.get(`https://booking-system-pika.herokuapp.com/pika-booking/booking/meet/${ba_id}`).then(res=>{
                let hello =[]
                for(let m of res.data){
                    console.log(m)
                    hello.push(m)
                }
                console.log(hello)
                setall(hello)
            })
        console.log(all)
        if(deletebooking===true&& all.length>=1){
            deletebookingcheck()
        }
        if ( updatebooking=== true && all.length>=1){
            updatebookingcheck()
        }
    }
    function emailtoid(){
    let t =[]
for (let m of invitee.split(",")) {
    console.log(m)
    axios.post('https://booking-system-pika.herokuapp.com/pika-booking/persons/email', {"p_email": m}).then(res => {
        console.log(res.data)
        t.push(res.data)
    })
    console.log(t)
}
    setty(t)
        console.log(ty)
    }
    function updatebookingcheck(){

        let e = localStorage.getItem("login-data");
        let   dat = JSON.parse(e)
        if (!sh){
            return false
        }else {
            for (let m of all) {
                let data = {
                    "b_name": New,
                    "b_id": m.b_id,
                    "st_dt": st_dt,
                    "et_dt": et_dt,
                    "host_id": dat.p_id,
                    "invited_id": invitee,
                    "room_id": parseInt(room_id)
                }
                if (New === "") {
                    data.b_name = m.b_name
                }
                if (room_id === "") {
                    data.room_id = parseInt(m.room_id)
                }
                if (st_dt === "") {
                    data.st_dt = m.st_dt
                }
                if (et_dt === "") {
                    data.et_dt = m.et_dt
                }
                if (invitee===""){
                    data.invited_id= parseInt(m.invited_id)
                }
                console.log(data)
                axios.put("https://booking-system-pika.herokuapp.com/pika-booking/booking", data)
            }
        }
        sethe(true)
    }
    function getfreeinviteetime(){
    console.log(ty)
        let i =0;
    let t =[]
        for (let m of ty){
           t.push( ty[i]['person_id'][0])
            i++;
        }
        console.log(t)
      setpe(t)
console.log(pe)
        if (pe!=="") {
            let data = {"invited_id": pe, "date": date}
            axios.post(`https://booking-system-pika.herokuapp.com/pika-booking/bookings/shared-time-users`, data).then(res => {
                setlistfree(res.data)
                console.log(res.data)

            })
            handlerfix()
        }
    }
    function unavailableofperson(){ if (k===false) {
        axios.get(`https://booking-system-pika.herokuapp.com/pika-booking/person/unavailable/person_id/${dat.p_id}`).then(res => {
            sets(res.data)
            console.log(ts)
        })
    }
    }
    function gethost(){
        if (st_dt===""|| et_dt===""||room_id===""){
            return false
        }let data ={ "st_dt": st_dt, "et_dt": et_dt, "room_id": room_id}
        console.log(data)
        axios.post(`https://booking-system-pika.herokuapp.com/pika-booking/meetings/host`,data).then(res=>{
          let r = []
            r.push(res.data.p_fname)
            r.push(res.data.p_lname)
            sethost(r)
            console.log(res.data)
            console.log(host)

        }, (error) => {
            console.log(error)
            sethost([])
        })

        setost(true)
    }
    function updateunavailablecheck(){

        if (st_dt === "" || et_dt === "" || un===""||!r){
            return false
        }else{
            axios.put(" https://booking-system-pika.herokuapp.com/pika-booking/persons/available", {
                "pa_id" : un,
                "person_id":  dat.p_id,
                "st_dt": st_dt,
                "et_dt": et_dt
            })
            return true
        }
    }
    function deletebookingcheck(){
        console.log(all.length)
        if (ba_id===""){
            return false
        }else if (all.length>=1) {
            console.log("ok")
            for (let m of all) {
                console.log(m.b_id)
                axios.delete(`https://booking-system-pika.herokuapp.com/pika-booking/booking/${m.b_id}`)
            }
        }
setdelebook(true)
        return true
    }
    function deleteunavailablegcheck(){
        if (un===""){
            console.log('something')
            return false
        }else{
            axios.delete(` https://booking-system-pika.herokuapp.com/pika-booking/person/unavailable/pa_id/${un}`).then(res=>{
                console.log(res.data)
            })
            setund(true)
            return true
        }
    }
    function run(){
        if (Selected=== true && open=== true||Selected=== true && mark=== true||Selected=== true &&free===true||Selected===true&&unavailable===true
            || Selected===true && booking===true||Selected===true &&room=== true|| Selected===true && hosted === true){
            setst_dt(dates[0].startTimeDisplay)
            setet_dt(dates[0].endTimeDisplay)
            return true
        }
        return false
    }
    function first() {
        if(ba_id===""||st_dt === "" || et_dt === "" || room_id === "" || invitee === ""){
            return false
        }
        emailtoid()
        return true
    }
    function check() {

        if (ba_id === "" || st_dt === "" || et_dt === "" || room_id === "" || invitee === ""|| !y) {
            return false
        } else {
            let e = localStorage.getItem("login-data");
            let dat = JSON.parse(e)
            console.log(ty)
            let i=0;
for (let m of ty) {
    console.log(ty[i]['person_id'])
    axios.post('https://booking-system-pika.herokuapp.com/pika-booking/booking', {
        "b_name": ba_id,
        "st_dt": st_dt,
        "et_dt": et_dt,
        "host_id": dat.p_id,
        "invited_id": ty[i]['person_id'],
        "room_id": room_id,

    }).then((response) => {

        }, (error) => {
            console.log(error);
            setg(false)
            setz(true)
        }
    );
i++
}
            return true

        }
    }
    function first1() {
        if (st_dt ==="" || et_dt === "" ) {
            return false
        } else {
            return true

        }
    }
    function unavailablecheck(){
        if (st_dt === "" || et_dt === "" ||!unavail){
            return false
        }else {
            let e = localStorage.getItem("login-data");
            let   dat = JSON.parse(e)
            axios.post(' https://booking-system-pika.herokuapp.com/pika-booking/persons/available', {
                "person_id": dat.p_id  ,"st_dt": st_dt, "et_dt": et_dt
            })
            return setbook(true)
        }
    }
    useEffect(()=>
    {
        unavailableofperson()
        getRooms()
        run()
        getallbookingsofuser()
        console.log(s)
        setk(true)
    })
    function Time(year,month, date, hours, minutes){
        if (minutes===0)
            return `${year}-${month +1}-${date} ${hours}:00:00-04`;
        else if (minutes< 10)
            return `${year}-${month +1}-${date} ${hours}:0${minutes}:00-04`;
        else
            return `${year}-${month +1}-${date} ${hours}:${minutes}:00-04`;
    }
    function TypeTime(hours, minutes){

        let pastNoonIndicator = "";
        if(hours < 12){
            if(hours === 0) hours = 12;
            pastNoonIndicator = "AM";
        }
        else {
            if(hours > 12) hours -= 12;
            pastNoonIndicator = "PM";
        }
        if(minutes === 0){
            return `${hours}:00 ${pastNoonIndicator}`;
        } else {
            return`${hours}:${minutes} ${pastNoonIndicator}`;
        }
    }
    return <Container style={{ height: 800 }}><Calendar
        selectable
        localizer={localizer}
        startAccessor="start"
        events={dates}
        endAccessor="end"
        views={["month", "day"]}
        defaultDate={Date.now()}
        onSelecting = {(selected) =>{ setDates([{
            'title': 'Your preferred booking time or unavailable time',
            'allDay': false,
            'start': new Date(selected.start),
            'end': new Date(selected.end),
            'startTimeDisplay': Time(selected.start.getFullYear(), selected.start.getMonth(),selected.start.getDate(), selected.start.getHours(),selected.start.getMinutes()),
            'endTimeDisplay': Time(selected.start.getFullYear(), selected.start.getMonth(),selected.start.getDate(),selected.end.getHours(),selected.end.getMinutes())
        }])
            {console.log(selected.end)}SetSelect(true)} }

    >
    </Calendar>
        <Modal
            centered={false}
            open={t}
            onClose={() => sett(false)}
            onOpen={() => sett(true)}
        >
            <Modal.Header>Invalid!</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    You don't have not submitted all the asked information, please complete all parameters asked.
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => sett(false)}>OK</Button>
            </Modal.Actions>
        </Modal>
        <Button fluid onClick={() => {setOpen(true)}}> Book Meeting </Button>
        <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Modal.Header>When do you want to book?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <Form.Input
                                placeholder=" Insert Booking Name"
                                label="Booking Name"
                                value={ba_id}
                                onChange={e => setba_id(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                fluid
                                name="Start time"
                                placeholder="Insert Start time"
                                label="Start time"
                                value={st_dt}
                                onChange={e => setst_dt(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                fluid
                                name="End time"
                                placeholder="Insert End time"
                                label="End time"
                                value={et_dt}
                                onChange={e => setet_dt(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input label='Room'>
                                <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setroom_id(e.target.value)}}>
                                    <option key={0} value={"0"}>Select Room</option>
                                    {rooms.map(item => {
                                        return (<option key={item.r_id} value={item.r_id}>{item.r_name}</option>)
                                    })}
                                </select>
                            </Form.Input>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                fluid
                                name="List of Emails
                                ( seperated by comma no spaces)"
                                placeholder=" Insert emails"
                                label="List of Emails
                                ( seperated by comma no spaces)"
                                value={invitee}
                                onChange={e => setinvitee(e.target.value)}

                            />
                        </Form.Field>
                        <Button content='Enter' icon='signup' size='big' onClick={() => (first()?sety(true): sett(true))}/>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>
        </Modal>
        <Modal
            centered={false}
            open={y}
            onClose={() => sety(false)}
            onOpen={() => sety(true)}
        >
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => sety(false)}>No</Button>
                <Button onClick={() => check()? setg(true):setz(true)}>Yes</Button>
            </Modal.Actions>
        </Modal>
        <Modal open ={z}
               onClose={() => setz(false)}
               onOpen={() => setz(true)}
        >
            <Modal.Header> There is a conflict in your booking, Please select another time or room.</Modal.Header>
            <Button fluid onClick={()=>setz(false)}>Ok</Button>
        </Modal>
        <Modal centered={false}
               open={g}
               onClose={() => setg(false)}
               onOpen={() => setg(true)}>
            <Modal.Header>You Have Booked a Room.</Modal.Header>
            <Modal.Actions>
                <Button onClick={() => returnallfalse()}>okay</Button>
            </Modal.Actions>
        </Modal>

        <Modal
            centered={false}
            open={sh}
            onClose={() => setlh(false)}
            onOpen={() => setlh(true)}
        >
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setlh(false)}>No</Button>
                <Button onClick={() => updatebookingcheck()}>Yes</Button>
            </Modal.Actions>
        </Modal>

        <Modal
            centered={false}
            open={its}
            onClose={() => setits(false)}
            onOpen={() => setits(true)}
        >
            <Modal.Header>Room is already booked in selected timeframe. Please select another timeframe.</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setits(false)}>OK</Button>
            </Modal.Actions>
        </Modal>

        <Button fluid onClick={()=>setfree(true)}>Show all free user in time frame</Button>
        <Modal
            centered={false}
            open={free}
            onClose={() => setfree(false)}
            onOpen={() => setfree(true)}
        >
            <Modal.Header> Please select  timeframe.</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form.Field>
                        <Form.Input
                            fluid
                            name="emails"
                            placeholder="Insert Emails"
                            label="List of Email  ( seperated by comma no spaces)"
                            value={invitee}
                            onChange={e => setinvitee(e.target.value)}
                        />
                    </Form.Field>
                    <p></p>
                    <Form.Field>


                          Insert date:&nbsp;
                        <DatePicker
                            onChange={(e) =>handlerdate(e)}
                            value={date}
                        />

                    </Form.Field>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => (handler2()?seta(true): sett(true))}>OK</Button>
            </Modal.Actions>
        </Modal>
        <Modal
            centered={false}
            open={userday}
            onClose={() => setuserday(false)}
            onOpen={() => setuserday(true)}
        >
            <Modal.Header> Please select  timeframe.</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form.Field>
                        <Form.Input
                            fluid
                            name="emails"
                            placeholder="Insert Email"
                            label=" Email  "
                            value={invitee}
                            onChange={e => setinvitee(e.target.value)}
                        />

                    </Form.Field>
                    <p></p>
                    <Form.Field>

                        Insert date:&nbsp;
                        <DatePicker
                            onChange={(e) =>handlerdate(e)}
                            value={date}
                        />
                        <br/><br/>
                    </Form.Field>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => (handler3()?seted(true): sett(true))}>OK</Button>
            </Modal.Actions>
        </Modal>
        <Modal
            centered={false}
            open={ed}
            onClose={() => seted(false)}
            onOpen={() => seted(true)}
        >
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    Please wait a few seconds
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => seted(false)}>No</Button>
                <Button onClick={() => getusername()}>Yes</Button>
            </Modal.Actions>
        </Modal>
        <Modal open ={hstd}
               onClose={() => sethstd(false)}
               onOpen={() => sethstd(true)}
        >
            <Modal.Header> The schedule  </Modal.Header>

                <Modal.Description>
                    {
                        listfr.length > 0 &&
                        <table style={{marginLeft: "auto", marginRight: "auto"}}>
                            <thead>
                            <tr>
                                <th style={{padding:"5px", border: "1px solid black"}} scope={"col"}>Start Time</th>
                                <th style={{padding:"5px", border: "1px solid black"}} scope={"col"}>End Time</th>
                                <th style={{padding:"5px", border: "1px solid black"}} scope={"col"}>Available?</th>
                                <th style={{padding:"5px", border: "1px solid black"}} scope={"col"}>The Room?</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                listfr.map(item => {
                                        return (
                                            <tr>
                                                <td style={{padding:"5px", border: "1px solid black"}}>{TypeTime(item.start.getHours(), item.start.getMinutes())}</td>
                                                <td style={{padding:"5px", border: "1px solid black"}}>{TypeTime(item.end.getHours(), item.end.getMinutes())}</td>
                                                <td style={{padding:"5px", border: "1px solid black"}}>{item.b_name==="unavailable"?"No": "Yes"}</td>
                                                <td style={{padding:"5px", border: "1px solid black"}}>{item.r_name==="n/a"?'No Room':item.r_name}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                            </tbody>
                        </table>
                    }

                </Modal.Description>
        <Modal.Actions>
            <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
        </Modal.Actions>
        </Modal>
        <Modal
            centered={false}
            open={a}
            onClose={() => seta(false)}
            onOpen={() => seta(true)}
        >
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => seta(false)}>No</Button>
                <Button onClick={() => getfreeinviteetime()}>Yes</Button>
            </Modal.Actions>
        </Modal>
        <Button fluid onClick={() => {setmark(true)}}> Mark as unavailable</Button>
        <Modal
            centered={false}
            open={mark}
            onClose={() => setmark(false)}
            onOpen={() => setmark(true)}
        >
            <Modal.Header>When do you want to be unavailable?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Form.Field>
                            <Form.Input
                                fluid
                                name="Start time"
                                placeholder="Insert Start time"
                                label="Start time"
                                value={st_dt}
                                onChange={e => setst_dt(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                fluid
                                name="End time"
                                placeholder="Insert End time"
                                label="End time"
                                value={et_dt}
                                onChange={e => setet_dt(e.target.value)}
                            />
                        </Form.Field>
                        <Button content='Enter' icon='signup' size='big' onClick={() => (first1()?setavail(true): sett(true))}/>
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            </Modal.Actions>
        </Modal>
        <Modal
            centered={false}
            open={unavail}
            onClose={() => setavail(false)}
            onOpen={() => setavail(true)}
        >
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setavail(false)}>No</Button>
                <Button onClick={() => unavailablecheck()}>Yes</Button>
            </Modal.Actions>
        </Modal>
        <Modal centered={false}
               open={book}
               onClose={() => setbook(false)}
               onOpen={() => setbook(true)}>
            <Modal.Header>You are unavailable at this hour, {st_dt} to {et_dt}.</Modal.Header>
            <Modal.Actions>
                <Button onClick={() => returnallfalse()}>okay</Button>
            </Modal.Actions>
        </Modal>
        <Container fluid>

            <Button fluid onClick={()=>setbooking(true)}> Update Your Bookings </Button>

            <Modal open={booking}
                   onClose={() => setbooking(false)}
                   onOpen={() => setbooking(true)}>
                <Modal.Header>What do you want to change of your booking?</Modal.Header>
                <Modal.Actions>
                    <Button onClick={()=>setupdatebooking(true)}>Update Booking</Button>
                    <Button onClick={()=>setdeletebooking(true)}> Cancel Booking </Button>
                    <Button onClick={() => setbooking(false)}>cancel</Button>
                </Modal.Actions>>

            </Modal>
            <Modal open={updatebooking}
                   onClose={() => setupdatebooking(false)}
                   onOpen={() => setupdatebooking(true)}>
                <Modal.Header>What do you want to change of booking?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <Form.Input label='Booking Name'>
                                    <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setba_id(e.target.value)}}>
                                        <option key={0} value={"0"}>Select Booking Name</option>
                                        {s.map(item => {
                                            return (<option key={item.b_id} value={item.b_id}>{item.b_name},{item.st_dt}-{item.et_dt}</option>)
                                        })}
                                    </select>

                                </Form.Input>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="New name"
                                    placeholder="Insert Name"
                                    label="New Name"
                                    value={New}
                                    onChange={e => setnew(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="Start time"
                                    placeholder="Insert Start time"
                                    label="Start time"
                                    value={st_dt}
                                    onChange={e => setst_dt(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="End time"
                                    placeholder="Insert End time"
                                    label="End time"
                                    value={et_dt}
                                    onChange={e => setet_dt(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input label='Room'>
                                    <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setroom_id(e.target.value)}}>
                                        <option key={0} value={"0"}>Select Room</option>
                                        {rooms.map(item => {
                                            return (<option key={item.r_id} value={item.r_id}>{item.r_name}</option>)
                                        })}
                                    </select>
                                </Form.Input>
                            </Form.Field>
                           <Button onClick={()=> handler1()}>Enter </Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setupdatebooking(false)}>cancel</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={deletebooking}
                   onClose={() => setdeletebooking(false)}
                   onOpen={() => setdeletebooking(true)}>
                <Modal.Header>which booking do you want to delete?</Modal.Header>
                <Modal.Content>
                    <ModalDescription>
                        <Form.Field>
                            <Form.Input label='Booking Name'>
                                <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setba_id(e.target.value)}}>
                                    <option key={0} value={"0"}>Select Booking Name</option>
                                    {s.map(item => {
                                        return (<option key={item.b_id} value={item.b_id}>{item.b_name},{item.st_dt}-{item.et_dt}</option>)
                                    })}
                                </select>

                            </Form.Input>
                        </Form.Field>

                    </ModalDescription>

                </Modal.Content>
                <Modal.Actions>
                    <Button content='Confirm' onClick={()=> handler()}/>
                    <Button onClick={() => setdeletebooking(false)}>cancel</Button>
                </Modal.Actions>>

            </Modal>
            <Modal open={unavailable}
                   onClose={() => setavailable(false)}
                   onOpen={() => setavailable(true)}>
                <Modal.Header>What do you want to change of your free time?</Modal.Header>
                <Modal.Actions>
                    <Button onClick={()=>setupunavailable(true)}>Update Unavailibility</Button>
                    <Button onClick={() => setdeleteupunavailable(true)}> Cancel Your Unavailibility </Button>
                    <Button onClick={() => setavailable(false)}>cancel</Button>
                </Modal.Actions>>

            </Modal>
            <Modal open={updateunavailable}
                   onClose={() => setupunavailable(false)}
                   onOpen={() => setupunavailable(true)}>
                <Modal.Header>What do you want to change of your free time?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form.Field>
                            <Form.Input label='unavailable timeframe'>
                                <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setun(e.target.value)}}>
                                    <option key={0} value={"0"}>unavailable timeframe</option>
                                    {ts.map(item => {
                                        return (<option key={item.pa_id} value={item.pa_id}>{item.st_dt}-{item.et_dt}</option>)
                                    })}
                                </select>

                            </Form.Input>
                        </Form.Field>
                        <Form>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="Start time"
                                    placeholder="Insert Start time"
                                    label="Start time"
                                    value={st_dt}
                                    onChange={e => setst_dt(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="End time"
                                    placeholder="Insert End time"
                                    label="End time"
                                    value={et_dt}
                                    onChange={e => setet_dt(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setupunavailable(false)}>cancel</Button>
                    <Button content='Confirm'
                            onClick={() => {check()? setOpen(true):setr(true)} }/>
                </Modal.Actions>
            </Modal>
            <Modal open={room}
                   onClose={() => setroom(false)}
                   onOpen={() => setroom(true)}>
                <Modal.Header>What time frame do you want to check?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="Start time"
                                    placeholder="Insert Start time"
                                    label="Start time"
                                    value={st_dt}
                                    onChange={e => setst_dt(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="End time"
                                    placeholder="Insert End time"
                                    label="End time"
                                    value={et_dt}
                                    onChange={e => setet_dt(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Confirm'
                            onClick={() => {gettherooms()} }/>
                </Modal.Actions>
            </Modal>
            <Modal open ={ho}
                   onClose={() => setho(false)}
                   onOpen={() => setho(true)}
            >
                <Modal.Header> The rooms are </Modal.Header>
                <Modal.Description>
                    {
                        listfree.length > 0 &&
                        <table style={{marginLeft: "auto", marginRight: "auto"}}>
                            <thead>
                            <tr>
                                <th style={{padding:"5px", border: "1px solid black"}} scope={"col"}>The Rooms</th>

                            </tr>
                            </thead>

                            <tbody>
                            {
                                listfree.map(item => {
                                        return (
                                            <tr>
                                                <td style={{padding:"5px", border: "1px solid black"}}>{item.r_name}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                            </tbody>
                        </table>
                    } </Modal.Description>
                <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
            </Modal>
            <Modal open={r}
                   onClose={() => setr(false)}
                   onOpen={() => setr(true)}
            >
                <Modal.Header>Are you sure?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setr(false)}>No</Button>
                    <Button onClick={() => updateunavailablecheck()&& setb(true)}>Yes</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={b}
                   onClose={() => setb(false)}
                   onOpen={() => setb(true)}>
                <Modal.Header>You have updated your unavailable timeslot</Modal.Header>
                <Modal.Actions>
                    <Button onClick={() => returnallfalse()}>Ok</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={he}
                   onClose={() => sethe(false)}
                   onOpen={() => sethe(true)}>
                <Modal.Header>You have updated your booking </Modal.Header>
                <Modal.Actions>
                    <Button onClick={() => returnallfalse()}>Ok</Button>
                </Modal.Actions>
            </Modal>
            <Modal open={deleteunavailable}
                   onClose={() => setdeleteupunavailable(false)}
                   onOpen={() => setdeleteupunavailable(true)}>
                <Modal.Header>Which free time do you want to delete?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form.Field>

                            <Form.Input label='unavailable timeframe'>
                                <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setun(e.target.value)}}>
                                    <option key={0} value={"0"}>unavailable timeframe</option>
                                    {ts.map(item => {
                                        return (<option key={item.pa_id} value={item.pa_id}>{item.st_dt}-{item.et_dt}</option>)
                                    })}
                                </select>

                            </Form.Input>
                        </Form.Field>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setdeleteupunavailable(false)}>cancel</Button>
                    <Button onClick={()=>  deleteunavailablegcheck()}>Confirm</Button>
                </Modal.Actions>>
            </Modal>
            <Modal open ={und}
                   onClose={() => setund(false)}
                   onOpen={() => setund(true)}
            >
                <Modal.Header> You have deleted a unavailable time slot</Modal.Header>
                <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
            </Modal>
            <Modal open ={delebook}
                   onClose={() => setdelebook(false)}
                   onOpen={() => setdelebook(true)}
            >
                <Modal.Header> You have deleted a booking time slot</Modal.Header>
                <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
            </Modal>
            <Modal open ={h}
                   onClose={() => seth(false)}
                   onOpen={() => seth(true)}
            >
                <Modal.Header> time slot</Modal.Header>
                <Modal.Description> {

                    listfree.map(item =>{
                    return(<p><header1>{item.free_start}-{item.free_end}</header1></p>)
                })
                } </Modal.Description>
                <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
            </Modal>
            <Modal open ={je}
                   onClose={() => setje(false)}
                   onOpen={() => setje(true)}
            >
                <Modal.Header> Everyone is free on that day at anytime</Modal.Header>
                <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
            </Modal>

            <Modal open={hosted}
                   onClose={() => sethosted(false)}
                   onOpen={() => sethosted(true)}>
                <Modal.Header>What do you want to look up?</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Input label='Room'>
                                <select defaultValue={"0"} style={{textAlign: "center"}} onChange={(e) => {setroom_id(e.target.value)}}>
                                    <option key={0} value={"0"}>Select Room</option>
                                    {rooms.map(item => {
                                        return (<option key={item.r_id} value={item.r_id}>{item.r_name}</option>)
                                    })}
                                </select>
                            </Form.Input>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="Start time"
                                    placeholder="Insert Start time"
                                    label="Start time"
                                    value={st_dt}
                                    onChange={e => setst_dt(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    name="End time"
                                    placeholder="Insert End time"
                                    label="End time"
                                    value={et_dt}
                                    onChange={e => setet_dt(e.target.value)}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button content='Confirm'
                            onClick={() => {gethost()} }/>
                </Modal.Actions>
            </Modal>
            <Modal open ={ost}
                   onClose={() => setost(false)}
                   onOpen={() => setost(true)}
            >
                <Modal.Header>  {host.length===0? "The room is free" :`The host in that time is ${host[0]}_${host[1]}`} </Modal.Header>

                <Button fluid onClick={()=>returnallfalse()}>Ok</Button>
            </Modal>
            <Button fluid onClick={()=>setavailable(true)} > Update Your Unavailibility</Button>
            <Button fluid onClick={()=>setuserday(true)} > Get a user Schedule</Button>
            <Button fluid onClick={()=>setroom(true)} > Get available room in time frame</Button>
            <Button fluid onClick={()=>sethosted(true)} > Get host of room in time frame</Button>
        </Container>
    </Container>


}
export default BookMeeting;
