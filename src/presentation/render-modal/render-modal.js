
import modalHtml from './render-modal.html?raw'; // The raw properties is one thing that Vite ask for a html import
import './render-modal.css';
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form; // HTML elements
let loadedUser = {};

/**
 * 
 * @param {String | Number} id 
 */
export const showModal = async ( id ) => {
   
   modal?.classList.remove('hide-modal');
   loadedUser = {};

   if( !id ) return;
   const user = await getUserById( id );
   setFormValue(user);

};

export const hideModal = () => {

   modal?.classList.add('hide-modal');
   form?.reset();

};

/**
 * 
 * @param {User} user 
 */
const setFormValue = ( user ) => {
   form.querySelector('[name="firstName"]').value = user.firstName;
   form.querySelector('[name="lastName"]').value = user.lastName;
   form.querySelector('[name="balance"]').value = user.balance;
   form.querySelector('[name="isActive"]').checked = user.isActive;

   loadedUser = user;
}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModal = (element, callback) => {

   if( modal ) return;

   modal = document.createElement('div');
   modal.innerHTML = modalHtml;
   modal.className = 'modal-container hide-modal';
   form = modal.querySelector('form');

   modal.addEventListener('click', (event) => {
      
      if( event.target.className !== 'modal-container' ) return;

      hideModal();

   });

   form.addEventListener('submit', async(event) => {
      
      event.preventDefault();  // Remove the propagation for default in the event when user select "submit"

      const formData = new FormData( form ); 
      const userLike = {...loadedUser};
      
      for( const [key, value] of formData) {
         
         if( key === 'balance') {
            userLike[key] = +value; // Same wat as Number(value), transform the value to a Number type
            continue;
         }

         userLike[key] = value;

      }

      // This need to be added manually because the check field disappear from the form when is unchecked
      userLike['isActive'] = ( formData.get('isActive') ) ? true : false;

      // console.log(userLike);

      await callback(userLike);

      hideModal();

   });

   element.append( modal );

};