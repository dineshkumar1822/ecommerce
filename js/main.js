var productList = [
    {
        productId : "p01",
        name: "Acer Zenbook3",
        price: 1500,
        topProduct: true,
        category : "Laptop",
        imgUrl : "./images/Acer(Zenbook3).jpeg"
    },
     {
         productId : "p02",
        name: "Alcatel(8a3b1)",
        price: 400,
        topProduct: true,
        category : "Tab",
        imgUrl : "./images/Alcatel(8a3b1).jpeg"
    },
    {
        productId : "p03",
        name: "Alcatel(iTab2)",
        price: 1700,
        category: "Tab",
        imgUrl : "./images/Alcatel(iTab2).jpeg"
    },
     {
         productId : "p04",
        name: "AsusTuf",
        price: 300,
        category: "Laptop",
        imgUrl : "./images/AsusTuf2.jpeg"
    },
     {
         productId : "p05",
        name: "Boat(rockerz)",
        price: 700,
        category: "Headset",
        imgUrl : "./images/Boat(rockerz).jpeg"
    }, 
    {
        productId : "p06",
        name: "BoatAirpodX",
        price: 1500,
        category : "Headset",
        imgUrl : "./images/BoatAirpodX.jpeg"
    },
     {
         productId : "p07",
        name: "canon-eos-eos-3000d-dslr",
        price: 500,
        category : "Camera",
        imgUrl : "./images/canon-eos-eos-3000d-dslr.jpeg"
    },
    {
        productId : "p08",
        name: "ASUS-Rog",
        price: 700,
        topProduct: true,
        category: "Laptop",
        imgUrl : "./images/ASUS-Rog.jpeg"
    },
     {
         productId : "p09",
        name: "Fuji(X7)",
        price: 300,
        topProduct: true,
        category: "Camera",
        imgUrl : "./images/Fuji(X7).jpeg"
    },
     {
         productId : "p10",
        name: "iphone(SE)",
        price: 900,
        category: "Mobile",
        imgUrl : "./images/iphone(SE).jpeg"
    },
      {
          productId : "p11",
        name: "iphone4",
        price: 1500,
        category : "Mobile",
        imgUrl : "./images/iphone4.webp"
    },
     {
         productId : "p12",
        name: "Lenovo(YogaTab3)",
        price: 3900,
        category : "Tab",
        imgUrl : "./images/Lenovo(YogaTab3).jpeg"
    },
     {
         productId : "p13",
        name: "Lenovo(MadX3)",
        price: 900,
        category : "Laptop",
        imgUrl : "./images/LenovoYoga3.webp"
    },
     {
         productId : "p14",
        name: "LG(M5641)",
        price: 1500,
        category : "TV",
        imgUrl : "./images/LG(M5641).jpeg"
    },
     {
         productId : "p15",
        name: "LG(z561a)",
        price: 1500,
        category : "TV",
        imgUrl : "./images/LG(z561a).jpeg"
    },
    {
          productId : "p16",
        name: "SamsungS10",
        price: 1500,
        category : "Mobile",
        imgUrl : "./images/SamsungS10.jpg"
    },
    {
          productId : "p17",
        name: "SamsungNote10",
        price: 1500,
        category : "Mobile",
        imgUrl : "./images/SamsungNote10.jpg"
    },
];

var category = ['All category' , 'Laptop', 'Tab', 'Headset','Camera', 'TV', 'Mobile'];

var pageNo = 1;

var selectedCategory = 'All category';

var pageSize = 9;

var editProductIndex = null;

var priceSliderValue = 0;   

document.getElementById('priceRange').value = 0;

var range = "default";

document.getElementById("sortingRange").value = range;

var updatedProduct = [];

getCategory();

function getCategory(){     
     var categoryItem = '';
    category.forEach((obj, index)=> {
        categoryItem += `<p class=${selectedCategory == obj ? "selected-category" : "pointer" } id='${obj}' onclick="categoryFilter('${obj}')">${obj}</p>`
    })
        document.getElementById('category-list').innerHTML = categoryItem
    }


    var dropdownlist = '';
    category.forEach((obj, index)=> {
        if(obj !==  'All category'){
             dropdownlist += `<option>${obj}</option>`
        }
       
    })
