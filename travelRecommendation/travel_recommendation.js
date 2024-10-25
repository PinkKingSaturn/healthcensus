const searchBtn = document.getElementById('btnSearch');
const contactBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('btnReset');

function searchDestination() {
    const input = document.getElementById('locationInput').value.toLowerCase();
    const resultDiv = document.getElementById('searchLocation');

    resultDiv.innerHTML = '';

    fetch('/travelRecommendation/travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            const countries = ['country', 'countries'];
            const beaches = ['beach', 'beaches'];
            const temples = ['temple', 'temples'];

            function createLocationCard(imageUrl, name, description) {
                // Create the main card div
                const cardDiv = document.createElement('div');
                cardDiv.className = 'location-card'; // Add class for CSS

                // Create the image element
                const img = document.createElement('img');
                img.className = 'loc_img'; // Add class for CSS
                img.src = imageUrl; // Set the image source
                img.alt = ''; // Set alt attribute (you can add a meaningful description)

                // Create the heading element
                const heading = document.createElement('h3');
                heading.className = 'location-name'; // Add class for CSS
                heading.textContent = name; // Set the text content

                // Create the paragraph element
                const paragraph = document.createElement('p');
                paragraph.className = 'location-info'; // Add class for CSS
                paragraph.textContent = description; // Set the text content

                // Append the elements to the card div
                cardDiv.appendChild(img);
                cardDiv.appendChild(heading);
                cardDiv.appendChild(paragraph);

                return cardDiv; // Return the constructed card
            }

            if (countries.includes(input)) {
                const country = data.countries.find(country => country.name.toLowerCase() === input);
                // Check if countries data exists
                if (data.countries && Array.isArray(data.countries)) {
                    for (let i = 0; i < data.countries.length; i++) {
                        if (data.countries[i].cities && Array.isArray(data.countries[i].cities)) {
                            for (let j = 0; j < data.countries[i].cities.length; j++) {
                                const city = data.countries[i].cities[j];
                                const card = createLocationCard(city.imageUrl, city.name, city.description);
                                resultDiv.appendChild(card); // Append the card to resultDiv
                            }
                        }
                    }
                } else {
                    resultDiv.innerHTML = 'No country data available.';
                }
            } else if (beaches.includes(input)) {
                for (let i = 0; i < data.beaches.length; i++) {
                    const beach = data.beaches[i];
                    const card = createLocationCard(beach.imageUrl, beach.name, beach.description);
                    resultDiv.appendChild(card); // Append the card to resultDiv
                }
            } else if (temples.includes(input)) {
                for (let i = 0; i < data.temples.length; i++) {
                    const temple = data.temples[i];
                    const card = createLocationCard(temple.imageUrl, temple.name, temple.description);
                    resultDiv.appendChild(card); // Append the card to resultDiv
                }
            } else {
                resultDiv.innerHTML = 'Destination not found.';
            }
        })
        .catch(error => {
            resultDiv.innerHTML = 'An error occurred while fetching data.';
            console.error('Fetch error:', error);
        });
}

searchBtn.addEventListener('click', searchDestination);

function clear() {
    console.log('Clear button tapped.');
    document.getElementById('locationInput').value = ""; // Clear the input field
    document.getElementById('searchLocation').innerHTML = ""; // Clear the result div
}

clearBtn.addEventListener('click', clear);
