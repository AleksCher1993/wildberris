import { db } from "./db.js";

export const getGoods = () => {
  const navLinks = document.querySelectorAll(".navigation-item>a");
  const more = document.querySelector(".more");

  const renderGoods = (data) => {
    const longGoodsList = document.querySelector(".long-goods-list");
    longGoodsList.innerHTML = "";
    data.forEach((item) => {
      let div = document.createElement("div");
      div.classList.add("col-lg-3");
      div.classList.add("col-sm-6");
      div.innerHTML = `
        <div class="goods-card">
            <span class="label" ${
              item.label === "" ? 'style="display:none"' : null
            }>${item.label}</span>
            <img
              src="db/${item.img}"
              alt="image: ${item.name}"
              class="goods-image"
              />
              <h3 class="goods-title">${item.name}</h3>
              <p class="goods-description">${item.description}</p>
              <button class="button goods-card-btn add-to-cart" data-id="${
                item.id
              }">
                <span class="button-price">$${item.price}</span>
              </button>
              </div>`;

      longGoodsList.appendChild(div);
    });
  };

  const getData = (data,key, value) => {
    let arr = key
    ? data.filter((item) => {
        return item[key] === value;
      })
    : data;
  localStorage.setItem("goods", JSON.stringify(arr));
  window.location.pathname !== "wildberris/goods.html"
    ? (window.location.href = "wildberris/goods.html")
    : renderGoods(arr);
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      let field = link.dataset.field;
      let value = link.innerHTML;

      getData(db(),field, value);
    });
  });

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "wildberris/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }

  if (more) {
    more.addEventListener("click", (event) => {
      event.preventDefault();
      getData(db());
    });
  }
};