document.getElementById('categoryListSelect').innerHTML = dropdownlist  
document.getElementById('categoryListSelectEdit').innerHTML = dropdownlist
document.getElementById('product-total').innerHTML = productList.length;
document.getElementById("input-product-file").value = null;
document.getElementById("input-product-name").value  = null;
document.getElementById("input-product-price").value = null;

// product listing in onload 
getProductList(productList);



// to add the product's item
function addProduct(){
  
   let name = document.getElementById("input-product-name").value;
    let price= document.getElementById("input-product-price").value
    let inputFile = document.getElementById("input-product-file").files[0];
    let isTopProduct = document.getElementById('topProduct').checked 

    if(!name){
        document.getElementById("error-msg-title").innerHTML = "Please Enter the Title";
        return
    }
     document.getElementById("error-msg-title").innerHTML = "";


    if(!price){
        document.getElementById("error-msg-price").innerHTML = "Please Enter the Price";
        return
    }
    document.getElementById("error-msg-price").innerHTML = "";

    if(!inputFile){
        document.getElementById("error-msg-file").innerHTML = "Please Upload the file";
        return
    }
    document.getElementById("error-msg-file").innerHTML = "";


    const file = inputFile;
    const reader = new FileReader();

    reader.onloadend = () => {
        productList.push({
            productId : 'pn' + productList.length,
            name: name,
            price: price,
            category: document.getElementById('categoryListSelect').value,
            topProduct : isTopProduct,
            imgUrl : reader.result
        })
        getProductList(productList);    
    };
    reader.readAsDataURL(file);
    document.getElementById("input-product-name").value = null
    document.getElementById("input-product-price").value = null
    document.getElementById("input-product-file").value = null ;
    document.getElementById("errormsg").innerHTML = "";
    document.getElementById('fileName').innerHTML = "";
    document.getElementById("cancelBtn").click();
    document.getElementById('topProduct').checked = false;
}

function editModelView(id){
    let product = productList.findIndex((obj) => obj.productId === id );
    editProductIndex = product;
    product = productList[product];
    document.getElementById("edit-product-name").value = product.name
    document.getElementById("edit-product-price").value = product.price
    document.getElementById('categoryListSelectEdit').value = product.category
    document.getElementById('editTopProduct').checked = product.topProduct
    document.getElementById('editModelViewBtn').click();
}

function editProduct(){
  
    let name = document.getElementById("edit-product-name").value;
    let price= document.getElementById("edit-product-price").value
    let inputFile = document.getElementById("edit-product-file").files[0];
    //let isTopProduct = document.getElementById('editTopProduct').checked 

    if(!name){
        document.getElementById("error-msg-title").innerHTML = "Please Enter the Title";
        return
    }
     document.getElementById("error-msg-title").innerHTML = "";


    if(!price){
        document.getElementById("error-msg-price").innerHTML = "Please Enter the Price";
        return
    }
    document.getElementById("error-msg-price").innerHTML = "";

    // if(!inputFile){
    //     document.getElementById("error-msg-file").innerHTML = "Please Upload the file";
    //     return
    // }


    document.getElementById("error-msg-file").innerHTML = "";


    let editObj = productList[editProductIndex]

    editObj['name'] = name;
    editObj['price'] = price;
    editObj['topProduct'] =  document.getElementById('editTopProduct').checked
    editObj['category'] = document.getElementById('categoryListSelectEdit').value


    if(!inputFile){
        productList[editProductIndex] = editObj

        getProductList(productList);

    }else{

        const file = inputFile;
        const reader = new FileReader();

        reader.onloadend = () => {

            editObj['imgUrl'] =  reader.result;
            productList[editProductIndex] = editObj
            
            getProductList(productList);    
        };
        reader.readAsDataURL(file);

    }



    document.getElementById("edit-product-name").value = null
    document.getElementById("edit-product-price").value = null
    document.getElementById("edit-product-file").value = null ;
    document.getElementById("errormsg").innerHTML = "";
    document.getElementById('editFileName').innerHTML = "";
    document.getElementById("editCancelBtn").click();
    document.getElementById('topProduct').checked = false;
    categoryFilter('All category')
}


