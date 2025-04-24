var victime_success = function(numero){
    $.notify({
      // options
      title: '<i class="bi bi-check-lg"></i>&nbsp;&nbsp;<strong>Fiche enregistrée</strong>',
      message: "<br>Fiche bilan de la victime n°"+numero+" enregistrée avec succès !",
    icon: 'glyphicon glyphicon-ok',
      url: '',
      target: '_blank'
  },{
      // settings
      element: 'body',
      //position: null,
      type: "success",
      allow_dismiss: false,
      //newest_on_top: false,
      showProgressbar: false,
      placement: {
          from: "bottom",
          align: "right"
      },
      offset: 20,
      spacing: 20,
      z_index: 1031,
      delay: 4000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutRight'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
  });
}

var victime_error = function(numero){
    $.notify({
      // options
      title: '<i class="bi bi-x-octagon"></i>&nbsp;&nbsp;<strong>Erreur</strong>',
      message: "<br>Erreur lors de l'enregistrement",
    icon: 'glyphicon glyphicon-remove',
      url: '',
      target: '_blank'
  },{
      // settings
      element: 'body',
      //position: null,
      type: "danger",
      allow_dismiss: false,
      //newest_on_top: false,
      showProgressbar: false,
      placement: {
          from: "bottom",
          align: "right"
      },
      offset: 20,
      spacing: 20,
      z_index: 1031,
      delay: 4000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutRight'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
  });
}

var notification_error = function(message){
    $.notify({
      // options
      title: '<i class="bi bi-x-octagon"></i>&nbsp;&nbsp;<strong>Erreur</strong>',
      message: "<br>" + message,
    icon: 'glyphicon glyphicon-remove',
      url: '',
      target: '_blank'
  },{
      // settings
      element: 'body',
      //position: null,
      type: "danger",
      allow_dismiss: false,
      //newest_on_top: false,
      showProgressbar: false,
      placement: {
          from: "bottom",
          align: "right"
      },
      offset: 20,
      spacing: 20,
      z_index: 1031,
      delay: 4000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutRight'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
  });
}

var notification_success = function(title, message){
    $.notify({
      // options
      title: title,
      message: "<br>" + message,
    icon: 'glyphicon glyphicon-ok',
      url: '',
      target: '_blank'
  },{
      // settings
      element: 'body',
      //position: null,
      type: "success",
      allow_dismiss: false,
      //newest_on_top: false,
      showProgressbar: false,
      placement: {
          from: "bottom",
          align: "right"
      },
      offset: 20,
      spacing: 20,
      z_index: 1031,
      delay: 4000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutRight'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
  });
}

