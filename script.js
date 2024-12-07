const form = document.getElementById('image-upload-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('image-input');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.message === 'File uploaded successfully') {
      console.log('File uploaded successfully!');
    } else {
      console.error('Error uploading file:', data.message);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
  }
});