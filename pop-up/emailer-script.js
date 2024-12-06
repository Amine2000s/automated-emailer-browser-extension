
const regex = "/rows\[(\w+)\]/g";
const matches = [];

document.addEventListener('DOMContentLoaded', () => {



    const container = document.querySelector('.container');
    const settingsBtn = document.getElementById('settingsBtn');
    const backBtn = document.getElementById('back');
  
    // Show settings
    settingsBtn.addEventListener('click', () => {
      container.classList.add('shift-left');
    });
  
    // Back to main content
    backBtn.addEventListener('click', () => {
      container.classList.remove('shift-left');
    });
 



  const fileInput = document.getElementById('fileInput');
  const submitButton = document.getElementById('submit');
  const messageBox = document.getElementById('messageBox');
  const gmail = document.getElementById("gmailInput").value;
  const appPassword = document.getElementById("appPassword").value;

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


  function checkInput(inputs) {
    for (const input of inputs) {
      if (!input.value) {
        alert(input.message); // Show the corresponding error message
        input.element.focus(); // Focus on the invalid input
        return false;
      }
    }
    return true;
  }
  // Handle form submission
  submitButton.addEventListener('click', () => {
    const selectedFile = fileInput.files[0];
    const message = messageBox.value;

    const isValid = checkInput([
      { element: fileInput, value: selectedFile, message: 'Please select a file.' },
      { element: messageBox, value: message, message: 'Please enter a message.' },
      { element: gmailInput, value: gmail, message: 'Please enter your Gmail.' },
      { element: appPasswordInput, value: appPassword, message: 'Please enter your app password.' },
    ]);
  
    if (!isValid) return
    
    try {
      const emails_data = XLSX.readFile(selectedFile); 
      console.log(emails_data); 
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Failed to process the file. Please try again.');
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: gmail,
        pass: appPassword,
      },
    
    });
        
    const mailOptions = ({ to,subject,message}) => ({
      from: my_email,
      to: to , // Default recipient if none is provided
      subject:  subject,
      text: message,
    });


    const sendEmail = async (mailOptions) => {
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        console.log(`email sent to ${mailOptions.Email}`);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    const sheetName = emails_data.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(emails_data.Sheets[sheetName]);

    let match;
    while ((match = regex.exec(message)) !== null) {
      matches.push(match[1]); 
    }

    try{

    }catch(error){
      console.error("error sending , maybe rows are declared wrong",error);
      alert("please inust the columns names inserted succesfully");
    }

    row = data.map(file_row=> {
      const rows = {}
        matches.forEach(Column=>{
          rows[Column] = file_row[Column]
        });
        return rows;
    })

   row.forEach(async(row)=>{

    const message = `Hello ${user.prenom} ${user.Nom},\nYour username is ${user.Username} and your password is ${user.Password}.`;

    const mail = mailOptions({
        to:user.email,
        subject:"amin tp using node.js",
        message:message,
    });


    console.log(`\n sent to ${user.email} \n`);
    await sendEmail(mail)






   }) 



    console.log('Submitting form...');
    console.log(`File: ${selectedFile.name}`);
    console.log(`Message: ${message}`);
    alert('Form submitted successfully!');
  });





});


