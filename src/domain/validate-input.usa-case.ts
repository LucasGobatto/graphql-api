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
  return value.indexOf('@') !== -1;
}

function hasDotCom(value: string): boolean {
  return value.indexOf('.com') !== -1;
}

function validEmail(value: string): boolean {
  const peace = value.replace('@', ' ').split(' ');
  return !!peace[0].length && !!peace[1]?.replace('.com', '')?.length;
}

function validatePassword(password: string): boolean {
  return hasNumber(password) && hasLetter(password) && validLength(password);
}

function validateEmail(email: string): boolean {
  return hasAt(email) && hasDotCom(email) && validEmail(email);
}

export const ValidatePasswordUseCase = {
  exec: validatePassword,
};
export const ValidateEmailUseCase = {
  exec: validateEmail,
};
