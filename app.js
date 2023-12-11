function diffCalc() {
    const diff =
        (new Date().getTime() - new Date("December 30, 2000").getTime()) /
        1000 /
        60 /
        60 /
        24 /
        365;
    return diff.toFixed(9);
}

let age = diffCalc();
let mounted = false;

setInterval(() => {
    age = diffCalc();
    console.log('Age:', age);
}, 10);

mounted = true;

const token = process.env.GITHUB_TOKEN;
const apiUrl = 'https://api.github.com/users/Vandertheprince';
const followersUrl = `${apiUrl}/followers`;

let userData;

fetch(apiUrl, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Log user data for debugging
        console.log('User Data:', data);

        // Save user data for later use
        userData = data;

        // Fetch the number of followers
        return fetch(followersUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(followersData => {
        // Log followers data for debugging
        console.log('Followers Data:', followersData);

        // Update the content of the .github-info paragraph
        console.log('GitHub Info:', userData.name);
        console.log('GitHub Followers:', followersData.length);
    })
    .catch(error => {
        console.error('Error fetching GitHub data:', error.message);
    });
