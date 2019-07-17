import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faCartArrowDown,
  faTrash,
  faMinus,
  faPlus,
  faArrowRight,
  faArrowLeft,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

function composeIconLibrary() {
  library.add(faSearch, faCartArrowDown, faTrash, faMinus, faPlus, faArrowRight, faArrowLeft, faSpinner);
}

export default composeIconLibrary;
