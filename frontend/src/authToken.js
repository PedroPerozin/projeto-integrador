var jwt = require('jsonwebtoken');


export const isAuthenticated = () => {
   const isAuth = localStorage.getItem('token')
   if(isAuth){
       return true
   }
   else
   return false
};

export function isAdmin(){
    var token = localStorage.getItem('token');
    var decoded = jwt.decode(token, {complete: true});
    return(decoded.payload.user.admin);
};

export function getEmail(){
    var token = localStorage.getItem('token');
    var decoded = jwt.decode(token, {complete: true});
    return(decoded.payload.user.email);
};

export function getId(){
    var token = localStorage.getItem('token');
    var decoded = jwt.decode(token, {complete: true});
    return(decoded.payload.user._id);
};