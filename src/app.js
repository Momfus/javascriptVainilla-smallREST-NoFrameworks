import usersStore from "./store/users-store";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const appComponent = async (element) => {

   element.innerHTML = 'Loading...';
   await usersStore.loadingNextPage();

   console.log( usersStore.getUsers() );
};

