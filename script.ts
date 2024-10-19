document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');
    const educationElement = document.getElementById('education');
    const experienceElement = document.getElementById('experience');
    const skillsElement = document.getElementById('skills');

    const usernameElement = document.getElementById(
        "username"
    ) as HTMLInputElement;

    // CHECK IF ALL FORM ELEMENTS ARE PRESENT

    if (profilePictureInput && 
        nameElement && 
        emailElement && 
        phoneElement && 
        addressElement && 
        educationElement && 
        
        experienceElement && 
        skillsElement 
     ) {



        const name = (nameElement as HTMLInputElement).value;
        const email = (emailElement as HTMLInputElement).value;
        const phone = (phoneElement as HTMLInputElement).value;
        const address = (addressElement as HTMLInputElement).value;
        const education = (educationElement as HTMLInputElement).value;
        const experience = (experienceElement as HTMLInputElement).value;
        const skills = (skillsElement as HTMLInputElement).value;

        

        // Handle profile picture
        const profilePictureFile = (profilePictureInput as HTMLInputElement).files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';

        // Create resume output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
        <p><strong>Name:</strong> <span id="edit-name" class="editable"> ${name} </span> </p>
        <p><strong>Email:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
        <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> ${phone} </span> </p>
        <p><strong>Address:</strong> <span id="edit-address" class="editable"> ${address} </span> </p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>

        <h3>Work Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
        `;



// dispaly THE RESUME IN the output cotainer

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput; makeeditable;
            resumeOutputElement.classList.remove("hidden");

            // create container for button
            const buttonsContainer = document.createElement("div");
            buttonsContainer.id = "buttonsContainer";
            resumeOutputElement.appendChild(buttonsContainer);

            // add download PDF button
            const downloadbutton = document.createElement("button");
            downloadbutton.textContent = "Download as PDF";
            downloadbutton.addEventListener("click", () => {
                window.print(); // open the print dialog, allowing the user to save AS pdf.
            });
            buttonsContainer.appendChild(downloadbutton);


            // add Shareable Link Button
            const shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", async () => {
                try {
                    // create a Shareable link (simulate it in this case)
                    const shareableLink = `https://yourdomain.com/resumes/${name.replace(
                    /\s+/g,
                    '_'
                    )}_cv.html`;
                    // use clipboard API to copy the shareable link
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable Link copied to clipboared!");
            }catch (err) {
                console.error("Failed to copy link: ", err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
            });
//**  */
      buttonsContainer.appendChild(shareLinkButton);   
    } else {
        console.error("Resume output container not found");
    }
} else {
console.error("form elements are missing");
}
});

function makeeditable(){
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click' , function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // replace content
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input')
                input.type = 'text'
                input.value = currentValue
                input.classList.add('editing-input')

                input.addEventListener('blur', function(){
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline'
                    input.remove()
                })



                currentElement.style.display = 'none'
                currentElement.parentNode?.insertBefore(input, currentElement)
                input.focus()
            }
        })
    })
}