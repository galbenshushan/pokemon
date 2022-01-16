export const setItemToLocalStorage = (storageName, arr) =>{ localStorage.setItem(storageName, JSON.stringify(arr));
}
export const getItemFromLocalStorage = (storageName) => JSON.parse(localStorage.getItem(storageName));

export const deleteFromLocalStorage = (storageName) => localStorage.removeItem(`${storageName}`);