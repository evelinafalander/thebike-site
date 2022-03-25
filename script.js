window.addEventListener("DOMContentLoaded", init);

function init() {
  loadData();
}

async function loadData() {
  const response = await fetch(
    "http://evvs.me/wp-bikesite/wp-json/wp/v2/bike?_embed"
  );
  console.log("response2", response);
  const bikeData = await response.json();

  displayBike(bikeData);
}

async function displayBike(bikes) {
  bikes.forEach((bike) => {
    console.log(bike);

    //grab templated
    const template = document.querySelector(".bikeTemplate").content;

    //clone it
    const copy = template.cloneNode(true);

    //change content
    copy.querySelector("img").src =
      bike._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.large.source_url;
    copy.querySelector(".brandName h3").textContent = bike.brand;
    copy.querySelector(".brandName h2").textContent = bike.title.rendered;
    copy.querySelector(".price").textContent = `$ ${bike.price}`;
    copy.querySelector(".color").textContent = bike.colours;
    copy.querySelector(".stock").textContent = bike.in_stock;

    //grab parent
    const parent = document.querySelector("main");

    //apend child
    parent.appendChild(copy);
  });
}
