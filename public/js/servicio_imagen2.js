$(function()  {
    let imagenUrl = '';

    $.cloudinary.config({ cloud_name: "sibo", api_key: "227225944236566"});

    let uploadButton = $("#btnSubirImagen2");

    uploadButton.on("click", function(e){

        cloudinary.openUploadWidget({cloud_name: "sibo", upload_preset: "siboCenfotec", tags: ['cgal']},

        function(error, result){
            if(error) console.log(error);

            let id = result[0].public_id;
            console.log(id);
            imagenUrl = "https://res.cloudinary.com/sibo/image/upload/" + id ;
            document.querySelector("#image_preview3").src = imagenUrl;
        console.log(imagenUrl);    
        });
    });
})

function processImage(id) {
    let options = {
        client_hints : true,
    };
    return $.cloudinary.url(id, options);
}