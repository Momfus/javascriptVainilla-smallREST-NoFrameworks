
import modalHtml from './render-modal.html?raw'; // The raw properties is one thing that Vite ask for a html import
import './render-modal.css';

let modal, form; // HTML elements

export const showModal = () => {
   
   modal?.classList.remove('hide-modal');

};

export const hideModal = () => {

   modal?.classList.add('hide-modal');
   form?.reset();

};

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
      const userLike = {};

      for( const [key, value] of formData) {
         
         if( key === 'balance') {
            userLike[key] = +value; // Same wat as Number(value), transform the value to a Number type
            continue;
         }

         if( key === 'isActive') {
            userLike[key] = (value === 'on') ? true : false;
            continue;
         }

         userLike[key] = value;

      }

      // console.log(userLike);

      await callback(userLike);

      hideModal();

   });

   element.append( modal );

};