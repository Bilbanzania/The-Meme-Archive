const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    const fileName = file.name;
    const fileType = file.type;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
    });

    const data = await response.json();

    if (data.message === 'File uploaded successfully') {
        console.log('File uploaded successfully!');
    } else {
        console.error('Error uploading file:', data.error);
    }
});