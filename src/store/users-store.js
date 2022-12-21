import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-byPage";

const state = {
   currentPage: 0,
   user: [],
};

// Methods
const loadingNextPage = async() => {
   const users = await loadUsersByPage(state.currentPage++);

   if( users === 0) { // No charge next page if there no more users in that one
      return;
   }

   state.currentPage += 1;
   state.users = users;

   

};

const loadPreviousPage = async() => {
   throw new Error('No implemented');
};

const onUserChange = () => {
   throw new Error('No implemented');
};

const reloadPage = () => {
   throw new Error('No implemented');
};


export default {
   loadingNextPage,
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