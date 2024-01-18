const username = 'johnpapa';
const accessToken = '';
let perPage = 10;
let currentPage = 2;
function fetchUser(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(user => {
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
// fetchUser(username);
function fetchRepositories(username, page) {
  fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const repos = data.map((repo)=>{
        const topics = repo.topics.length > 0 ? `<p>Topics: ${repo.topics.join(', ')}</p>` : '';
        const desc= repo.description ? `<p>${repo.description}</p>` : '';
            return `<div class="card flex-col">
                      <h3 class="textblue" >${repo.name}</h3>
                      ${desc}
                      ${topics}
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
const user = {
  "login": "johnpapa",
  "id": 1202528,
  "node_id": "MDQ6VXNlcjEyMDI1Mjg=",
  "avatar_url": "https://avatars.githubusercontent.com/u/1202528?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/johnpapa",
  "html_url": "https://github.com/johnpapa",
  "followers_url": "https://api.github.com/users/johnpapa/followers",
  "following_url": "https://api.github.com/users/johnpapa/following{/other_user}",
  "gists_url": "https://api.github.com/users/johnpapa/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/johnpapa/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/johnpapa/subscriptions",
  "organizations_url": "https://api.github.com/users/johnpapa/orgs",
  "repos_url": "https://api.github.com/users/johnpapa/repos",
  "events_url": "https://api.github.com/users/johnpapa/events{/privacy}",
  "received_events_url": "https://api.github.com/users/johnpapa/received_events",
  "type": "User",
  "site_admin": false,
  "name": "John Papa",
  "company": "JohnPapa.net, LLC",
  "blog": "http://johnpapa.net",
  "location": "Orlando, FL",
  "email": null,
  "hireable": null,
  "bio": "Winter is Coming",
  "twitter_username": "john_papa",
  "public_repos": 144,
  "public_gists": 58,
  "followers": 15219,
  "following": 1,
  "created_at": "2011-11-17T17:05:03Z",
  "updated_at": "2023-11-01T15:31:38Z"
}
document.addEventListener('DOMContentLoaded', () => {
  const profilePic = `<img src="${user.avatar_url}" alt="Profile Picture">`;
  const locationicon = `<img src="${user.avatar_url}" alt="Profile Picture">`;
  document.querySelector('.user-profile').innerHTML = profilePic;
  document.querySelector('.username').innerHTML = `${user.name}`;
  document.querySelector('.repo').innerHTML = `<img src="./assets/link.png" class="licon" alt=loc><a href="${user.html_url}" class="textblack">${user.html_url}</a>`;
  if (user.bio) document.querySelector('.bio').innerHTML = `${user.bio}`;
  if (user.location) document.querySelector('.location').innerHTML = `<img src="./assets/location.png" class="licon" alt=loc>  ${user.location}`;
  if (user.twitter_username) document.querySelector('.twitter').innerHTML = `Twitter: @${user.twitter_username}`;
});
// , {
//   headers: {
//     Authorization: `token ${accessToken}`
//   }
// }