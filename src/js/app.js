import bankOne from "./bankOne"

document.addEventListener("DOMContentLoaded", function() {
  console.log("helloWorld")
  const root = document.getElementById("root")
  const elem = bankOne.map(el => `<li id="${el.id}">${el.url}</li>`)
  root.innerHTML = `<ul>${elem}</ul>`
})
