var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var siteForm = document.getElementById("siteForm");

var siteContainer = [];

// The user has data or not?
if (localStorage.getItem("siteName") !== null) {
    siteContainer = JSON.parse(localStorage.getItem("siteName"));
    displayform();
}

// ADD Function
function addSite() {
    // Create object and get value
    var inSite = {
        site: siteNameInput.value,
        url: siteUrlInput.value,
    };

    // Add object to array
    siteContainer.push(inSite);
    
    // Replace the old array with the new added
    localStorage.setItem("siteName", JSON.stringify(siteContainer));    
    clearForm();
    displayform();
}

// Clear Form
function clearForm() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

// Delete Function
function deleteSite(index) {
    siteContainer.splice(index, 1);
    // Update localStorage
    localStorage.setItem("siteName", JSON.stringify(siteContainer));
    displayform();
}

// Display Function
function displayform() {
    var cartona = ``;

    for (var i = 0; i < siteContainer.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${siteContainer[i].site}</td>              
                <td>
                    <a href="${siteContainer[i].url}" target="_blank" class="btn btn-visit">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </a>
                </td>
                <td>
                    <button class="btn btn-delete pe-2" onclick="deleteSite(${i})">
                        <i class="fa-solid fa-trash-can"></i>Delete
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById('siteContainerr').innerHTML = cartona;
}

// Validate Function (Regular Expressions)
var nameRegex = /^\w{3,}(\s+\w+)*$/;  // Site name must be at least 3 characters
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;  // URL validation regex

// Validate name on input
siteNameInput.addEventListener("input", function () {
  validate(siteNameInput, nameRegex);
});

// Validate URL on input
siteUrlInput.addEventListener("input", function () {
  validate(siteUrlInput, urlRegex);
});

// Validate function
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

// Form submit event
siteForm.addEventListener('submit', function (e) {
  e.preventDefault();  // Prevent form from submitting by default
  
  // Check if the inputs are valid
  var isNameValid = nameRegex.test(siteNameInput.value);
  var isURLValid = urlRegex.test(siteUrlInput.value);
  
  if (!isNameValid) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Site name must be at least 3 characters long!',
    });
    return; // Prevent submission if the name is invalid
  }
  
  if (!isURLValid) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'URL must be valid (e.g., https://example.com)!',
    });
    return; // Prevent submission if the URL is invalid
  }

  // If everything is valid, show success alert
  Swal.fire({
    icon: 'success',
    title: 'Form submitted successfully!',
    text: 'Your bookmark has been saved.',
  });
  
  addSite(); // Adding the site after validation
});
