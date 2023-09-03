function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeNav()
    } else {
        openSideNav()
    }
})

let homeData = document.getElementById("demo")

async function getApiData(name){
    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let food = await apiData.json();
    
    if(food != null){
        DisplayHomeData(await food.meals)
        console.log(food.meals)
    // return food.meals 

    }
    
}
async function getApiDataLetter(letter){
    let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    let food = await apiData.json();
    if(food != null){
        DisplayHomeData(await food.meals)
        console.log(food.meals)
    // return food.meals 

    } 
}

function DisplayHomeData(arr){
    let cartona = "";
    // console.log(arr);
    for (let i=0; i< 20; i++)
    {
        cartona +=`
    <div class="col-md-3 mt-5">
            <div id="mealcont" class="content position-relative">
            <img src='${arr[i].strMealThumb}' id="meal"  class=" w-100 " alt="">

            <div id="overlay" onclick="DisplayInstructions(${i})" class="overlay position-absolute d-flex align-items-center justify-content-start ">
            <h3>${arr[i].strMeal}</h3>
            
            </div>
            </div>
    
    </div>   `
}

homeData.innerHTML=cartona;
}



function DisplayInstructions(index){
    let cartona = "";
    for(let i=0 ; i<arr.length ; i++)
    {
        if (i==index)
        {
        cartona+= `
        <div class="col-md-4 mt-5">
        <img src="${arr[i].strMealThumb}" id="meal"  class=" w-100 " alt="">
        <h3>${arr[i].strMeal}</h3>
        </div>
        <div class="col-md-8 mt-5">
        <h3>Instructions: <span>${arr[i].strInstructions}</span></h3>
        </div>

        `
        }
    }    
    homeData.innerHTML=cartona; 
}


$("#searchbar").hide()
$("#searchkey").click( function(){
    $("#searchbar").show()
    closeNav()
})

 async function getCatData(){
    let catData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let categs = await catData.json();
    // console.log(categs)
    return categs.categories 
}

function DisplayCatData(arr){
let cartona = "";
for (let i=0; i<arr.length; i++)
{
    cartona +=`
    <div class="col-md-3 mt-5">
            <div id="mealcont" onclick="getCatList('${arr[i].strCategory}')" class="content position-relative">
            <img src=" ${arr[i].strCategoryThumb}" id="meal"  class=" w-100 " alt="">

            <div id="overlay"  class="overlay  position-absolute d-flex align-items-center justify-content-start ">
            <p>${arr[i].strCategoryDescription}</p>
            
            </div>
            </div>
    </div>   
    `;
}
homeData.innerHTML=cartona;


}

async function getCatList(name){
    let catData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    console.log(catData)

    let categs = await catData.json();
    console.log(categs)
    if(categs.meals != null){
        console.log("ana henaaaaaaaaa")
        DisplayHomeData(await categs.meals)
        console.log(categs.meals)
    // return food.meals 

    } 
}

 $("#categoryKey").click(async function(){
    let cat = await getCatData()
    DisplayCatData(cat)
    closeNav()
    
 })


 async function getAreaData(){
    let areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areas = await areaData.json();
    // console.log(areas)
    return areas.meals 
}

 
 function DisplayAreaData(arr){
    let cartona = "";
    for (let i=0; i<arr.length; i++)
    {
        cartona +=`
        <div class="col-md-3 mt-5">
           
           <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
           <h3 class="text-white">${arr[i].strArea}</h3>
        
        </div>
        `
    }
    homeData.innerHTML=cartona;

 }

 $("#areakey").click(async function(){
    let area = await getAreaData()
    DisplayAreaData(area)
    closeNav()
 })

 async function getIngData(){
    let IngData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let ings = await IngData.json();
    // console.log(ings)
    return ings.meals 
}

 
 function DisplayIngaData(arr){
    let cartona = "";
    for (let i=0; i<arr.length; i++)
    {
        cartona +=`
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer mt-4">
                        <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                        <h3 class="text-white">${arr[i].strIngredient}</h3>
                        <p class="text-white">${arr[i].strDescription}</p>
                </div>
        </div>
        `
    }
    homeData.innerHTML=cartona;

 }

 async function getIngredientsMeals(ingredients) {
    demo.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    DisplayHomeData(response.meals.slice(0, 20))

}

 $("#ingKey").click(async function(){
    let ing = await getIngData()
    DisplayIngaData(ing)
    closeNav()
 })




 $("#contactKey").click(function(){
    window.location.href = 'contact.html'
    closeNav()


 })

 async function start(){
    let meals = await getApiData("")
    DisplayHomeData(meals)
    
 }

 start()
 