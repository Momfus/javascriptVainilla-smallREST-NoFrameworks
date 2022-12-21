import { loadUsersByPage } from "../use-cases/load-users-byPage";

const state = {
   currentPage: 0,
   user: [],
};

// Methods
const loadingNextPage = async() => {
   await loadUsersByPage(state.currentPage++);
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
   getUser: () => [...state.users], // Get all data in the array
   getCurrentPage: () => state.currentPage,
};