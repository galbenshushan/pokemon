export const setItemToLocalStorage = (str, value) =>{ localStorage.setItem(str, JSON.stringify(value));
}
export const getItemFromLocalStorage = (str) => JSON.parse(localStorage.getItem(str));

export const deleteFromLocalStorage = (str) => localStorage.removeItem(`${str}`);