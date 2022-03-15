/* eslint-disable react/jsx-pascal-case */
//React Stuff
import React, { useState, } from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
//CSS
import './App.less';
//Authentication
//import auth from './utils/auth';
//Components

import CardList from './components/CardList/CardList';
import ChatList from './components/ChatList/ChatList';
//import SwipeButtons from './components/SwipeButtons/SwipeButtons';
import { ParentForm } from './components/Form/Create_Acc_Parent/ParentForm';
//import ImageGallery from './components/temp/ImageGallery';
import SignUp_Login from './components/SignUp_Login/SignUp_Login';
import Logout from './components/Logout/Logout';

//Creating Context
export const mainContext = React.createContext<AppContextInterface | null>(
  null
);

export interface AppContextInterface {
  users: Users[];
  setUsers: (users: Users) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

//TODO:
//  Create Login / Register page, linking to home route or account creation
//  integrate express sessions for session authentication
//  -Finish account creation form. Create update state functions on submit
//  -Acc. creation form: Create api service for cloudinary user images and audios
//  -Acc creation form: create api service for posting user to DB
//  -Add proper routes for user profile edit
//  -Add route for user create profile (first time)
//  -Add proper route for individual chat
//  Chat List: Make chats function properly. Create idividual chat screen with websockets
//  Profile info : Create detailed profile info comps (matched + unmatched) for displaying user profiles
//  MATCH: create Match functionality!

type Users = typeof initialArray;
const initialArray: [] = [];

type User = typeof initialUser;
const initialUser: {} = {};

function App() {
  const [users, setUsers] = useState<Users[]>([]); //will be arr of user objs from DB
  //const initialAuthState = auth.isAuthenticated(); //starts at false
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  return (
    <div className="App">
      <mainContext.Provider
        value={{
          users,
          setUsers,
          isAuthenticated,
          setIsAuthenticated,
          currentUser,
          setCurrentUser,
        }}
      >
        <Router>
          <Routes>
            {/* Temp route for dev testing */}
            {/* <Route path="/gallery" element={<ImageGallery />}></Route> */}
            {/* Route for login */}
            <Route path="/login" element={<SignUp_Login />}></Route>
            {/* Route for Logout */}
            <Route path="/logout" element={<Logout />}></Route>
            {/* Chat with particular user */}
            <Route
              path="/chat/:person"
              element={
                <>
                  {/* <Header backButton="/chat" /> */}
                  <h1>INDIVIDUAL CHAT!</h1>
                </>
              }
            />
            {/* Chat-list Route */}
            <Route
              path="/chat"
              element={
                <>
                  {/* <Header backButton="/" /> */}
                  <ChatList />
                </>
              }
            />
            {/* Route for account creation */}
            <Route path="/signup" element={<ParentForm />}></Route>
            {/* Home '/' Route */}
            <Route
              path="/"
              element={
                <>

                  <CardList />
                  {/* <SwipeButtons /> */}
                </>
              }
            />
          </Routes>
        </Router>
      </mainContext.Provider>
    </div>
  );
}

export default App;
