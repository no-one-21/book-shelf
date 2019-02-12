import axios from 'axios';

export function getBooks(limit=10,start=0,order='asc',list=''){
     const request =  axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                        .then(response=>{
                            if(list){
                               return [...list,...response.data] 
                            }else{
                                return response.data 
                            }})

     return{
         type:'GET_BOOKS',
         payload:request
     }
}


export function  getBookWithReviewer (id){
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch)=>{
        request.then(({data})=>{
            let book = data;
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
            .then(({data})=>{

                let response = {
                    book,
                    reviewer:data
                }

                dispatch({
                    type:'GET_BOOK_W_REVIEW',
                    payload:response
            })
            //using redux thunk here and displaying everything once we wanted to , before dispatching type and payload
           
            })
        })
    }
}


export function clearBookWithReviewer(){
    return{
        type:'CLEAR_BOOK_W_REVIEWER',
        payload:{
           book:{},
           revieer:{} 
        }
    }
}

export function loginUser({email,password}){

    const request= axios.post('/api/login',{email,password})
                    .then(response=>response.data)
    return{
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request=axios.get('/api/auth')
                    .then(response=>response.data)

    return{
        type:'USER_AUTH',
        payload:request
    }
}