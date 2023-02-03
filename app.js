const myForm = document.querySelector("#signup");

const output = document.querySelector(".output");

const url = "http://127.0.0.1:8080/index.html";

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const ele = myForm.elements;
  // console.log(ele);
  // console.log("Sending Data");
  const holder = {};
  const err = [];
  for (let i = 0; i < ele.length; i++) {
    // console.log(ele[i]);
    const el = ele[i];
    let val = true;
    if (el.getAttribute("type") != "submit") {
      val = false;
    }
    if (el.name == "user") {
      if (el.value.length < 5) {
        val = false;
        err.push("Name needs to be 5 or more characters");
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
    err.forEach((error) => {
      output.innerHTML += error + "<br>";
    });
  } else {
    // form submit
    console.log(holder);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(holder),
    })
      .then((rep) => rep.json())
      .then((data) => {
        console.log(data);
      });
  }
});

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
