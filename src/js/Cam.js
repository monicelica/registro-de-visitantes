(() => { //  función anónima para evitar las variables globales.
  let streaming = false,
    video = document.querySelector('#video'),
    canvas = document.querySelector('#canvas'),
    startbutton = document.querySelector('#startbutton'),
    firstSec = document.getElementById('section1');
  secondSec = document.getElementById('section2');
  terminar = document.getElementById('terminar');
  width = 320,
  height = 0;
  // obtener video, compatibilidad de navegadores
  navigator.getMedia = (navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);
  // Le solicitamos al navegador que nos dé un video sin audio y obtenemos una secuencia stream
  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    (stream) => {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        let vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    (err) => {
      console.log('An error occured! ' + err);
    }
  );
  // Luego necesitamos configurar el tamaño del video a las dimensiones deseadas.
  video.addEventListener('canplay', (ev) => {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);
  // En esta función, reestablecemos el tamaño del canvas a las dimensiones del video
  // el cual lo sustituye y tenemos un marco del video, el cual se copia al canvas.
  // Luego necesitamos convertir los datos del canvas en datos tipo URL con un encabezado PNG,
  // y establecer el src de la fotografía a este mismo url.
  takepicture = () => {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    firstSec.classList.add('ocultar');
    secondSec.classList.remove('ocultar');
  };
  // capturar una imagen, ahora necesitamos capturar una imagen utilizando (canvas).
  // Asignamos un manejador de eventos al botón de inicio para llamar a la función de takepicture.
  startbutton.addEventListener('click', (ev) => {
    takepicture();
    ev.preventDefault();
    terminar.classList.remove('ocultar');
  }, false);

 terminar.addEventListener('click', event => {
   swal({
     title: 'Registro exitoso',
     text: 'Tus datos se han registrado correctamente',
     icon: 'success',
     button: 'Ok',
   });
   let btn = document.getElementsByClassName('swal-button')
   btn[0].addEventListener('click', event => {
    location.href = '../index.html';
   })
  })
})();
