fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((res) => res.json())
  .then((data) => Diebtn(data.categories));

function onloading() {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("videos-container").classList.add("hidden");
}
function offloading() {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("videos-container").classList.remove("hidden");
}

function remove() {
  const abtn = document.getElementsByClassName("bg");
  for (let b of abtn) {
    b.classList.remove("bg");
  }
}
function Diebtn(data) {
  const divConti = document.getElementById("btnconti");
  for (let d of data) {
    const btnconti = document.createElement("div");
    btnconti.innerHTML = `
      <button id="id-${d.category_id}" onclick="catagory(${d.category_id})" class="btn text-lg bg-gray-200 hover:bg-[#FF1F3D] hover:text-white">${d.category}</button>
      `;
    divConti.append(btnconti);
  }
}

function allvideos(search = "") {
  onloading();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`
  )
    .then((res) => res.json())
    .then((data) => {
      remove();
      document.getElementById("allbtn").classList.add("bg");
      autocall(data.videos);
    });
}

const catagory = (id) => {
  onloading();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((rem) => rem.json())
    .then((data) => {
      remove();
      const clicked = document.getElementById(`id-${id}`);
      clicked.classList.add("bg");
      autocall(data.category);
    });
};
function autocall(video) {
  const videoSetion = document.getElementById("videos-container");
  videoSetion.innerHTML = "";
  if (video.length === 0) {
    videoSetion.innerHTML = `
  <div
          class="col-span-full items-center justify-center mt-24 flex flex-col"
        >
          <img class="w-[150px]" src="./img/Icon.png" alt="" />
          <h2 class="text-2xl mt-3 text-center font-bold">
            Oops!! Sorry, There is no content here
          </h2>
        </div>
  `;
    offloading();
    return;
  }
  video.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100">
    <figure class="relative">
    <img
      class="object-cover w-full h-[200px]"
      src="${video.thumbnail}"
      alt="Shoes"
    />
    <span
      class="absolute bottom-2 right-2 bg-[#17171790] text-sm text-white p-1 rounded-md"
      >3 ghon ta 40 mint ago</span
    >
  </figure>
  <div class="pt-5">
    <div class="flex gap-3">
      <div>
        <div class="avatar">
          <div
            class="ring-primary ring-offset-base-100 mt-2 w-8 rounded-full ring ring-offset-2"
          >
            <img src="${video.authors[0].profile_picture}" />
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-xl font-bold">${video.title}</h3>
       <div class="flex gap-2 items-center">
        <p>${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified == true
            ? `<img class="w-7 h-7" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000"/>`
            : ""
        }
          </span>
        </div>
        <p class="text-lg text-[#00000090]">${video.others.views} views</p>
      </div>
    </div>
  </div>
  <button onclick="detailbtn('${
    video.video_id
  }')" class="btn mt-1 btn-block">Show Details</button>
</div>
    `;
    videoSetion.append(div);
  });
  offloading();
}
const detailbtn = (id) => {
  const detailId = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(detailId)
    .then((res) => res.json())
    .then((data) => displaymodal(data.video));
};
function displaymodal(data) {
  document.getElementById("my_modal_1").showModal();
  const modal = document.getElementById("detailsConti");
  modal.innerHTML = `
<div class="card bg-base-100 image-full w-full shadow-sm">
  <figure>
    <img class="brightness-50" src="${data.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2
      class="text-3xl font-bold pb-1 mb-2 border-b-2 border-yellow-600 text-center"
    >
      ${data.title}
    </h2>
    <div
      class="border-b-1 bg-[#1d1c1c] border-red-700 flex  justify-between items-center"
    >
      <h3 class="text-xl pb-1">
        Author: ${data.authors[0].profile_name}
      </h3>
      <div>
        <img class="w-12"  src="${data.authors[0].profile_picture}" />
      </div>
    </div>
    <p class="text-xl text-white">'${data.description}'</p>
  </div>
</div>
  `;
}
function toggleSearch() {
  document.querySelector(".search-container").classList.toggle("active");
}
document.getElementById("search").addEventListener("keyup", (k) => {
  const letter = k.target.value;
  allvideos(letter);
});
function reload(){
  location.reload()
}
allvideos();
