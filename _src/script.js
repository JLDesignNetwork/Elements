const fetchElements = () => {
	return $(document).find('div.jldn-meter, div.jldn-button, button.jldn-button, code.jldn-code');
}
const buildElement = (el,el_id,el_class,el_options) => {
	const allowed_options = ['style','shape','width','height','fill-color','candystripe-color','theme'];
	const alt_allowed_options = $.merge(allowed_options, ['reveal-color','fill-size','animation-speed']);
	const selector = `${el.toLowerCase()}#${el_id}.${el_class}`;

  switch (el_class) {
    case 'jldn-meter':
      return `<div id="${el_id}" class="${el_class}" ${el_options? Object.keys(el_options).map(k => `${k}="${el_options[k]}"`).join(' ') : ''}></div>`;
    case 'jldn-button':
    case 'button.jldn-button':
      return `<div id="${el_id}" class="${el_class}" ${el_options? Object.keys(el_options).map(k => `${k}="${el_options[k]}"`).join(' ') : ''}></div>`;
    case 'code.jldn-code':
      return `<code id="${el_id}" class="${el_class}" ${el_options? Object.keys(el_options).map(k => `${k}="${el_options[k]}"`).join(' ') : ''}></code>`;
  }
  if (el_class == 'jldn-meter') console.log(alt_allowed_options);
}

$(() => {
	// search document for all elements marked for rebuilding
  jQuery.each(fetchElements(), (index,value) => {
  	let el = $(value).prop("tagName");
  	let el_id = $(value).attr('id');
    let el_class = $(value).attr('class');
	  let el_options = $(value).data('options');
    
  	//console.log([el,el_id,el_class,el_options]);
    
    // build found elements
    buildElement(el,el_id,el_class,el_options);
  });
});