const regexCons = {
  email:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  password: /^.{10,16}$/
}

export const validateEmail = (email: string) => {
  return String(email).toLowerCase().match(regexCons.email)
}

export const validatePassword = (password: string) => {
  return String(password).toLowerCase().match(regexCons.password)
}

export const validatePhone = (password: string) => {
  return String(password).toLowerCase().match(regexCons.phone)
}
