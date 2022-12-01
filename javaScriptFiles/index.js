//localstorage to hold car data in json
//created an empty json object
var cars = [] // array to used in memory
var car = {
    model: null,
    make: null,
    year: null,
    color: null,
    regNum: null,
    image: null
}

 //adding to localstorage 
function carDataStorage(){
    if(localStorage.getItem('gallery') == null) {
        localStorage.setItem('gallery', JSON.stringify(cars)) // used disk
    } else{
        cars = JSON.parse(localStorage.getItem('gallery'))
    }
    
}
//function will be called only once on page load
carDataStorage()


// function to add cars to a car list
addToCarList = function () {
    //creating object
    var md = document.getElementById('model')
    var mk = document.getElementById('make')
    var yr = document.getElementById('year')
    var cl = document.getElementById('color')
    var rn = document.getElementById('regNum')
    var img = document.getElementById('image')
    // takes value in the input field and store it in car
    //assign value to properties
    let nCar = Object.create(car)
    nCar.make = mk.value
    nCar.model = md.value
    nCar.year = yr.value
    nCar.color = cl.value
    nCar.regNum = rn.value
    nCar.image = img.value
   // update array
   console.log(car)
    if(selectedIndex == -1){
        cars.push(nCar) // car properties is pushed to cars array   
    } else{
        cars.splice(selectedIndex,1,nCar)
    }
    // add to localstorage
    localStorage.setItem('gallery', JSON.stringify(cars))


    console.log(cars)
    clear(md, mk, yr, cl, rn, img)
    SweetAlert()
    console.log('loading data from localstorage')
    loadData()
}
// addToCarList();

function clear(md,mk,yr,cl,rn,img) {   // function to clear object
    md.value = ""
    mk.value = ""
    yr.value = ""
    cl.value = ""
    rn.value = ""
    img.value = ""
}

function SweetAlert() {
Swal.fire(
    'Good job!',
    'You have added/updated a car listing!',
    'success'
  )
}

function photoUpload() {
    var pht = document.getElementById('photo')
    pht.src = document.getElementById('image').value
}


function loadData() { // data is collected from local storage
    var data = JSON.parse(localStorage.getItem('gallery'))
    //map() runs a function according to the number of elements.
  var result = data.map(function card(dt,idx) {
    return `<div class="col-md-3">
    <div class="card" style="width: 18rem;">
        <img src="${dt.image}" class="card-img-top" alt="car Photo">
        <div class="card-body">
        <h5 class="card-title">${dt.make} - ${dt.model}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                the
                card's content.</p>
                <button type="button" id="button" class="btn btn-danger" onclick="deletionAlert(${idx})">Remove</button>
                <button type="button" id="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addcar" onclick="editCarCard(${idx})">Edit</button>
        </div>  
    </div>
</div>`
  })
   document.getElementById('carList').innerHTML = result.join("");
}
loadData() 
// fetch all records from local storage

function deleteCar(idx) {
    // need to find way to get index number 
    cars.splice(idx, 1)
    localStorage.setItem('gallery', JSON.stringify(cars));
    
}

function deletionAlert(idx) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteCar(idx)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        location.reload();
      })
}


 function clearContent() {
    document.getElementById('model').value = ""
    document.getElementById('make').value = ""
    document.getElementById('year').value = ""
    document.getElementById('color').value = ""
    document.getElementById('regNum').value = ""
    document.getElementById('image').value = ""
    
    // selectedIndex = ;
 }
var selectedIndex = -1;

function editCarCard(i) {
    var carObj = cars[i]
    document.getElementById('model').value = carObj.model
    document.getElementById('make').value = carObj.make
    document.getElementById('year').value = carObj.year
    document.getElementById('color').value = carObj.color
    document.getElementById('regNum').value = carObj.regNum
    document.getElementById('image').value = carObj.image
    document.getElementById('submit').innerHTML = "Save Change";

    selectedIndex = i
}

 function addButton() {
    clearContent()  
    document.getElementById('submit').innerHTML = "Add to list";
    selectedIndex = -1
 }

 


const searchBar = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

function searchCar() {
    // console.log(cars)
    const filterResult = cars.filter(car =>
        searchBar.value.toLowerCase() === car.make.toLowerCase() || searchBar.value == car.model.toLowerCase() || searchBar.value === car.color.toLowerCase() || searchBar.value === car.year
    )
    var result = filterResult.map(function card(dt) {
        return `<div class="col-md-3">
        <div class="card" style="width: 18rem;">
            <img src="${dt.image}" class="card-img-top" alt="car Photo">
            <div class="card-body">
            <h5 class="card-title">${dt.make} - ${dt.model}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                    the
                    card's content.</p>
            </div>  
        </div>
    </div>`
    })
    document.getElementById('carList').innerHTML = filterResult.length > 0 ? result.join("") : `<div>No Cars Found</div>`;

}
// searchCar()
// searchButton.addEventListener('click',searchCar)

function reload(){
    // location.reload();
    searchBar.value =""
    loadData() 
}
