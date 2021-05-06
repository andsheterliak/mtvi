export const setLS = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getLS = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const setSS = (name, data) => {
  sessionStorage.setItem(name, JSON.stringify(data));
};

export const getSS = (name) => {
  return JSON.parse(sessionStorage.getItem(name));
};
