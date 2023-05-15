export const search = () => {
  const search = document.querySelector(".search-block");
  const searchInput = search.querySelector(".search-block>input");
  const searchButton = search.querySelector(
    ".search-block>button#button-addon2"
  );

  const renderGoods = (data) => {
    const longGoodsList = document.querySelector(".long-goods-list");
    console.log(data);
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

  const getData = (val) => {
    fetch("/db/db.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arr = data.filter((item) => {
          return item.name.toLowerCase().includes(val);
        });
        localStorage.setItem("goods", JSON.stringify(arr));
        window.location.pathname !== "/goods.html"
          ? (window.location.href = "/goods.html")
          : renderGoods(arr);
      });
  };

  searchButton.addEventListener("click", () => {
    let searchVal = searchInput.value;
    getData(searchVal);
  });
};
