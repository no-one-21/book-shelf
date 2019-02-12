import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/layout';
import BookView from './components/Books'
import Login from './containers/Admin/login';
import Auth from './hoc/auth'

const Routes = () =>{
    return(
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home)}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/books/:id" exact component={BookView}/>
            </Switch>
        </Layout>
    );
}
//here we will be rendering home with a condition , that user will have to go Auth first 
export default Routes;