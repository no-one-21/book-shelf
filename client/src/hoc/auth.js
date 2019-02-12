import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from '../actions';


//function to return a class , on basis of whethet the current user has a valid token or not 

export default function(ComposedClass){
    class AuthenticationCheck extends Component {

        state={
            loading:true
        }

        componentWillMount(){
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps){
            this.setState({loading:false})

            if(!nextProps.user.login.isAuth){

            }else{
                
            }
        }

        render(){
            if(this.state.loading){
                return <div className="loader">Loading</div>
            }
            return(
               <ComposedClass {...this.props}/>
            )
        }
    }

    function mapStateToProps(state){
        return{
            user:state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck);
}