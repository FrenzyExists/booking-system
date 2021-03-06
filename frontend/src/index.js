import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import BookMeeting from "./BookMeeting";
import 'semantic-ui-css/semantic.min.css'
import UserView from "./UserView";
import Dashboard from "./Dashboard";
import SignUp from "./components/Registering/SignUp";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/Home" element={<HomePage/>} />
          <Route exact path="/" element={<HomePage/>} />
            <Route exact path="/UserView" element={<UserView/>} />
            <Route exact path="/Dashboard" element={<Dashboard/>} />
          <Route exact path="/BookMeeting" element={<BookMeeting/>} />
          <Route exact path="/signup" element={<SignUp/>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
