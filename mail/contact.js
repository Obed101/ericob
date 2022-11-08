$(function() {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function() {
      alert(
        `Kindly fill out the required fields before submitting your message.\nPress ENTER to continue`
      );
    },
    submitSuccess: function($form, event) {
      event.preventDefault();
      let name = $("input#name").val();
      let email = $("input#email").val();
      let subject = $("input#subject").val();
      let message = $("textarea#message").val();
      $this = $("#sendMessageButton");
      // Changing the Send to Rotating icon
      $this.html(`<i class="fa fa-spinner fa-pulse"></i>`);

      $text = ` Send`
      $.ajax({
        url: "/mail/contact.php",
        method: "POST",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        cache: false,
        success: function() {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
            console.log("sent successful");
          $("#success > .alert-success").append(
            "<strong>Thank you " +
              name +
              ". Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");
          $("#contactForm").trigger("reset");
          $this.text($text);
        },
        error: function(e) {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              `<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;`
            )
            .append("</button>");
          $("#success > .alert-success").append(
            $("<strong>").html(
              "Sorry " +
                name +
                `, I can see you want to send me some message about ${subject}. But
it seems there is an error.
If this continues, kindly <a style="color:blue" href='https://wa.me/233274097985'>
chat me on WhatsApp</a> or
<a style="color:blue" href='mailto:obedamoako92@gmail.com?subject=
${subject}&body=${message}'>submit via mail</a>,
or call me on my number below`
            )
          );
          console.log("send not successful");
          $("#success > .alert-success").append("</div>");
          console.log(e);
          $("#contactForm").trigger("reset");
          $this.text($text);
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false);
          }, 1000);
          $this.text($text);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    }
  });

  $('a[data-toggle="tab"]').click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
// Hiding message for user to type
$("#name").focus(function() {
  $("#success").html("");
});
