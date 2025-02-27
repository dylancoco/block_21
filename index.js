//GET function that returns all events
async function getEvents(){
    try{
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events");
        const data = await response.json();
        return data.data;
    } catch(e){
        console.log("Something is wrong with the GET events function");
    }
}

// const event1 = {
//     "name" : "Test 1",
//     "description": "Test 1",
//     "date" : new Date("2025-02-25").toISOString(),
//     "location": "Test 1"
// };
// postEvent(event1);

//POST function that creates new event
async function postEvent(data){
    try{
        await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        )
    } catch(e){
        console.log("Something is wrong with the POST event function", e)
    }
}

//DELETE function from an id
async function deleteEvent(id){
    try{
        const url = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2412-ftb-mt-web-pt/events/" + id;
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        )
    } catch(e){
        console.log("Something is wrong with the POST event function", e)
    }
}

//Display Events
 async function displayEvents(){
    const container = document.getElementById("container");
    container.innerHTML = "";
    const event = await getEvents();
    console.log(event)
    for(let i = 0; i < event.length; i++){
        const card = document.createElement("div");
        card.classList.add('card');
        card.innerHTML = `
            <h2>${event[i].name}</h2>
            <p><strong>Description:</strong> ${event[i].description}</p>
            <p><strong>Date:</strong> ${event[i].date}</p>
            <p><strong>Location:</strong> ${event[i].location}</p>
            <button class="delete-btn" id="${event[i].id}">Delete</button>
        `
        container.appendChild(card);
    }
    const allDelete = document.querySelectorAll(".delete-btn");
    for(let i = 0; i < allDelete.length; i++){
        allDelete[i].addEventListener("click", async function(event){
            console.log(event)
            await deleteEvent(event.target.getAttribute("id"));
            await displayEvents();
        })
    }
}

async function createNewEvent(event){
    event.preventDefault();
    const eventName = document.getElementById("name").value.trim();
    const eventDescription = document.getElementById("description").value.trim();
    const eventDate =  new Date(document.getElementById("date").value).toISOString();
    const eventLocation = document.getElementById("location").value.trim();
    const data = {
        "name": eventName,
        "description": eventDescription,
        "date" : eventDate,
        "location": eventLocation
    };
    await postEvent(data);
    await displayEvents();
    document.getElementById("form").reset();
}
document.getElementById("form").addEventListener("submit", createNewEvent);

displayEvents();