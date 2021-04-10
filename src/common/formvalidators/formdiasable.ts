// Disables a form.
export default function read_write_form(form: any,disable=true) {
    var inputs = form.getElementsByTagName('input'),
        textareas = form.getElementsByTagName('textarea'),
        buttons = form.getElementsByTagName('button'),
        selects = form.getElementsByTagName('select');
    
        disable_enable_elements(inputs,disable);
        disable_enable_elements(textareas,disable);
        disable_enable_elements(buttons,disable);
        disable_enable_elements(selects,disable);
  }
  
  // Disables or enables a collection of form-elements.
  function disable_enable_elements(elements,disable=true) {
    var length = elements.length;
    while(length--) {
      elements[length].disabled = disable;
    }
  }