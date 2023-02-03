const myForm = document.querySelector("#signup");
const output = document.querySelector(".output");
output.style.display = "none";
const url =
  "https://script.google.com/macros/s/AKfycbxbOa2r48UYgB-2Fkh0t9jx5YD5sN34xKlxfCLDtb_dlIeyVNR4TUMraNnWagKTV8Vq/exec";

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const ele = myForm.elements;
  //console.log(ele);
  //console.log('Sending Data');
  const holder = {};
  const err = [];
  for (let i = 0; i < ele.length; i++) {
    //console.log(ele[i]);
    const el = ele[i];
    let val = true;
    if (el.getAttribute("type") == "submit") {
      val = false;
    }
    if (el.name == "user") {
      if (el.value.length < 5) {
        val = false;
        err.push("Name needs to be 5 or more");
      }
    }
    if (el.name == "email") {
      let check = validateEmail(el.value);
      console.log(check);
      if (!check) {
        val = false;
        err.push("Not valid email");
      }
    }
    if (val) {
      holder[el.name] = el.value;
    }
  }
  if (err.length > 0) {
    output.innerHTML = "";
    output.style.display = "block";
    err.forEach((error) => {
      output.innerHTML += "<div> " + error + "</div>";
    });
  } else {
    //form submit
    console.log(holder);
    output.style.display = "block";
    output.innerHTML = "Sending...";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(holder),
    })
      .then((rep) => rep.json())
      .then((data) => {
        console.log(data);
        clearForm();
      });
  }
});

function clearForm() {
  const ele = myForm.elements;
  output.style.display = "none";
  output.innerHTML = "";
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].getAttribute("type") != "submit") {
      ele[i].value = "";
    }
  }
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/*
function doGet(e) {
  Logger.log("hello");
  const obj={
    parameter: "test"
  }
  const output = JSON.stringify(e)
  console.log(output)
  const test = ContentService.createTextOutput(output);
  return test

  // return ContentService.createTextOutput(JSON.stringify(e));
}

function doPost(e){
 const json = JSON.parse(e.postData.contents);
  const id = "1TIwazxTrWrP4SmM_vSzm7c-roMPTp1fp4BQBE9Hkqu4";
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getSheetByName("Sheet1");
  sheet.appendRow([e.postData.contents]);
  return ContentService.createTextOutput(JSON.stringify(e))
}
*/
