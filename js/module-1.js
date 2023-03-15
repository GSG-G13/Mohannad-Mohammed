const newsContainers = document.querySelector("#news-container-1");
const technologyContainer = document.querySelector("#news-container-2");

const containers = document.querySelector(".containers");
const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search");
const linksList = document.querySelector(".links-list");

const component = function (obj) {
  const { id, title, author, content, date, imageUrl } = obj;

  return `
  <div id=${id} class='card'>
    <div class= 'head'>
    <span class='date'>${date}</span>
    <h4 class='title'>${title}</h4>
    <span class='details'><span>More Details</span><i class="fa-regular fa-square-caret-down collapse"></i></span>
    </div>
    <div class='card__body'>
      <img class='image'src=${imageUrl} alt =''>
      <p class='content'>${content}</p>
    </div>
  <div class='tail'>
  <span class='author'> Writen by ${author}</span>
  </div>
  </div>
  `;
};

const renderComponent = function (obj) {
  newsContainers.insertAdjacentHTML("afterbegin", component(obj));
};

const toLowerFn = (str) => {
  return str.toLowerCase();
};
const filterHandler = function (obj) {
  newsContainers.innerHTML = "";
  obj
    .filter(({ title }) => toLowerFn(title).includes(toLowerFn(search.value)))
    .forEach((el) => renderComponent(el));
};
const newsAPI = function (url, cb) {
  const newsxhr = new XMLHttpRequest();
  newsxhr.open("GET", url);
  newsxhr.send();
  newsxhr.onreadystatechange = () => {
    if (newsxhr.status === 200 && newsxhr.readyState === 4) {
      const newsData = JSON.parse(newsxhr.responseText);
      const { data } = newsData;
      cb(data);
    }
  };
};

newsAPI("https://inshorts.deta.dev/news?category=science", (data) => {
  data.forEach((el) => renderComponent(el));
  btnSearch.addEventListener("click", () => filterHandler(data));
  document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) filterHandler(data);
  });
});

searchInput.addEventListener("keyup", function () {
  if (!searchInput.value) {
    newsContainers.innerHTML = "";
    newsAPI("https://inshorts.deta.dev/news?category=science", (data) => {
      data.forEach((el) => renderComponent(el));
    });
  }
});

containers.addEventListener("click", (e) => {
  if (e.target.classList.contains("collapse")) {
    const cardBody = e.target.closest(".card").querySelector(".card__body");
    cardBody.classList.toggle("hidden");
  }
});

const technology = document.querySelector(".technology");
const science = document.querySelector(".science");

technology.addEventListener("click", () => {
  technologyContainer.style.display = "block";
  newsContainers.style.display = "none";
});

science.addEventListener("click", () => {
  technologyContainer.style.display = "none";
  newsContainers.style.display = "block";
});
