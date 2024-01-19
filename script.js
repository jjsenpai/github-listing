document.addEventListener('DOMContentLoaded', () => {

let username;
const accessToken = '';
let perPage = 10;
let currentPage = 1;
let numberofpages;

function fetchUser(username) {
  fetch(`https://api.github.com/users/${username}`
  // , {
  //   headers: {
  //     Authorization: `token ${accessToken}`
  //   }
  // }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(user => {
      numberofpages = Math.ceil(user.public_repos / perPage);
      
      const profilePic = `<img src="${user.avatar_url}" alt="Profile Picture">`;
      document.querySelector('.user-profile').innerHTML = profilePic;
      if (user.name!==null){
        document.querySelector('.username').innerHTML = `${user.name}`;
      } 
      else {
        document.querySelector('.username').innerHTML = "invalid name";
      } 
      document.querySelector('.repo').innerHTML = `<img src="./assets/link.png" class="licon" alt=loc><a href="${user.html_url}" target="_blank" class="textblack">${user.html_url}</a>`;
      if (user.bio) document.querySelector('.bio').innerHTML = `${user.bio}`;
      if (user.location) document.querySelector('.location').innerHTML = `<img src="./assets/location.png" class="licon" alt=loc>  ${user.location}`;
      if (user.twitter_username) document.querySelector('.twitter').innerHTML = `Twitter: https://twitter.com/${user.twitter_username}`;
      if(user.public_repos!==0){
        createPageButtons(numberofpages);
        updateActiveButton();
        fetchRepositories(username, currentPage);
      }else{
        document.querySelector('.buttonwrapper').innerHTML=`<div>User has no repositories</div>`
      }
      hideLoadingIndicator();
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      document.getElementById('errorText').textContent = 'Invalid username';
      hideLoadingIndicator();
    });
}
function fetchRepositories(username, page) {
  fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`
  // , {
  //   headers: {
  //     Authorization: `token ${accessToken}`
  //   }
  // }
  )
    .then(response => response.json())
    .then(data => {      
      const repos = data.map((repo)=>{
        const topics = repo.topics.length > 0 ? repo.topics.map((topic)=>{
          return `<div class="tcard">${topic}</div>`
        }).join('') : '';
        const desc= repo.description ? `<p>${repo.description}</p>` : '';
            return `<div class="card flex-col">
                      <a class="textblue" href="${repo.html_url}">${repo.name}</a>
                      ${desc}
                      ${topics? `<div class="twrapper flex">${topics}</div>` :''}
                    </div>`;
      }).join('');
      document.querySelector('.cardswrapper').innerHTML = repos;
      document.querySelector('.buttonwrapper').innerHTML = `<button class="prev button">
      <span class="arrow">← </span>Older
    </button>
    <button class="next button">
      Newer<span class="arrow"> →</span>
    </button>`;
    document.querySelector('.next').addEventListener('click', () => {
      if (currentPage < numberofpages) {
      currentPage++;
      fetchRepositories(username, currentPage);
      updateActiveButton();
      }
    });
    
    document.querySelector('.footer .prev').addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchRepositories(username, currentPage);
    updateActiveButton();
      }
    });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
function createPageButtons(numberofpages) {
  const buttonsContainer = document.querySelector('.pagelist');
  buttonsContainer.innerHTML = '';

  const firstButton = document.createElement('button');
  firstButton.textContent = '<<';
  firstButton.value = 1;
  firstButton.classList.add('page-button');
  firstButton.addEventListener('click', () => {
    if (currentPage !== 1) {
      currentPage = 1;
      fetchRepositories(username, currentPage);
      updateActiveButton();
    }
  });
  buttonsContainer.appendChild(firstButton);

  for (let i = 1; i <= numberofpages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.value = i;
    button.classList.add('page-button');
    button.addEventListener('click', () => {
      if (currentPage !== i) {
        currentPage = i;
        fetchRepositories(username, currentPage);
      updateActiveButton();

      }
    });
    buttonsContainer.appendChild(button);
  }

  const lastButton = document.createElement('button');
  lastButton.textContent = '>>';
  lastButton.value = numberofpages;
  lastButton.classList.add('page-button');
  lastButton.addEventListener('click', () => {
    if (currentPage !== numberofpages) {
      currentPage = numberofpages;
      updateActiveButton();
      fetchRepositories(username, currentPage);
    }
  });
  buttonsContainer.appendChild(lastButton);
}
function updateActiveButton() {
  const buttons = document.querySelectorAll('.page-button');
  buttons.forEach(button => {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add('activebutton');
    } else {
      button.classList.remove('activebutton');
    }
  });
}
function showLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.classList.add('loading');
  loadingIndicator.textContent = 'Loading...';
  document.body.appendChild(loadingIndicator);
}
function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

document.getElementById('githubForm').addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  username = formData.get('username').trim();
  perPage = parseInt(formData.get('perPage'));
  if (username) {
    showLoadingIndicator();
    document.querySelector('.user-profile').innerHTML = '';
    document.querySelector('.username').innerHTML = '';
    document.querySelector('.repo').innerHTML = '';
    document.querySelector('.bio').innerHTML = '';
    document.querySelector('.location').innerHTML = '';
    document.querySelector('.twitter').innerHTML = '';
    document.querySelector('.cardswrapper').innerHTML = '';
    document.querySelector('.pagelist').innerHTML = '';
    document.querySelector('.buttonwrapper').innerHTML = '';
    document.getElementById('errorText').textContent = '';
    fetchUser(username);
  } else {
    document.getElementById('errorText').textContent = 'Please enter a username';
  }
});

});