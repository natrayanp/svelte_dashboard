import  read_write_form, {disable_enable_elements} from './formdiasable';


export let disableform = (form) => read_write_form(form);
export let enableform = (form) => read_write_form(form,false);
export let disableelement = (ele) => disable_enable_elements(ele);
export let enableelement = (ele) => disable_enable_elements(ele,false);

