document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const submitButton = document.getElementById('submit');
  const messageBox = document.getElementById('messageBox');

  // Handle file selection
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Selected file: ${file.name}`);
      alert(`You selected: ${file.name}`);
    } else {
      console.log('No file selected.');
    }
  });

  // Handle form submission
  submitButton.addEventListener('click', () => {
    const selectedFile = fileInput.files[0];
    const message = messageBox.value;

    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    if (!message) {
      alert('Please enter a message.');
      return;
    }

    // Simulate form submission (e.g., send to a server)
    console.log('Submitting form...');
    console.log(`File: ${selectedFile.name}`);
    console.log(`Message: ${message}`);
    alert('Form submitted successfully!');
  });
});
