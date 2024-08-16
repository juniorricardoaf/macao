
$(function() {
    let imagenUrl = '';
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'sibo', api_key: '227225944236566'});

    // Upload button
    let uploadButton = $('#btnSubirImagenPatrocinador');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'sibo', upload_preset: 'siboCenfotec', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
             console.log(id);
            imagenUrl = 'https://res.cloudinary.com/sibo/image/upload/' + id ;
            document.querySelector('#image_preview4').src = imagenUrl;
          console.log(imagenUrl);
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}
