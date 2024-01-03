export const saveLocalStorageData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const getStorageData = () => {
  const userData = localStorage.getItem("userData");
  return userData;
};

export const deleteStorageData = () => {
  localStorage.removeItem("userData");
};
