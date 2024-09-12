// Variables
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadLink = document.getElementById("download");

// Usse API provided below and generates a QR Code using the qrText.value inputed by the user
function generateQR() {
    let qrData = qrText.value;
    let qrCodeURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrData);

    qrImage.src = qrCodeURL;
    imgBox.classList.add("show-img");

    // Update the download link with the QR code URL
    downloadLink.dataset.url = qrCodeURL;
}

// Downloads the QR code using blob api
function downloadQR(event) {
    event.preventDefault(); // Prevent default link behavior, because <a> acts as a link and this prevents that

    let url = downloadLink.dataset.url; // Retrieves the QR Code stored in dataset.url
    if (url) { // Makes sure there is a URL
        fetch(url) // Retrieve the image
            .then(response => response.blob()) // Converts response into a blob which is raw data - "Blob Api"
            .then(blob => {
                let blobUrl = URL.createObjectURL(blob); // Temporary URL directed to blob
                let a = document.createElement('a'); // creates <a> element
                a.href = blobUrl;   // Sets that element to the blobUrl
                a.download = "qr-code.png";
                document.body.appendChild(a); 
                a.click(); // Simulates a click
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl); // Clean up
            })
            .catch(error => console.error('Error downloading the image:', error)); // Error catcher
    } else {
        alert("Generate a QR code first."); // Must generate a QR code
    }
}
