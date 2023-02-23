
/** On Load */

(function() {
  console.log('load');
  const fields = getAllFieldsAsArray();
  //  add blur listener to mark it as having been touched by the user
  fields.forEach(input => input.addEventListener('blur', markAsDirty));
})()

function getAllFieldsAsArray() {
  const fields = [ 'input', 'textarea', 'select' ];
  //  get arrays of each field types
  return fields.map(fieldType => Array.from(document.querySelectorAll(fieldType)))
  //  flatten the array
  .flat();
}

function markAsDirty(event) {
  event.target.classList.add('dirty');
}

function send(event) { 
  console.log('send');
  event.preventDefault();
}
