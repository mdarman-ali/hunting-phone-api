const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones =>{
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    phones = phones.slice(0,12);

    phones.forEach(phone => {
        // console.log(phone);
        // Create a div
        const phoneCard = document.createElement('div');

        phoneCard.classList = `grid justify-items-center card bg-base-100 shadow-xl p-6`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body ">
            <h2 class="card-title justify-center">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // append Child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}


// handle search button
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
} 


// handle search recap
const handleSearch2 = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// loadPhone();