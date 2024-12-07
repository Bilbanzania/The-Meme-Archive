const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { createProxyMiddleware } = require('http-proxy-middleware');
const multer = require('multer');

const app = express();

const supabaseUrl = supabase.env('SUPABASE_URL');
const supabaseKey = supabase.env('SUPABASE_KEY');
const supabase = createClient(supabaseUrl, supabaseKey);

const s3BucketName = 'memes';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const { data, error } = await supabase.storage
      .from('memes')
      .upload(file.originalname, file.buffer);

    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error uploading file' });
    } else {
      res.send({ message: 'File uploaded successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading file' });
  }
});

app.use(
  '/supabase',
  createProxyMiddleware({
    target: supabaseUrl,
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${supabaseKey}`,
    },
  })
);

app.listen(9001, () => {
  console.log('Proxy server listening on port 9001');
});

// Display media content
async function displayMedia() {
  const { data, error } = await supabase.storage
    .from('memes')
    .list('');

  if (error) {
    console.error(error);
    return;
  }

  const mediaViewer = document.querySelector('.media-viewer');
  if (mediaViewer) {
    mediaViewer.innerHTML = '';
    data.forEach(item => {
      const mediaElement = document.createElement('img');
      mediaElement.src = item.url;
      mediaElement.alt = 'Media content';
      mediaViewer.appendChild(mediaElement);
    });
  } else {
    console.log('Media viewer element not found');
  }
}

async function init() {
  // Get the media viewer and playlist container elements
  const mediaViewer = document.getElementById('media-viewer');
  const playlistContainer = document.getElementById('playlist-content');

  // Get the memes bucket
  const memesBucket = supabase.storage.from('memes');

  // Fetch the image data from the memes bucket
  async function fetchImages() {
    const { data, error } = await memesBucket.listFiles();
    if (error) {
      console.error(error);
    } else {
      return data;
    }
  }

  // Render the image data in the playlist
  async function renderPlaylist() {
    const images = await fetchImages();
    images.forEach(async (image) => {
      const imageUrl = await memesBucket.getPublicUrl(image.name);
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl.publicUrl;
      imageElement.alt = image.name;
      imageElement.addEventListener('click', async () => {
        await updateMediaViewer(imageUrl);
      });
      playlistContainer.appendChild(imageElement);
    });
  }

  // Update the media viewer with the selected image
  async function updateMediaViewer(imageUrl) {
    mediaViewer.src = imageUrl.publicUrl;
    mediaViewer.alt = image.name;
  }

  // Call the renderPlaylist function when the page loads
  document.addEventListener('DOMContentLoaded', async () => {
    await renderPlaylist();
  });

  // Add event listener to upload button
  const uploadButton = document.getElementById('upload-button');
  if (uploadButton) {
    uploadButton.addEventListener('click', () => {
      const fileInput = document.getElementById('file-input');
      if (fileInput) {
        fileInput.click();
      }
    });
  }

  // Add event listener to file input
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      try {
        const { data, error } = await supabase.storage
          .from('memes')
          .upload(file.name, file);

        if (error) {
          console.error(error);
        } else {
          console.log('File uploaded successfully');
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
}

init();