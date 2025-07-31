exports.validateEmail = (email) => {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
};

exports.validatePassword = (password) => {
  // Minimum 6 characters
  return password && password.length >= 6;
};

exports.validateNotEmpty = (...fields) => {
  return fields.every((field) => field && field.trim() !== "");
};
