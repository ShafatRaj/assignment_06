// Load categories
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
};

// Load pets
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
};

// Load pets by category
const loadPetsCategory = (category) => {
    // alert(category);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
};

//display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categoryContainer.innerHTML = "";



    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button onclick="loadPetsCategory('${item.categories_petId}')" class="btn flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
            <img class="h-6" src="${item.category_icon}">
            ${item.category}
        </button>
        `;
        categoryContainer.append(buttonContainer);
    });
};

// Display Pets
const displayPets = (pets) => {
    const petContainer = document.getElementById("carts")
    petContainer.innerHTML = '';



    if (pets.length == 0) {
        petContainer.innerHTML = "No Content Here"
        return;
    }

    pets.forEach((item) => {
        const cart = document.createElement("div");
        cart.classList = "card"
        cart.innerHTML = `
        <div class="border border-gray-500 p-2 rounded-lg p-3">
            <figure class="h-[200px] ">
                <img src="${item.image}" class="h-full w-full object-cover rounded-lg" alt="${item.pet_name}" />
            </figure>
            <div class="card-body px-0 ">
            
                            <h2 class="card-title font-bold ">${item.pet_name}</h2>

                
                <div class="flex gap-2">
                    <img class="h-4 w-4 object-cover" src="images/icons8-like-50.png" >
                    <p>Breed: ${item.breed}</p>
                </div>
                
                <div class="flex gap-2">
                    <img class="h-4 w-4 object-cover" src="images/icons8-age-50.png" >
                    <p>Birth: ${item.date_of_birth}</p>
                </div>

                <div class="flex gap-2">
                    <img class="h-4 w-4 object-cover" src="images/icons8-gender-24.png" >
                    <p>Gender: ${item.gender}</p>
                </div>

                <div class="flex gap-2">
                    <img class="h-4 w-4 object-cover" src="images/icons8-us-dollar-24.png" >
                    <p>Price: ${item.price}$</p>
                </div>
                
                <div class="card-actions flex justify-between items-center py-2">
                    <button onclick="likePet(${item.id})"class="w-20 h-9"><img class=" p-1 object-cover border border-gray-500 rounded-lg" src="images/icons8-like-24.png" ></button>
                    <button onclick="adoptPet(this)" class="w-20 h-9 text-[#0E7A81] border border-gray-500 rounded-lg font-bold">Adopt</button>
                    <button onclick="loadPetDetails(${item.id})" class="w-20 h-9 text-[#0E7A81] border border-gray-500 rounded-lg font-bold">Details</button>
                </div>
            </div>
        </div>
        `;
        petContainer.append(cart);
    });
};

// Display Pet Details
const displayPetDetails = (pet) => {
    const modal = document.getElementById('modal');
    const petDetailsEl = document.getElementById('pet-details');

    petDetailsEl.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${pet.pet_name}</h2>
        <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-64 object-cover rounded mb-4">
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Age:</strong> ${pet.age}</p>
        <p><strong>Gender:</strong> ${pet.gender}</p>
        <p><strong>Price:</strong> ${pet.price}$</p>
        <p><strong>Description:</strong> ${pet.description || 'No description available'}</p>
    `;

    modal.classList.remove('hidden');
};

// Like pet
const likePet = (id) => {

    console.log(`Liked pet with id: ${id}`);
};

// Adopt pet
const adoptPet = (button) => {
    button.disabled = true;
    let countdown = 3;
    const timer = setInterval(() => {
        button.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(timer);
            button.textContent = 'Adopted';
        }
    }, 1000);
};

// Sort pets by price
const sortByPrice = () => {
    const petContainer = document.getElementById("carts");
    const pets = Array.from(petContainer.children);
    pets.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('[class*="Price"]').textContent.split('$')[0]);
        const priceB = parseFloat(b.querySelector('[class*="Price"]').textContent.split('$')[0]);
        return priceB - priceA;
    });
    petContainer.innerHTML = '';
    pets.forEach(pet => petContainer.appendChild(pet));
};

// Event Listeners
document.getElementById('sort-price').addEventListener('click', sortByPrice);
document.getElementById('view-more').addEventListener('click', () => {
    document.getElementById('adopt').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// Initialize the function
loadCategories();
loadPets();