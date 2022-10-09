let elList = document.querySelector(".list")
let elForm = document.querySelector(".forms")
let elInputSearch = document.querySelector(".input-search")
let modals = document.querySelector(".modal-dialog")
let modal = document.querySelector(".modal-opasition");
let elTemlate = document.querySelector(".template-kino").content
let elTemlatemodal = document.querySelector(".modal-template").content
let itmliatts;
var fragment = new DocumentFragment();
var fragments = new DocumentFragment();

let kinoHundred = movies.splice(0, 100)

function forlist(ss) {
  ss.forEach(function (kino) {
    elList.innerHTML = ""
    let clonedTemplate = elTemlate.cloneNode(true)

    clonedTemplate.querySelector(".itms-list").dataset.itm = kino.imdb_id
    itmliatts = clonedTemplate.querySelector(".itms-list")

    clonedTemplate.querySelector(".kino-img").src = `http://i3.ytimg.com/vi/${kino.ytid}/mqdefault.jpg`

    clonedTemplate.querySelector(".kino-img").alt = kino.title
    clonedTemplate.querySelector(".kino-title").textContent = kino.title
    clonedTemplate.querySelector(".kino-category").textContent = kino.imdb_rating

    clonedTemplate.querySelector(".kino-deta").textContent = kino.movie_year

    clonedTemplate.querySelector(".kino-time").innerText = convertMins(kino.runtime)

    clonedTemplate.querySelector(".kino-text").textContent = kino.Categories.split("|").join(", ");

    clonedTemplate.querySelector(".btns").dataset.contactIndex = kino.imdb_id

    fragment.append(clonedTemplate)
  })

  elList.appendChild(fragment)
}

elForm.addEventListener("keyup", function (evt) {
  evt.preventDefault()
  let item = evt.target.value.toLowerCase();
  let listitm = elList.getElementsByTagName("li")
  Array.from(listitm).forEach(function (itm) {
    let title = itm.firstElementChild.textContent;
    if (title.toLowerCase().indexOf(item) != -1) {
      itm.style.display = "block"; 
    } else {
      itm.style.display = "none";
    }
    console.log(listitm);
  })


})

forlist(kinoHundred)


dellfunction(elList);

function convertMins(tim) {
  let h = Math.floor(tim / 60);
  let m = tim % 60;
  return `${h} hr ${m} min`
}

function dellfunction(ellist) {
  ellist.addEventListener("click", (evt) => {
    let kino = null
    if (evt.target.matches(".btns")) {
      let indexOlatir = evt.target.dataset.contactIndex;

      kino = kinoHundred.find(item => item.imdb_id == indexOlatir)

      modal.classList.add("modal-show")

      let elTemlatemodals = elTemlatemodal.cloneNode(true)

      let btncloses = elTemlatemodals.querySelector(".closebtn");
      // console.log(elTemlatemodals);
      elTemlatemodals.querySelector(".modal-title").textContent = kino.title;

      elTemlatemodals.querySelector(".modal-category").textContent = kino.imdb_rating;

      elTemlatemodals.querySelector(".kino-deta").textContent = kino.movie_year;

      elTemlatemodals.querySelector(".kino-time").innerText = convertMins(kino.runtime);

      elTemlatemodals.querySelector(".modal-text").textContent = kino.Categories.split("|").join(", ");

      elTemlatemodals.querySelector(".modal-texts").textContent = kino.summary;

      elTemlatemodals.querySelector(".modal-iframe").src = `https://www.youtube-nocookie.com/embed/${kino.ytid}`

      elTemlatemodals.querySelector(".links").href = ` https://www.youtube.com/watch?v=${kino.ytid}`

      btncloses.addEventListener("click", function () {
        modal.classList.remove("modal-show")
        modals.innerHTML = ""
      });
      fragments.append(elTemlatemodals)
    }

    modals.appendChild(fragments)
  });

}
let imgss = document.querySelector(".imgload")
let adds = document.querySelector(".adds")

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    imgss.classList.add("d-none")
    adds.classList.remove("overflow-hidden")
  }
}








function largestOfFour(arr) {
  var largestNumber = [0,0,0,0];
  for(var arrayIndex = 0; arrayIndex < arr.length; arrayIndex++) {
   for(var subArrayIndex = 0; subArrayIndex < arr[arrayIndex].length; subArrayIndex++) {
      if(arr[arrayIndex][subArrayIndex] > largestNumber[arrayIndex]) {         
         largestNumber[arrayIndex] = arr[arrayIndex][subArrayIndex];
       }
   }
}
return largestNumber;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);