import {LOGIN,LOGOUT,ADDNEWBILL} from '../actions/appActions';
const initialState = {
    name:'',
    id:'',
    bills:[]
}

const appReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN:{
            console.log("reducer",state.payload)
            const newState = action.payload;
            return {...newState,bills:[]};
        }
        case LOGOUT:{
            return {name:"",id:"",bills:[]}
        }
        case ADDNEWBILL:{
            const updatedBillsList = [...state.previousBills,action.payload];
            return {...state,bills:updatedBillsList};
        }
        default: return state;
    }
}

export default appReducer;