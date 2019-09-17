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

export default class IconService {
  static composeIconLibrary() {
    library.add(faSearch, faCartArrowDown, faTrash, faMinus, faPlus, faArrowRight, faArrowLeft, faSpinner);
  }
}
