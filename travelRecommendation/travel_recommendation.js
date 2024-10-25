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
            const countries = data.countries.map(country => country.name.toLowerCase());
            const beaches = ['beach', 'beaches'];
            const temples = ['temple', 'temples'];

            function createLocationCard(imageUrl, name, description) {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'location-card';

                const img = document.createElement('img');
                img.className = 'loc_img';
                img.src = imageUrl;
                img.alt = '';

                const heading = document.createElement('h3');
                heading.className = 'location-name';
                heading.textContent = name;

                const paragraph = document.createElement('p');
                paragraph.className = 'location-info';
                paragraph.textContent = description;

                cardDiv.appendChild(img);
                cardDiv.appendChild(heading);
                cardDiv.appendChild(paragraph);

                return cardDiv;
            }

            // Check if the input matches a specific country
            if (countries.includes(input)) {
                const country = data.countries.find(country => country.name.toLowerCase() === input);
                if (country && country.cities && Array.isArray(country.cities)) {
                    country.cities.forEach(city => {
                        const card = createLocationCard(city.imageUrl, city.name, city.description);
                        resultDiv.appendChild(card);
                    });
                } else {
                    resultDiv.innerHTML = 'No cities found for this country.';
                }
            }
            // Check if the input matches beaches
            else if (beaches.includes(input)) {
                if (data.beaches && Array.isArray(data.beaches)) {
                    data.beaches.forEach(beach => {
                        const card = createLocationCard(beach.imageUrl, beach.name, beach.description);
                        resultDiv.appendChild(card);
                    });
                } else {
                    resultDiv.innerHTML = 'No beach data available.';
                }
            }
            // Check if the input matches temples
            else if (temples.includes(input)) {
                if (data.temples && Array.isArray(data.temples)) {
                    data.temples.forEach(temple => {
                        const card = createLocationCard(temple.imageUrl, temple.name, temple.description);
                        resultDiv.appendChild(card);
                    });
                } else {
                    resultDiv.innerHTML = 'No temple data available.';
                }
            }
            // If no matches found
            else {
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
