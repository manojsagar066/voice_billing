export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADDNEWBILL = 'ADDNEWBILL';

export const login = (loginData)=>{
    return {
        type: LOGIN,
        payload:loginData
    }
}
export const logout = (logoutData)=>{
return {
    type:LOGOUT,
    payload:logoutData
};
}
export const addnewbill = (newBillData)=>{
    return {
        type:ADDNEWBILL,
        payload:newBillData
    };
    }