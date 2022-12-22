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

/**
 * 
 * @param {User} user 
 */
const onUserChange = (updatedUser) => {
   
   let wasFound = false;

   state.users = state.users.map( user => {
      if( user.id === updatedUser.id) {
         wasFound = true;
         return updatedUser;
      }

      return user
   });

   // If there is less than 10 users in the current page; insert in this one (and must not be a edit one)
   if( state.users.length < 10 && !wasFound ) {
      state.users.push( updatedUser );
   }

};

const reloadPage = async() => {

   const users = await loadUsersByPage(state.currentPage );

   if( users.length === 0){
      await loadPreviousPage();
      return;
   }
   state.users = users;

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