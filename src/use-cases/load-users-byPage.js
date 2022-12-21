import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {Number} page 
 * @return
 */
export const loadUsersByPage = async ( page = 1) => {

   const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
   const res = await fetch(url);
   const data = await res.json();

   const user = data.map( userLike => localhostUserToModel(userLike) );

   console.log(user);
};