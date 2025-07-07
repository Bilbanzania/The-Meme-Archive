import { supabase } from './supabaseClient.js';

// Display media content
export async function displayMedia() {
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