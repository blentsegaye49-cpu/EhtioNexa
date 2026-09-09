import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import './index.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Jobseeker from './Jobseeker';
import BlogDetails from './BlogDetail';
import Company from './Company';
import Login from './Login';
import Suc from './Suc';
import Dashboard from './Dashboard';
import Footer from './Footer';

function App() {
  return (
<Router>
<Navbar/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/jobseeker' element={<Jobseeker/>}/>
  <Route path="/blogs/:id" element={<BlogDetails/>}/>
  <Route path='/company' element={<Company/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/dashboard' element={<Dashboard/>}/>
  <Route path='/Suc' element={<Suc/>}/>
</Routes>
<Footer/>
</Router>
  );
}
export default App;
