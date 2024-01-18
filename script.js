document.addEventListener('DOMContentLoaded', () => {

const username = 'johnpapa';
const accessToken = '';
let perPage = 10;
let currentPage = 2;
let numberofpages;

function fetchUser(username) {
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(user => {
      numberofpages = Math.ceil(user.public_repos/perPage);
      console.log(numberofpages);
      const profilePic = `<img src="${user.avatar_url}" alt="Profile Picture">`;
      const locationicon = `<img src="${user.avatar_url}" alt="Profile Picture">`;
      document.querySelector('.user-profile').innerHTML = profilePic;
      document.querySelector('.username').innerHTML = `${user.name}`;
      document.querySelector('.repo').innerHTML = `<img src="./assets/link.png" class="licon" alt=loc><a href="${user.html_url}" class="textblack">${user.html_url}</a>`;
      if (user.bio) document.querySelector('.bio').innerHTML = `${user.bio}`;
      if (user.location) document.querySelector('.location').innerHTML = `<img src="./assets/location.png" class="licon" alt=loc>  ${user.location}`;
      if (user.twitter_username) document.querySelector('.twitter').innerHTML = `Twitter: @${user.twitter_username}`;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}
fetchUser(username);
function fetchRepositories(username, page) {
  fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {      
      const repos = data.map((repo)=>{
        const topics = repo.topics.length > 0 ? repo.topics.map((topic)=>{
          return `<div class="tcard">${topic}</div>`
        }).join('') : '';
        const desc= repo.description ? `<p>${repo.description}</p>` : '';
            return `<div class="card flex-col">
                      <h3 class="textblue" >${repo.name}</h3>
                      ${desc}
                      ${topics? `<div class="twrapper flex">${topics}</div>` :''}
                    </div>`;
      }).join('');
      console.log(repos);
      document.querySelector('.cardswrapper').innerHTML = repos;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
fetchRepositories(username, currentPage);

document.querySelector('.next').addEventListener('click', () => {
  currentPage++;
  console.log(currentPage);
  fetchRepositories(username, currentPage);
});

document.querySelector('.footer .prev').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchRepositories(username, currentPage);
  }
});

});