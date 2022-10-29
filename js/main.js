const elList = document.querySelector(".list")
const elBookList = document.querySelector(".bookmark-list")
const elForm = document.querySelector(".forms")
const elFilterForm = document.querySelector(".form-filter")
const elInputSearch = document.querySelector(".input-search")
const select = document.querySelector(".categori-select")
const selectReting = document.querySelector(".select-reting")
const radio1 = document.querySelector(".arr")
const radio2 = document.querySelector(".ars")
const year1 = document.querySelector(".year1")
const year2 = document.querySelector(".year2")
const modals = document.querySelector(".modal-dialog")
const modal = document.querySelector(".modal-opasition");

const btnaddbook = document.querySelector(".add-book");

let btnss

const arrbookmarck = JSON.parse(localStorage.getItem("arrbookmarck"))||[]
const btnarrbookmarck = JSON.parse(localStorage.getItem("btnarrbookmarck"))||[]

let elTemlate = document.querySelector(".template-kino").content
let elTemlatemodal = document.querySelector(".modal-template").content
let elTemlateBookmark= document.querySelector(".template-bookmark").content
let itmliatts;
const fragment = new DocumentFragment();
const fragments = new DocumentFragment();
const fragmentbook = new DocumentFragment();


// 7 kino //////////////////////////////////////////////////////////
function forlist(ss,titleRegex = "") {
  ss.forEach(function (kino) {
    elList.innerHTML = ""

    let clonedTemplate = elTemlate.cloneNode(true)

    
    if(titleRegex.source !== "(?:)" && titleRegex){

      clonedTemplate.querySelector(".kino-title").innerHTML = kino.title.replace(titleRegex,
        `<mark class="p-0 bg-success text-white">${titleRegex.source}</mark>`);
    }else{
      clonedTemplate.querySelector(".kino-title").textContent = kino.title
    }



    clonedTemplate.querySelector(".itms-list").dataset.itm = kino.imdbid
    itmliatts = clonedTemplate.querySelector(".itms-list")

    clonedTemplate.querySelector(".kino-img").src = kino.posterytidmin
    // gets(clonedTemplate)
    clonedTemplate.querySelector(".kino-img").alt = kino.title
    clonedTemplate.querySelector(".kino-category").textContent = kino.imdbrating

    clonedTemplate.querySelector(".kino-deta").textContent = kino.year

    clonedTemplate.querySelector(".kino-time").innerText = convertMins(kino.runtime)

    clonedTemplate.querySelector(".kino-text").textContent = kino.categories.join(", ");

    clonedTemplate.querySelector(".btns").dataset.contactIndex = kino.imdbid
    clonedTemplate.querySelector(".bookmark").dataset.idbookmark = kino.imdbid

    fragment.append(clonedTemplate)
  })

  elList.appendChild(fragment)
}

// elForm.addEventListener("keyup", function (evt) {
//   evt.preventDefault()
//   let item = evt.target.value.toLowerCase();
//   let listitm = elList.getElementsByTagName("li")
//   Array.from(listitm).forEach(function (itm) {
//     let title = itm.firstElementChild.textContent;
//     if (title.toLowerCase().indexOf(item) != -1) {
//       itm.style.display = "block";
//     } else {
//       itm.style.display = "none";
//     }

//   })


// })
//6 search //////////////////////////////////////////////////////////////
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  
  //@ search //////////////////////////////////////////
  const searchElement = new RegExp(elInputSearch.value.trim(), "gi");
  const searchMovieFilteredList = movies.filter((item) => String(item.title).match(searchElement))
  if(searchMovieFilteredList.length > 0){
     (searchMovieFilteredList,searchElement)
  }else{
    alert("Movie not found");
  }

  
  // searchElement.value = "";
});
//8 filter //////////////////////////////////////////////////////
elFilterForm.addEventListener("submit", function (evt) {
  evt.preventDefault()
  //! a=>z ,a<=z ////////////////////////////////////////
  if (radio1.checked == true) {
    sortNameaz() 
  
  }
  if (radio2.checked == true) {
    sortNameza()
  
  }
  // # category //////////////////////////////////////////////
  const selectValue = select.value
  const filterCategory = movies.filter(item => {
    return item.categories.includes(selectValue)
  })
  forlist(filterCategory)

  // ** year ////////////////////////////////////////////////
     const year1InputValue = year1.value.trim();
     const year2InputValue = year2.value.trim();
  const filterYear = movies.filter(item => {
    if (item.year >= year1InputValue && item.year <= year2InputValue) {
         return true
       }
  })

forlist(filterYear)
// $ rayting ////////////////////////////////////////////////////
  if (selectReting.value == 1) {
    const sort1Rating = movies.sort((a, b) => {
      return a.imdbrating - b.imdbrating
    })
    forlist(sort1Rating)
  }
  if (selectReting.value == 2) {
    const sort2Rating = movies.sort((a, b) => {
      return b.imdbrating - a.imdbrating
    })
    forlist(sort2Rating)
  }
})
// 1 a=>z a <=z /////////////////////////////////////////////
sortNameaz()
function sortNameaz() {
  movies.sort((a, b) => String(a.title).charCodeAt(0) - String(b.title).charCodeAt(0))

}
function sortNameza() {
  movies.sort((a, b) => String(b.title).charCodeAt(0) - String(a.title).charCodeAt(0))

}
 

//2 category ////////////////////////////////////////////////

const arraya =[]
function category() {
movies.forEach(item => {
  let res = item.categories
  res.forEach(itm => {  
    itm.split(", ").forEach(i => {
      if (!arraya.includes(i)) {
        arraya.push(i)
      }
    })
   })
   arraya.sort()
})
}
category()
let newfol =  document.createDocumentFragment()
arraya.forEach(item => {
  let option = document.createElement("option")
  option.textContent = item
  option.value = item
  newfol.appendChild(option)


})
select.appendChild(newfol)

