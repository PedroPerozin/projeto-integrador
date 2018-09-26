export const isAuthenticated = () => {
   const isAuth = localStorage.getItem('token')
   if(isAuth){
       return true
   }
   else
   return false
};