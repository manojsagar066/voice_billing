import {LOGIN,LOGOUT,ADDNEWBILL} from '../actions/appActions';
const initialState = {
    name:'',
    id:'',
    bills:[]
}

const appReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN:{
            const newState = action.payload;
            console.log("reducer", { ...newState, bills: [] });
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