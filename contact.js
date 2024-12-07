const form = document.getElementById('contact-form');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const message = messageInput.value;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('message', message);

  const response = await fetch('/contact', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.message === 'Message sent successfully') {
    console.log('Message sent successfully!');
  } else {
    console.error('Error sending message:', data.error);
  }
});