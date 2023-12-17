import './App.css';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Navbar from './components/Navigation/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/Auth/Register';
import { Toaster } from 'react-hot-toast';
import Quizes from './components/Pages/Quizes';
import QuizPage from './components/Pages/QuizPage';
import QuizResults from './components/Pages/QuizResults';
import LeaderBoard from './components/Pages/LeaderBoard';
import Profile from './components/Pages/Profile';
import Footer from './components/Navigation/Footer';
import Notfound from './components/Pages/NotFound';

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Toaster position="top-center"
          reverseOrder={false}
          gutter={8} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/quizes' element={<Quizes />} />
          <Route exact path='/quiz/:id' element={<QuizPage />} />
          <Route exact path='/result/quiz/:id' element={<QuizResults />} />
          <Route exact path='/leaderboard' element={<LeaderBoard />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
