import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBook extends Component{

    state = {
        formdata : {
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:'',
        }
    }

    handleInput = (event,name) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData[name] = event.target.value
        this.setState({
            formdata:newFormData
        })
    }
 
    SubmitForm = (e) =>{
        //console.log("ownerid "+this.props.user.login.id);
        e.preventDefault();
        console.log("formdata is"+this.state.formdata);
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
           
        }))
        //at this point of time , we want add book to be dispatched , when user clicks on submitting the form
    }

    showNewBook = (book) =>(
        book.post ? 
            <div className="conf_link">
                Review Added <Link to={`/books/${book.bookId}`}>
                    Click the link to see the post 
                </Link>
            </div>
        :null
        
    )

    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    render(){
        console.log(this.props)
        return(
            <div className="rl_container article">
               <form onSubmit={this.SubmitForm}>
                    <h2> Add a Review</h2>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="name"
                            value={this.state.formdata.name}
                            onChange={(event)=>this.handleInput(event,'name')}
                            />
                    </div>

                    <div className="form_element">
                        <input 
                            type="text"
                            placeholder="Enter Author"
                            value={this.state.formdata.author}
                            onChange={(event)=>this.handleInput(event,'author')}
                            />
                    </div> 

                    <textarea 
                        value={this.state.formdata.review}
                        onChange={(event)=>this.handleInput(event,'review')}
                    />

                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter Pages"
                            value={this.state.formdata.pages}
                            onChange={(event)=>this.handleInput(event,'pages')}
                            />
                    </div>

                    <div className="form_element">
                        <select
                         value={this.state.formdata.rating}
                         onChange={(event)=>this.handleInput(event,'rating')}>
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>
                    <div className="form_element">
                        <input 
                            type="number"
                            placeholder="Enter Price"
                            value={this.state.formdata.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                            />
                    </div>
                    <button type="submit">Add Review</button>
                    {
                        this.props.books.newbook ?
                            this.showNewBook(this.props.books.newbook)
                        :null
                    }
               </form>
            </div>
        )
    } 
}

function mapStateToProps(state){
    console.log("state in add.js"+state)
    return{
        books:state.books
    }
}

export default connect(mapStateToProps)(AddBook);