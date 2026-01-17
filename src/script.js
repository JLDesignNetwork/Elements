import { Elements } from './modules/elements.js';

$(() => {
  let JLDN = new Elements()

  // search document for all elements marked for rebuilding
  jQuery.each(JLDN.fetchElements(), (index, value) => {
    let el = $(value).prop("tagName")
    let el_id = $(value).attr("id")
    let el_class = $(value).attr("class")
    let el_options = $(value).data("options")
    //console.log(el_options);

    // build found elements
    JLDN.buildElement(el, el_id, el_class, el_options)
  })

  $(".meter > span").each(function () {
    $(this)
      .data("origWidth", ($(this).width() / $(this).parent().width()) * 100)
      .width(0)
      .animate(
        {
          width: $(this).data("origWidth") + "%",
        },
        3600,
      )
  })
})