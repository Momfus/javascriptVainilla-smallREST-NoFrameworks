import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const appComponent = async (element) => {

   await usersStore.loadNextPage();

   // console.log( usersStore.getUsers() );

   renderTable( element );
   renderButtons( element );
   renderAddButton( element );
   
   renderModal( element,  async( userLike ) => {
      const user = await saveUser( userLike );
      usersStore.onUserChange( user );
      renderTable(); // When the table is already created, there is no need to sent an element
   });

};

