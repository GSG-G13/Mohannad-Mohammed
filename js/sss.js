const secUrl = "https://inshorts.deta.dev/news?category=technology";

const secComponents = function (obj) {
  const { id, title, author, content, date, imageUrl } = obj;

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
};

const renderComponent = function (obj) {
  newsContainer.insertAdjacentHTML("afterbegin", secComponents(obj));
};

function secondNewApi(UURLL){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', UURLL, true);
    xhr.send();
    xhr.onreadystatechange = ()=>{
        if(xhr.status===200 && xhr.readyState===4){
            const secData = JSON.parse(xhr.responseText);
            console.log(secData);
           
    }
}
}
newsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("collapse")) {
      const cardBody = e.target.closest(".card").querySelector(".card__body");
      cardBody.classList.toggle("hidden");
    }
  });