$(function () {
    emailjs.init('HIAcxnQDi0OJm6NIs'); // Replace with your actual User ID from emailjs.com
  
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // Handle submit errors if needed
      },
      submitSuccess: function ($form, event) {
        event.preventDefault();
        var name = $("input#name").val();
        var email = $("input#email").val();
        var subject = $("input#subject").val();
        var message = $("textarea#message").val();
  
        $this = $("#sendMessageButton");
        $this.prop("disabled", true);
  
        var templateParams = {
          name: name,
          email: email,
          subject: subject,
          message: message
        };
  
        // Send the email using emailjs.com
        emailjs.send('HIAcxnQDi0OJm6NIs', 'template_51w4i7l', templateParams)
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
            $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success').append('</div>');
            $('#contactForm').trigger("reset");
          }, function (error) {
            console.log('FAILED...', error);
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
            $('#success > .alert-danger').append($("<strong>").text("Oops! An error occurred while sending the message."));
            $('#success > .alert-danger').append('</div>');
            $('#contactForm').trigger("reset");
          })
          .finally(function () {
            $this.prop("disabled", false);
          });
      },
      filter: function () {
        return $(this).is(":visible");
      },
    });
  
    $("a[data-toggle=\"tab\"]").click(function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  
    $('#name').focus(function () {
      $('#success').html('');
    });
  });
  
