
import {Link, useNavigate} from "react-router-dom";
import React, {Component, useState} from 'react';
import {
    Button,
    Divider,
    Form,
    Grid,
    Header,
    Modal,
    Segment,
    Tab
} from 'semantic-ui-react';
import './themes/Navbar.css';
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import Person from "./components/Person";

const api = axios.create({
    baseURL: 'https://booking-system-pika.herokuapp.com/pika-booking'
})

function HomePage() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [data] =  useState("");

       const handleChange = (event, newValue) => {
        setOpen(true);
    }
    const handleLogin = () => {
      navigate("./Dashboard")
    }

    const navigate = useNavigate();
    function check() {
        axios.post('https://booking-system-pika.herokuapp.com/pika-booking/persons/accounts', {"p_email": email, "p_password": password}).then(res=>
        {console.log(res.data)
            data = res.data
            console.log(data)
        })
        console.log(1)
        if (data== "Not Found"){
            return true
        }
        return false
    }
    return (

      <>
          <Navbar/>
          <Segment>
              <Header dividing textAlign="center" size="huge">Welcome to DB Demo</Header>
              <Modal
                centered={false}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              >
                  <Modal.Header>Invalid!</Modal.Header>
                  <Modal.Content>
                      <Modal.Description>
                          Your email or password is invalid please, try again.
                      </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                      <Button onClick={() => setOpen(false)}>OK</Button>
                  </Modal.Actions>
              </Modal>
              <Segment placeholder>

                  <Grid columns={2} relaxed='very' stackable>
                      <Grid.Column>
                          <Form>
                              <Form.Input
                                icon='email'
                                iconPosition='left'
                                label='Email'
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                              />
                              <Form.Input
                                icon='lock'
                                iconPosition='left'
                                label='Password'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                              />
                                  <Button content='Login' primary onClick={check()? handleChange:handleLogin}/>

                          </Form>
                      </Grid.Column>
                      <Grid.Column verticalAlign='middle'>
                          <Button content='Sign up' icon='signup' size='big' onClick={() => {navigate("./signup")}}/>
                      </Grid.Column>
                  </Grid>

                  <Divider vertical>Or</Divider>
              </Segment>
          </Segment>
      </>
    )

}


export default HomePage;
