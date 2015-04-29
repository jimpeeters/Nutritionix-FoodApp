$(document).on("click", ".alert", function(e) {
   bootbox.dialog({
  message: "I am a custom dialog",
  title: "Custom title",
  buttons: {
    success: {
      label: "Success!",
      className: "btn-success",
      callback: function() {
        Example.show("great success");
      }
    },
    danger: {
      label: "Danger!",
      className: "btn-danger",
      callback: function() {
        Example.show("uh oh, look out!");
      }
    },
    main: {
      label: "Click ME!",
      className: "btn-primary",
      callback: function() {
        Example.show("Primary button");
      }
    }
  }
});
});