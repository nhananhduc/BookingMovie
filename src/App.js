import { createBrowserHistory } from 'history';
import Home from './pages/Home/Home';
import { Router, Switch, Route } from 'react-router-dom'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import CheckOut from './pages/CheckOut/CheckOut';
import News from './pages/News/News';
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Detail from './pages/Detail/Detail';
import CheckOutTemplate from './templates/CheckOutTemplate/CheckOutTemplate';
import { Suspense, lazy } from 'react'
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import AddNewUser from './pages/Admin/User/AddNewUser/AddNewUser'
import EditUser from './pages/Admin/User/EditUser/EditUser'
import Edit from './pages/Admin/Films/Edit/Edit';
import UserProfile from './pages/Admin/User/UserProfile';
import Event from './pages/Event/Event';
import VideoModal from './components/VideoModal/VideoModal';
const CheckOutTemplatelazy = lazy(() => import('./templates/CheckOutTemplate/CheckOutTemplate'))
export const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Loading />
        <VideoModal />
        <Switch>
          <HomeTemplate path='/' exact Component={Home} />
          <HomeTemplate path='/home' exact Component={Home} />
          <HomeTemplate path='/event' exact Component={Event} />
          <HomeTemplate path='/news' exact Component={News} />
          <HomeTemplate path='/detail/:id' exact Component={Detail} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <AdminTemplate path='/profile' exact Component={Profile} />
          {/* <Suspense fallback={<h1>LOADING...</h1>}>
            <CheckOutTemplatelazy exact path='/checkout/:id' Component={CheckOut} />
          </Suspense> */}
          <CheckOutTemplate path='/checkout/:id' exact Component={CheckOut} />
          <AdminTemplate path='/admin' exact Component={UserProfile} />
          <AdminTemplate path='/admin/users' exact Component={UserProfile} />
          <AdminTemplate path='/admin/users/addnewuser' exact Component={AddNewUser} />
          <AdminTemplate path='/admin/users/edituser/:id' exact Component={EditUser} />
          <AdminTemplate path="/admin/films" exact Component={Films} />
          <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
          <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