function getFileName(){
    let file = document.getElementById('input-product-file')
    document.getElementById('fileName').innerHTML = file.files[0].name
    document.getElementById('error-msg-file').innerHTML = ""
}

function getEditFileName(){
    let file = document.getElementById('edit-product-file')
    document.getElementById('editFileName').innerHTML = file.files[0].name
    document.getElementById('error-msg-file').innerHTML = ""
}

function sortProduct(){
     range = document.getElementById('sortingRange').value;

    getProductList(productList, true);
}

function changePage(number){
    pageNo = number;
    getProductList(productList, null, true)
}

function categoryFilter(val){
    selectedCategory = val;
    document.getElementById(val).className="selected-category"
     getCategory();
    document.getElementById('priceRange').value = 0;
    pageNo = 1;
    getProductList(productList)
}


function getProductList(products, disableTopProductSort, disableUpdateProduct){


    // Category Filter
    if(selectedCategory !== "All category" && selectedCategory){
        products =  products.filter(product => product.category === selectedCategory)
    }



     var sortedProduct  = JSON.parse(JSON.stringify(products))

    // Range Sort

    if(range == 'low'){
        products = sortedProduct.sort(function(a,b){
            return a.price - b.price;
            }
        );
    }
    if(range == 'high'){
        products = sortedProduct.sort(function(a,b){
            return b.price - a.price;
            }
        );
    }

    if(range == "default"){
        products = products
    }

    console.log(products, selectedCategory)







    // Show Product List 
    var productItem = '';
    var topProducts = '';
    let totalProduct = Math.ceil(products.length/pageSize);
    
    
    var paginationList = ``

    var i;
    for (i = 0; i < totalProduct; i++) {
        if(pageNo === i+1){
            paginationList += `<li class="page-item"><button class="page-link" style="border:1px solid #fa475a;  color:#fa475a;" onclick="changePage(${i+1})">${i+1}</button></li>`;
  
        }else{
            paginationList += `<li class="page-item"><button class="page-link" style="border:1px solid #ccc; color:#ccc;" onclick="changePage(${i+1})">${i+1}</button></li>`;
  
        }
   
    } 

    document.getElementById('pagination').innerHTML = paginationList;

    if(!disableUpdateProduct){
        updatedProduct = JSON.parse(JSON.stringify(products))

        var maxPrice =  Math.max(...products.map((obj)=> obj.price));

        document.getElementById('priceRange').max = maxPrice

        document.getElementById("priceMax").innerHTML =  maxPrice
       
    }
  
    
    let endPageNumber = pageNo * pageSize;
    let startPageNumber = endPageNumber - pageSize ;
    var slicedproducts = products.slice(startPageNumber, endPageNumber);
    slicedproducts.forEach((obj, index)=> {

    productItem += `<div class="col-12 col-sm-4">
                <div class="card mb-3 box-shadow" onclick="editModelView('${obj.productId}');">
                <img src=${obj.imgUrl} alt="Card image cap">
                <div class="card-body text-center">
                    <h5>${obj.name}</h5>
                    <p>${obj.price}</p>
                </div>
                <br>
            </div>
        </div>`
    })

     productList.forEach((obj, index)=> {

        if(obj.topProduct){
              topProducts += ` <section class="row py-2">
                            <div class="col-4">
                                <img style="max-height:80px;object-fit: contain;" src=${obj.imgUrl}>
                            </div>
                            <div class="col-8">
                                <h6>${obj.name}</h6>
                                <div class="rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <span style="font-size:13px;color:#ccc;">$${obj.price}</span>
                            </div>
                        </section>`

        }
    })


   document.getElementById('product-item').innerHTML = productItem;

   if(!disableTopProductSort){
        document.getElementById('top-products').innerHTML = topProducts; 
   }
}

function uploadBtn(){
    document.getElementById("input-product-file").click()
}


function changePrice(){
    var priceRangeValue = document.getElementById('priceRange').value;
   
    document.getElementById("priceMax").innerHTML =  priceRangeValue
       

    var filteredProduct = updatedProduct.filter((obj)=>  {
        return  priceRangeValue >= obj.price 
    })

    getProductList(filteredProduct, null, true)
}

