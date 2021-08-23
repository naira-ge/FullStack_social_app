import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute/index';


//Pages
import Home from './pages/home/index';
import login from './pages/login/LogIn/index';
import Profile from './pages/profile/index';
import notFound from './pages/404/index';
import PostDetail from './pages/postDetail/index';


const App = () => {

    return(
        <Router>
            <Switch>
                <Route exact path="/" component={login} />
                
                <PrivateRoute exact path="/profile/:username">
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/home">
                    <Home />
                </PrivateRoute>
                <PrivateRoute exact path="/post/:pId">
                    <PostDetail />
                </PrivateRoute>
                
                <Route path="*" component = {notFound} />
            </Switch>
        </Router>
    ) 
}


export default App;

