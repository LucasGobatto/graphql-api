function hasNumber(value: string): boolean {
  return value.search(/\d/) !== -1;
}

function hasLetter(value: string): boolean {
  return value?.search(/[a-zA-Z]/) !== -1;
}

function validLength(value: string): boolean {
  return value.length >= 7;
}

function hasAt(value: string): boolean {
  return value.indexOf("@") !== -1;
}

function hasDotCom(value: string): boolean {
  return value.indexOf(".com") !== -1;
}

function validEmail(value: string): boolean {
  const peace = value.replace("@", " ").split(" ");
  return !!peace[0].length && !!peace[1]?.replace(".com", "")?.length;
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return phoneRegex.test(phone);
}

export function validatePassword(password: string): boolean {
  return hasNumber(password) && hasLetter(password) && validLength(password);
}

export function validateEmail(email: string): boolean {
  return hasAt(email) && hasDotCom(email) && validEmail(email);
}
