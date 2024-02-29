const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container card before adding new cards
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }


    // console.log('is Show All',isShowAll);
    // display only first 12 phones if not show All
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

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
            <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // append Child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}


// Show Details
const handleShowDetails = async (id) =>{
    console.log('Clicked show details',id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    
    const phone = data.data;
    showPhonesDetails(phone);
}

// Show modal 
const showPhonesDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.classList.add('leading-4');
    showDetailContainer.innerHTML = `
        
        <img src = "${phone.image}" alt="" class="bg-slate-100 p-6 rounded-3xl"  />
        <p class="leading-8"><span class="font-semibold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p class="leading-8"><span class="font-semibold">DisplaySize: </span>${phone?.mainFeatures?.displaySize
        }</p>
        <p class="leading-8"><span class="font-semibold">Chipset : </span>${phone?.mainFeatures?.chipSet}</p>
        <p class="leading-8"><span class="font-semibold">Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p class="leading-8"><span class="font-semibold">Slug: </span>${phone?.slug}</p>
        <p class="leading-8"><span class="font-semibold">Brand : </span>${phone?.brand}</p>
        <p class="leading-8"><span class="font-semibold">GPS : </span>${phone?.others?.GPS
        }</p>
        
    `;

    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
} 


// handle search recap
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle Show All
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();