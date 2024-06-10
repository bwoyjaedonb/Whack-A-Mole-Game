// This took way too long to work, thank you chat gpt and google
(function() {
    // Get the cursor element with the class 'cursor'
    let mad = document.querySelector('.cursor');
    // Get all elements with the class 'hole'
    let holes = document.querySelectorAll('.hole'); 
    // Get the score element by its ID
    let scoreEl = document.getElementById('score');
    // Initialize the score variable
    let score = 0;
    // Initialize the timer variable outside the function
    let timer = null; 

    // Check if the cursor element exists
    if (mad) {
        // Add an event listener for mouse movement
        document.addEventListener('mousemove', (e) => {
            // Update the cursor position based on the mouse position
            mad.style.left = e.pageX + 'px';
            mad.style.top = e.pageY + 'px';
        });

        // Add an event listener for mouse down event
        document.addEventListener('mousedown', () => {
            // Add the 'active' class to the cursor
            mad.classList.add("active");
        });

        // Add an event listener for mouse up event
        document.addEventListener('mouseup', () => {
            // Remove the 'active' class from the cursor
            mad.classList.remove("active");
        });

        // Function to insert a random image into a random hole
        function insertRandomImage() {
            // Check if there are any holes
            if (holes.length === 0) {
                console.error('No elements found with class "hole".');
                return;
            }
        
            // Generate a random index to select a hole
            let i = Math.floor(Math.random() * holes.length);
            let hole = holes[i];
        
            // Check if the selected hole is valid and doesn't already contain an image
            if (hole && !hole.querySelector('img')) { 
                // Create a new image element
                let img = document.createElement('img');
                img.src = 'Mole.png';
                // Append the image to the hole
                hole.appendChild(img);
        
                // Add an event listener for the image click event
                img.addEventListener('click', () => { 
                    // Change the image source on click
                    img.src = 'Whacked.png';
                    // Increment the score
                    score += 10;
                    // Update the score display
                    scoreEl.innerText = score;
                    // Remove the image after 1.5 seconds and insert a new one
                    setTimeout(() => {
                        hole.removeChild(img);
                        insertRandomImage(); // Call insertRandomImage after a delay
                    }, 1500);
                });

                // Set a timer to remove the image and insert a new one after 1.5 seconds
                timer = setTimeout(() => { 
                    hole.removeChild(img);
                    insertRandomImage(); // Call insertRandomImage after a delay
                }, 1500);
            }
        }
        
        // Call the function to insert a random image
        insertRandomImage(); 
    } else {
        console.error('Element with class "cursor" not found.');
    }
})();



