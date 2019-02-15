import React,{ PureComponent} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';

class EditBook extends PureComponent{

    state = {
        formdata : {
            _id:this.props.match.params.id,
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:'',
        }
    }
    deletePost = () =>{
        this.props.dispatch(deleteBook(this.props.match.params.id))  
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
        console.log(this.state.formdata)
        this.props.dispatch(updateBook(this.state.formdata))
        
    }
    redirectUser = () =>{
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        },1000)
    }

    

    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        let book = nextProps.books.book;
        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author:book.author,
                review:book.review,
                pages:book.pages,
                rating:book.rating,
                price:book.price
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    render(){
        
        let books=this.props.books
        console.log(books.book)
       // console.log("books"+books.book._id);
        return(
            <div className="rl_container article">
            {
                books.updateBook ? 
                <div className="edit_confirm">
                    post updates , <Link to={`/books/${books.book._id}`}>here is updated book</Link>
                </div>
                :null
            }
            {
                books.postDeleted ? 
                <div className="red_tag">
                    Post Deleted
                    {this.redirectUser()}
                </div> 
                    :null
            }
               <form onSubmit={this.SubmitForm}>
                    <h2> Edit Review</h2>

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
                    <button type="submit">Edit Review</button>
                        <div className="delete_post">
                            <div className="button"
                            onClick = {this.deletePost}
                            >
                                Delete Review
                            </div>
                        </div>
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

export default connect(mapStateToProps)(EditBook);