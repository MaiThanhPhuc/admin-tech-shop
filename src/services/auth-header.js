function authHeader() {
  const user = localStorage.getItem('access_token');
  if (user) {
    return {
      Authorization: 'Bearer ' + user,
    };
  } else {
    return {};
  }
}

export default authHeader;
