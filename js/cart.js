export const cart = () => {
  const cartButton = document.querySelector(".button-cart");
  const cartPopup = document.getElementById("modal-cart");
  const cartClose = cartPopup.querySelector(".modal-close");
  const longGoodsList = document.querySelector(".long-goods-list");
  const cartTableGoods = cartPopup.querySelector(".cart-table__goods");
  const modalForm = document.querySelector(".modal-form");
  const inputName = modalForm.querySelector("input[name=nameCustomer]");
  const inputPhone = modalForm.querySelector("input[name=phoneCustomer]");
  const cardTableTotal = cartPopup.querySelector(".card-table__total");
  const shortgoodslist = document.querySelector('.short-goods')
  const itemsList=document.querySelectorAll('.goods-card-other')
  // ------------------------

  function addToCard(id) {
    let cart = localStorage.getItem("newObj")
      ? JSON.parse(localStorage.getItem("newObj"))
      : [];
    let goods = JSON.parse(localStorage.getItem("goods"));
    let clickedgood = goods.find((elem) => {
      return elem.id === id;
    });
    if (cart.some((elem) => elem.id == clickedgood.id)) {
      cart.map((good) => {
        if (good.id == clickedgood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedgood.count = 1;
      cart.push(clickedgood);
    }

    localStorage.setItem("newObj", JSON.stringify(cart));
  }
  function renderCart() {
    cartTableGoods.innerHTML = "";
    if (localStorage.getItem("newObj")) {
      let goods = JSON.parse(localStorage.getItem("newObj"));

      goods.forEach((elem) => {
        let tr = document.createElement("tr");
        tr.insertAdjacentHTML(
          "beforeend",
          `
          <td>${elem.name}</td>
          <td>${elem.price}$</td>
          <td><button class="cart-btn-minus"">-</button></td>
          <td>${elem.count}</td>
          <td><button class=" cart-btn-plus"">+</button></td>
          <td>${elem.price * elem.count}$</td>
          <td><button class="cart-btn-delete"">x</button></td>
        `
        );

        tr.addEventListener("click", (e) => {
          if (e.target.classList.contains("cart-btn-minus")) {
            console.log("minus");
            minusToCart(elem.id);
          } else if (e.target.classList.contains("cart-btn-plus")) {
            console.log("plus");
            plusToCart(elem.id);
          } else if (e.target.classList.contains("cart-btn-delete")) {
            console.log("delete");
            let id = e.target.closest("tr");
            console.log(id);
            deleteToCart(elem.id);
          }
        });
        cartTableGoods.appendChild(tr);
      });
      let sum = goods.reduce((counter, elem) => {
        counter += elem.price * elem.count;
        return counter;
      }, 0);
      cardTableTotal.innerHTML = sum + "$";
    }
  }
  function deleteToCart(id) {
    let cart = JSON.parse(localStorage.getItem("newObj"));
    let c = cart.filter((elem) => {
      return elem.id !== id;
    });
    localStorage.setItem("newObj", JSON.stringify(c));
    renderCart();
  }
  function minusToCart(id) {
    let cart = JSON.parse(localStorage.getItem("newObj"));
    let c = cart.map((good) => {
      if (good.id == id && good.count !== 0) {
        good.count--;
      }
      return good;
    });
    localStorage.setItem("newObj", JSON.stringify(c));
    renderCart();
  }
  function plusToCart(id) {
    let cart = JSON.parse(localStorage.getItem("newObj"));
    let c = cart.map((good) => {
      if (good.id == id) {
        good.count++;
      }
      return good;
    });
    localStorage.setItem("newObj", JSON.stringify(c));
    renderCart();
  }
  function postData() {
    if (localStorage.getItem("newObj")) {
      let cartPost = JSON.parse(localStorage.getItem("newObj"));
      if (inputName.value != "" && inputPhone.value != "") {
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            cart: cartPost,
            name: inputName.value,
            phone: inputPhone.value,
          }),
        }).then(() => {
          cartPopup.style.display = "";
          localStorage.removeItem("newObj");
          inputName.value = "";
          inputPhone.value = "";
          inputName.style.border = "none";
          inputPhone.style.border = "none";
        });
      } else {
        inputName.style.border = "1px solid red";
        inputPhone.style.border = "1px solid red";
      }
    } else {
      alert("выберите товар");
    }
  }
  // ---------------------------------------
  inputName.addEventListener("input", () => {
    console.log(inputName.value);
  });
  inputPhone.addEventListener("input", () => {
    console.log(inputPhone.value);
  });
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postData();
  });
  cartButton.addEventListener("click", () => {
    cartPopup.style.display = "flex";
    renderCart();
  });
  cartClose.addEventListener("click", () => {
    cartPopup.style.display = "";
  });
  if (longGoodsList) {
    longGoodsList.addEventListener("click", (event) => {
      let t = event.target;
      if (t.closest(".add-to-cart")) {
        let btn = t.closest(".add-to-cart");
        let id = btn.dataset.id;

        addToCard(id);
      }
    });
  }
  if (shortgoodslist) {
    shortgoodslist.addEventListener("click", (event) => {
      let t = event.target;
      if (t.closest(".add-to-cart")) {
        let btn = t.closest(".add-to-cart");
        let id = btn.dataset.id;

        addToCard(id);
      }
    });
  }
  if (itemsList) {
    itemsList.forEach(item=>{
      item.addEventListener('click',(e)=>{
        let id=item.dataset.id
        addToCard(id);
      })
    })
  }
};
