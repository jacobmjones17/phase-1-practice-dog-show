document.addEventListener('DOMContentLoaded', () => {
    getDogs()
    const form = document.getElementById("dog-form")
    form.addEventListener("submit", e => editDogForm(e))
});

function addDogToDom(dog) {
    const tableBody = document.getElementById("table-body");
    const tr = document.createElement("tr");
    tr.dataset.dog_id = dog.id;
    const dogNameTD = document.createElement("td");
    dogNameTD.textContent = dog.name;
    const dogBreedTD = document.createElement("td");
    dogBreedTD.textContent = dog.breed;
    const dogSexTD = document.createElement("td");
    dogSexTD.textContent = dog.sex;
    const button = document.createElement("button");
    button.textContent = "Edit";
    button.addEventListener("click", () => popluateForm(dog))
    tr.append(dogNameTD, dogBreedTD, dogSexTD, button)
    tableBody.append(tr)

}

function getDogs() {
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(response => response.forEach(dog => addDogToDom(dog)))
}

function popluateForm(dog) {
    const form = document.getElementById("dog-form")
    form.dataset.id = dog.id
    const [name, breed, sex] = form
    name.value = dog.name
    breed.value = dog.breed
    sex.value = dog.sex
}

function editDogForm(e) {
    e.preventDefault()
    // console.log("event", e.target.dataset.id)

    const [name, breed, sex] = e.target
    fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
    method: "PATCH",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({name: name.value, breed: breed.value, sex: sex.value})
})
.then(response => response.json())
.then(response => {
    const findDog = document.querySelector(`[data-dog_id="${response.id}"]`)
    const [name, breed, sex] = findDog.children
    name.textContent = response.name
    breed.textContent = response.breed
    sex.textContent = response.sex
})