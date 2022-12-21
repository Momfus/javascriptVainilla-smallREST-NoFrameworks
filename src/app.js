import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const appComponent = async (element) => {

   await usersStore.loadingNextPage();

   console.log( usersStore.getUsers() );

   renderTable( element );
   
};

