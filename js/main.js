let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let createBtn = document.getElementById("create-btn");
let deleteSection = document.getElementById("delete-all");
// Create
let mode = "create";
let tmp;
// Search
let search = document.getElementById("search");
let searchMode = "search-by-title";

let productList = document.getElementById("products-list");

function getTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - Number(discount.value);
    total.value = res;
    total.style.backgroundColor = "#8BDD77";
  } else {
    total.value = 0;
    total.style.backgroundColor = "#e45562";
  }
}

let products = [];

if (localStorage.products != null) {
  products = JSON.parse(localStorage.products);
}

let id = 0;
let date = new Date();
createBtn.onclick = function () {
  let data = {
    id,
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value.toLowerCase(),
    date:
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    data.count < 100
  ) {
    if (mode == "create") {
      if (data.count > 1) {
        for (let i = 0; i < data.count; i++) {
          products.push(data);
        }
      } else {
        products.push(data);
      }
    } else {
      products[tmp] = data;

      let count = document.getElementById("count");
      count.disabled = false;
      count.style.backgroundColor = "#fff";
      count.classList.remove("count-placeholder-color");

      createBtn.innerText = "Create";
      mode = "create";
    }
    emptyValue(title, price, taxes, ads, discount, total, count, category);
  }

  localStorage.setItem("products", JSON.stringify(products));
  readProduct();
};

function emptyValue(...args) {
  for (const item of [...args]) {
    item.value = "";
  }
  total.style.backgroundColor = "#e45562";
}

function readProduct() {
  productList.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let html = `
          <tr>
            <td>${i + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td>${product.date}</td>

            <td>
              <svg onclick='updateProduct(${i})' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#007BFF" class="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </td>
            <td>
              <svg onclick='deleteProduct(${i})' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#DC3545" class="bi bi-trash"
                viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </td>
          </tr>`;
    productList.innerHTML += html;
    if (products.length > 0) {
      deleteSection.innerHTML = `
      <button onclick="deleteAllProduct()" type="button" id="delete-btn" class="delete-all">Delete All (${products.length})</button>
      `;
    }
  }
  id++;
}
readProduct();

function deleteProduct(id) {
  products.splice(id, 1);
  localStorage.products = JSON.stringify(products);
  readProduct();
}

function deleteAllProduct() {
  localStorage.clear();
  products.splice(0);
  readProduct();
  deleteSection.innerHTML = "";
  emptyValue(title, price, taxes, ads, discount, total, count, category);
}

function updateProduct(i) {
  getTotal();

  let product = products[i];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;

  let count = document.getElementById("count");
  count.disabled = true;
  count.style.backgroundColor = "#e45562";
  count.style.cursor = "not-allowed";
  count.classList.add("count-placeholder-color");

  createBtn.innerText = "Update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function getSearchMode(id) {
  searchMode = id;
  // console.log(searchMode);
  search.focus();

  if (searchMode == "search-by-title") {
    search.placeholder = "Search By Title";
  } else {
    search.placeholder = "Search By Category";
  }
  search.value = "";
  readProduct();
}

function doSearch(value) {
  let content = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    function searchType(type) {
      let html = `
          <tr>
            <td>${i + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td>${product.date}</td>

            <td>
              <svg onclick='updateProduct(${i})' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#007BFF" class="bi bi-pencil-square"
                viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </td>
            <td>
              <svg onclick='deleteProduct(${i})' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#DC3545" class="bi bi-trash"
                viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </td>
          </tr>`;
      if (product[type].includes(value.toLowerCase())) {
        productList.innerHTML = "";
        content += html;
      }
    }

    if (searchMode == "search-by-title") {
      searchType("title");
    } else {
      searchType("category");
    }
  }

  productList.innerHTML = content;
}
