var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var siteList;

if (localStorage.getItem("websiteList") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("websiteList"));
  displayWebsite(siteList);
}
//& create function
function createWebsite() {
  if (validateName() === true && validateUrl() === true) {
    var siteObj = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteList.push(siteObj);
    displayWebsite(siteList);
    clearData();
    localStorage.setItem("websiteList", JSON.stringify(siteList));
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  }
}

//& display website function in table body
function displayWebsite(list) {
  var cartona = ``;
  for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td><button class="btn btn-visit" onclick="gotoLink('${
          list[i].url
        }')"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button class="btn btn-delete" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

//& goto link function when click on visit btn
function gotoLink(url) {
  window.open(url, "_blank");
}

//& clear input field function after submit data
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
}

//& delete function to the entire row
function deleteWebsite(index) {
  siteList.splice(index, 1);
  displayWebsite(siteList);
  localStorage.setItem("websiteList", JSON.stringify(siteList));
}

//& validate site name function
function validateName() {
  var regexName = /^[\w]{3,}$/;
  if (regexName.test(siteName.value)) {
    siteName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    return false;
  }
}

function validateUrl() {
  var regexUrl = /^https:\/\/[\w]+\.com$/;
  if (regexUrl.test(siteUrl.value)) {
    siteUrl.classList.replace("is-invalid", "is-valid");
    document
      .getElementById("error-msg")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    document
      .getElementById("error-msg")
      .classList.replace("d-none", "d-block");
    siteUrl.classList.add("is-invalid");
    return false;
  }
}
