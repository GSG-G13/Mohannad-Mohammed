// const btnSearch = document.getElementById("btn-search");
// const searchInput = document.getElementById("search")
const container = document.querySelector("#news-container-2");

const xhr = new XMLHttpRequest();
const url2 = "https://inshorts.deta.dev/news?category=technology";

function arrayData(dataObj) {
  const { id, title, author, content, date, imageUrl } = dataObj;

  //   container.textContent = '';

  return `
    <div id=${id} class='card'>
      <div class= 'head'>
      <span class='date'>${date}</span>
      <h4 class='title'>${title}</h4>
      <span class='details'><span>More Details</span><i class="fa-regular fa-square-caret-down collapse"></i></span>
      </div>
      <div class='card__body hidden'>
        <img class='image'src=${imageUrl} alt =''>
        <p class='content'>${content}</p>
      </div>
    <div class='tail'>
    <span class='author'> Writen by ${author}</span>
    </div>
    </div>
    `;
}
const render = function (obj) {
  container.insertAdjacentHTML("afterbegin", arrayData(obj));
};
xhr.open("GET", url2, true);
xhr.send();
xhr.onreadystatechange = () => {
  if (xhr.status === 200 && xhr.readyState === 4) {
    const datanews = JSON.parse(xhr.responseText);
    datanews.data.forEach((el) => render(el));
  }

  const toLower = (str) => {
    return str.toLowerCase();
  };
};
