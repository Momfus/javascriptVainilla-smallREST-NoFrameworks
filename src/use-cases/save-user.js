//User creation and update

import { User } from "../models/user";



/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = ( userLike ) => {

   const user = new User( userLike );
   

   // TODO: Add create user
};