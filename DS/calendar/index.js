jQuery(document).ready(function(){
    jQuery('.datetimepicker').datepicker({
        timepicker: true,
        language: 'en',
        range: true,
        multipleDates: true,
            multipleDatesSeparator: " - "
      });
    jQuery("#add-event").submit(function(){
        alert("Submitted");
        var values = {};
        $.each($('#add-event').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
        console.log(
          values
        );
    });
  });
  
  (function () {    

      jQuery(function() {
          // page is ready
          jQuery('#calendar').fullCalendar({
              themeSystem: 'bootstrap4',
              businessHours: false,

              editable: true,

              header: {
                  left: 'title',
                  right: 'prev,next'
              },
              events: [
                  { //이 정보들 받아오면 됩니다 icon은 circle 으로만 부탁해용..
                      title: '제몰',
                      description: '설명',
                      start: '2024-05-26',
                      end: '2024-05-27',
                      icon : "circle"
                  }
                  
              ],
              eventRender: function(event, element) {
                  if(event.icon){
                      element.find(".fc-title").prepend("<i class='fa fa-"+event.icon+"'></i>");
                  }
                },
              dayClick: function() {
                  jQuery('#modal-view-event-add').modal();
              },
              eventClick: function(event, jsEvent, view) {
                      jQuery('.event-icon').html("<i class='fa fa-"+event.icon+"'></i>");
                      jQuery('.event-title').html(event.title);
                      jQuery('.event-body').html(event.description);
                      jQuery('.eventUrl').attr('href',event.url);
                      jQuery('#modal-view-event').modal();
              },
          })
      });
    
  })(jQuery);
