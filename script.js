const username = 'johnpapa';
const accessToken = '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';

function fetchUser(username) {
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${accessToken}`
    }
  })
    .then(response => response.json())
    .then(user => {
      const profilePic = `<img src="${user.avatar_url}" alt="Profile Picture">`;
      document.querySelector('.user-profile').innerHTML = profilePic;
      document.querySelector('.username').innerHTML = `${user.name}`;
      document.querySelector('.repo').innerHTML = `${user.html_url}`;
      if(user.bio)
      document.querySelector('.bio').innerHTML = `${user.bio}`;
    if(user.location)
    document.querySelector('.location').innerHTML = `${user.location}`;
    if(user.twitter_username)
      document.querySelector('.twitter').innerHTML = `${user.twitter_username}`;
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}
fetchUser(username);