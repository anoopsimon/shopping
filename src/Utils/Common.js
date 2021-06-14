// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return userStr;
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('accessToken') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('user');
}

export const updateCart =(items)=>{
  var currentCount = parseInt(sessionStorage.getItem("cartCount"));
  if (!currentCount) {
    currentCount=0;
}
sessionStorage.setItem('cartCount', currentCount+items);



}

export const getCart =()=> {

  console.log('Cart Count: '+sessionStorage.getItem('cartCount'));
  return sessionStorage.getItem('cartCount');

}


// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('accessToken', token);
  sessionStorage.setItem('user', user);
}