//3 timer //////////////////////////////////////////////////
function convertMins(tim) {
  let h = Math.floor(tim / 60);
  let m = tim % 60;
  return `${h} hr ${m} min`
}
// 4 modal /////////////////////////////////////////////////
function dellfunction(ellist) {
  ellist.addEventListener("click", (evt) => {
    let kino = null
    if (evt.target.matches(".btns")) {
      let indexOlatir = evt.target.dataset.contactIndex;

      kino = movies.find(item => item.imdbid == indexOlatir)

      modal.classList.add("modal-show")

      let elTemlatemodals = elTemlatemodal.cloneNode(true)

      let btncloses = elTemlatemodals.querySelector(".closebtn");

      elTemlatemodals.querySelector(".modal-title").textContent = kino.title;

      elTemlatemodals.querySelector(".modal-category").textContent = kino.imdbrating;

      elTemlatemodals.querySelector(".kino-deta").textContent = kino.year;

      elTemlatemodals.querySelector(".kino-time").innerText = convertMins(kino.runtime);

      elTemlatemodals.querySelector(".modal-text").textContent = kino.categories.join(", ");

      elTemlatemodals.querySelector(".modal-texts").textContent = kino.summary;

      elTemlatemodals.querySelector(".modal-iframe").src = kino.movieiframeid

      elTemlatemodals.querySelector(".links").href = kino.imdbid

      btncloses.addEventListener("click", function () {
        modal.classList.remove("modal-show")
        modals.innerHTML = ""
      });
      fragments.append(elTemlatemodals)
    }

//     if (evt.target.matches("bookmark")) {

//       let itm = evt.target.dataset.idbookmark;

//      let bok = movies.find(item => item.imdbid == itm)

//       arrbookmarck.push(bok)
//     }
    modals.appendChild(fragments)
  });

}
// 5 loader ///////////////////////////////////////////////////////
let imgss = document.querySelector(".imgload")
let adds = document.querySelector(".adds")

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    imgss.classList.add("d-none")
    adds.classList.remove("overflow-hidden")
  }
}


forlist( movies.slice(0, 100))

dellfunction(elList);

//9 //////////////////////////////////////////////////////////

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".bookmark")) {  
    let itemid = evt.target.dataset.idbookmark  
    let objitm = movies.find(itm => itm.imdbid == itemid)
    if (!arrbookmarck.includes(objitm)) {
      
      arrbookmarck.push(objitm)
      
    }
    localStorage.setItem("arrbookmarck",JSON.stringify(arrbookmarck))
    // let filarray = arrbookmarck.filter(itm => {
    //   if (itemid == itm.imdbid) {

    //     return true
    //   }
    // })
    btnss = evt.target.classList.toggle("bookmarkcheck")
   

 


    
  //  let objbook = {
  //     id: itemid,
  //     check: true,
  //   }
  //   btnarrbookmarck.push(objbook)
  //   localStorage.setItem("btnarrbookmarck",JSON.stringify(btnarrbookmarck))
    // console.log(arrbookmarck);
  }
})
//1 ///////////////////////////////////////////////////////////////
function bookmark(arrbookmarck) {
  elBookList.innerHTML = ""
 
  // console.log(filarray);
  arrbookmarck.forEach((item) => {

    let clonedTemplatebook = elTemlateBookmark.cloneNode(true)

    clonedTemplatebook.querySelector(".bookmark-card").dataset.itmli = item.imdbid
    clonedTemplatebook.querySelector(".book-img").src = item.posterytidmin
    clonedTemplatebook.querySelector(".bookmark-text").textContent = item.title
    clonedTemplatebook.querySelector(".book-dell").dataset.btndell = item.imdbid


    
    fragmentbook.append(clonedTemplatebook)
  })

  elBookList.appendChild(fragmentbook)
}


btnaddbook.addEventListener("click", () => {
  bookmark(arrbookmarck)
})

// 3 ////////////////////////////////////////////////////////////
// console.log(arrbookmarck);
// debugger

function sss() {
  arrbookmarck.forEach(item => {
  let res = item.categories

  res.split(", ").forEach(i => {
      if (!btnarrbookmarck.includes(i)) {
        btnarrbookmarck.push(i)
      }
    })
 
   btnarrbookmarck.sort()
})
}
// let btnbook = document.querySelectorAll(".bookmark")
// btnarrbookmarck.forEach(obj => {
//   movies.forEach((itm) => {
//     // console.log(btnbook.idbookmark);
//     if (itm.imdbid == obj.id) {
//       if (btnbook.idbookmark == obj.id) {
//         btnbook.classList.add("bookmarkcheck")
//       }
//     }
//   })
// })

//4 ////////////////////////////////////////////////////////////////
elBookList.addEventListener("click", (evt) => {
  if (evt.target.matches(".book-dell")) {
    let delbtnid = evt.target.dataset.btndell
    let dellfind = arrbookmarck.findIndex(itm => itm.imdbid == delbtnid)
    // console.log(dellfind);
    arrbookmarck.splice(dellfind, 1)
    bookmark(arrbookmarck)
    localStorage.setItem("arrbookmarck", JSON.stringify(arrbookmarck))
    movies.forEach(itm => {
      if (itm.btnbook == true) {
     
      }
    })
  }
})




async function sss() {
for (let i = 0; i < movies.length; i++) {

  
  const res = await fetch("https://i3.ytimg.com/vi/ro5kCfJM_oA/mqdefault.jpg");
  
    const data = await res.json();
  
    console.log(data);
}
  
}
  
sss()
