
import modalHtml from './render-modal.html?raw'; // The raw properties is one thing that Vite ask for a html import
import './render-modal.css';

let modal;

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModal = (element) => {

   if( modal ) return;

   modal = document.createElement('div');
   modal.innerHTML = modalHtml;
   modal.className = 'modal-container hide-modal';

   element.append( modal );

};