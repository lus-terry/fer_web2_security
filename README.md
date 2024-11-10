# Web Application Vulnerability Demonstration

### Project Description
This is a web application built to demonstrate two common web application vulnerabilities:
  - Cross-Site Scripting (XSS)
  - Sensitive Data Exposure
The application provides a controlled environment for testing and understanding these vulnerabilities in a safe manner.

The application is publicly accessible here: [Security-app](https://fer-web2-security-wsu8.onrender.com/)

The solution includes the following functionalities:

- **Public Home Page**

  - Displays two buttons, each directing user to a specific vulnerability demonstration.

- **XSS Demonstration:**

This feature allows user to enter comments, which are displayed immediately below.
When the Enable Vulnerability checkbox is selected, scripts in comments are not sanitized and may execute,
while without it, comments are sanitized and shown as plain text.

- Test scripts:
    - &lt;button onclick=&quot;alert('XSS Button')&quot;&gt;Click Me&lt;/button&gt;
    - &lt;img src=&quot;x&quot; onerror=&quot;alert('XSS Image')&quot;/&gt;
    - &lt;a href=&quot;#&quot; onmouseover=&quot;alert('XSS via hover!')&quot;&gt;Hover over this link&lt;/a&gt;
      
- **Sensitive Data Exposure Demonstration**

This feature allows you to enter and then retrieve card information by pressing the Get Card Info button.
When the Enable Vulnerability checkbox is selected, the data is stored and displayed without encryption; otherwise, it is protected. 

- Test data:
  - Card Number: 1111 1111 1111 1111
  - Expiration Date: 11/11
  - CCV: 111


    
**Technologies Used**:

- React for frontend development.
- Tailwind CSS for styling.
- React Router for navigation and route handling.
- PostgreSQL on Render for data storage.

  
  
