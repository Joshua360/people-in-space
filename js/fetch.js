const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');



// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}
    `;
  }
}



function getProfiles(json) {
  const profiles = json.people.map( person => {
       fetch(wikiUrl + person.name)
       .then(res=>res.json()) 
       .then(generateHTML)     
  }); 
  return profiles;
}






btn.addEventListener('click', (event) => {
  fetch(astrosUrl)
    .then(res=>res.json())
    .then(getProfiles)
     event.target.remove();
});


