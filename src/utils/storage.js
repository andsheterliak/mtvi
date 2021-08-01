export const setLS = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getLS = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
