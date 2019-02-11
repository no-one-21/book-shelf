import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/layout';
import BookView from './components/Books'


const Routes = () =>{
    return(
        <Layout>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/books/:id" exact component={BookView}/>
            </Switch>
        </Layout>
    );
}

export default Routes;