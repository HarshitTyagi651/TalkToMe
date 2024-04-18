import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import chat from "./components/Chat/chat";
import login from "./components/Login/login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={login} />
          <Route path="/chat" Component={chat}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
