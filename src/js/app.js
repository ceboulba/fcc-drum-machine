import bankOne from "./bankOne"

document.addEventListener("DOMContentLoaded", function() {
  console.log("helloWorld")
  const root = document.getElementById("root")
  const elem = bankOne
    .map(
      el =>
        `<li class="button key" data-key="${el.keyCode}" id="${el.id}">${
          el.keyTrigger
        }
        <audio src="${el.url}" data-key=${el.keyCode}></audio>
        </li>`
    )
    .join("")

  root.innerHTML = `<ul>${elem}</ul>`

  window.addEventListener("keydown", e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`li.key[data-key="${e.keyCode}"]`)
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    key.classList.add("active")
    //console.log(audio)
    console.log(key)
  })

  const keys = [...document.querySelectorAll("li.key")].map(key =>
    key.addEventListener("transitionend", removeClass)
  )

  function removeClass(e) {
    if (e.propertyName !== "transform") return
    this.classList.remove("active")
  }
})
