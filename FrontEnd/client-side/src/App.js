import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import GoogleOAuth from './Screens/GoogleOAuth';
import UserProfile from './Screens/S1_UserProfile';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path = "/" element = {<GoogleOAuth/>}></Route>
          <Route exact path = "/user/profile" element ={<UserProfile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
