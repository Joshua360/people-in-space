
//API endpoints to consume
const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

//DOM elements to select
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');



//ajax FUNCTION DECLARATION
function getJSON(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open("GET",url);

    xhr.onload = () =>{
        if(xhr.status === 200){
            let astranautData = JSON.parse(xhr.responseText);
            console.log(astranautData);
            callback(astranautData)
        }

    };
    xhr.send();
}



//generate Mockup to display


function generateHTML(profileData){
    const section = document.createElement('section');
    peopleList.appendChild(section);

    // Check if request returns a 'standard' page from Wiki
  if (profileData.type === 'standard') {
    section.innerHTML = `
      <img src=${profileData.thumbnail.source}>
      <h2>${profileData.title}</h2>
      <p>${profileData.description}</p>
      <p>${profileData.extract}</p>
    `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${profileData.title}</h2>
      <p>Results unavailable for ${profileData.title}</p>
      ${profileData.extract_html}
    `;
  }

}




//call to 2nd endpoint
function getProfiles(jsondata){
    jsondata.people.map(index=>{
        getJSON(`${wikiUrl}${index.name}`, generateHTML);
    });

}

//call to first endpoint

btn.addEventListener("click", (e)=>{
    getJSON(astrosUrl,getProfiles);
    e.target.remove();

});





