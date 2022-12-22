import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-byPage";

const state = {
   currentPage: 0,
   user: [],
};

// Methods
const loadNextPage = async() => {
   const users = await loadUsersByPage(state.currentPage + 1);

   if( users.length === 0) { // No charge next page if there no more users in that one
      return;
   }

   state.currentPage += 1;
   state.users = users;

   

};

const loadPreviousPage = async() => {
   
   if( state.currentPage === 1 ) {
      return;
   }

   state.currentPage -= 1;

   const users = await loadUsersByPage(state.currentPage);
   state.users = users;

};

const onUserChange = () => {
   throw new Error('No implemented');
};

const reloadPage = () => {
   throw new Error('No implemented');
};


export default {
   loadNextPage,
   loadPreviousPage,
   onUserChange,
   reloadPage,

   // Small helpers to export

   /**
    * 
    * @returns {User[]}
    */
   getUsers: () => [...state.users], // Get all data in the array
   
   /**
    * 
    * @returns  {Number}
    */
   getCurrentPage: () => state.currentPage,
};