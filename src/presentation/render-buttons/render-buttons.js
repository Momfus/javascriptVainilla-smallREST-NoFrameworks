import './render-buttons.css';
import usersStore from "../../store/users-store";
import { renderTable } from '../render-table/render-table';


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {

   const nextButton = document.createElement('button');
   nextButton.innerText = ' Next > ';

   const prevButton = document.createElement('button');
   prevButton.innerText = '< Prev ';


   const currentPageLabel = document.createElement('span');
   currentPageLabel.id = 'current-page';
   currentPageLabel.innerHTML = usersStore.getCurrentPage();

   element.append( prevButton, currentPageLabel, nextButton);

   // Listeners
   nextButton.addEventListener('click', async() => {

      await usersStore.loadNextPage();
      currentPageLabel.innerText = usersStore.getCurrentPage();
      renderTable( element );

   });


   prevButton.addEventListener('click', async() => {

      await usersStore.loadPreviousPage();
      currentPageLabel.innerHTML = usersStore.getCurrentPage();
      renderTable(element);

   });

};