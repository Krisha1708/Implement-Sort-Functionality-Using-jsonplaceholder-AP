const userListDiv = document.getElementById("user-list");
const sortSelect = document.getElementById("sort-select");

// function to fetch the data
async function fetchData() {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        if(!response.ok){
            throw new Error('Failed to fetch data')
        }

        return users;
    } catch(error){
        console.log(error);
        alert('There was an error fetching the data.')
    }
}

// function to render the product data into the DOM
function renderusers(users){
    userListDiv.innerHTML = ""; // clear the existing data

    users.forEach(user =>{
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Username : ${user.username}</p> 
            <p>Email : ${user.email}</p> 
        `
        userListDiv.appendChild(userCard)
    });
};


// function to sort the users based on selected criteria
function sortUsers(users, criterion){
    return users.sort((a,b)=>{
        if(a[criterion] < b[criterion]) return -1;
        if(a[criterion] > b[criterion]) return 1;
        return 0;
    });
};


// function to handle the sorting logic when user changes the dropdown selection
async function handleSortChange() {
    const criterion = sortSelect.value;
    const users = await fetchData();

    if(users){
        const sortedUsers = sortUsers(users,criterion);
        renderusers(sortedUsers)
    }
}

//Initialize the page
document.addEventListener("DOMContentLoaded", async ()=>{
    const users = await fetchData();
    if(users){
        renderusers(users);
    }
});

// event listener for sorting dropdown change
sortSelect.addEventListener("change", handleSortChange);