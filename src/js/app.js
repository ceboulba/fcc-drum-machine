import bankOne from "./bankOne"

document.addEventListener("DOMContentLoaded", function() {
  //je prend le root
  const root = document.getElementById("root")

  //je .map() bankOne pour créer les <li>
  const elem = bankOne
    .map(
      el =>
        `<li class="button key drum-pad" id="${el.id}" data-key="${
          el.keyCode
        }">${el.keyTrigger}
        <audio src="${el.url}" class="clip" id="${el.keyTrigger}" data-key=${
          el.keyCode
        }></audio>
        </li>`
    )
    .join("")

  //j'injecte mes li dans root
  root.innerHTML = `<ul id="display">${elem}</ul>`

  window.addEventListener("keydown", drumMachine)

  //event click drum-pad
  const drums = [...document.getElementsByClassName("drum-pad")].map(drum =>
    drum.addEventListener("click", drumMachine)
  )

  function drumMachine(e) {
    //console.log(e)
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`li.key[data-key="${e.keyCode}"]`)
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    key.classList.add("active")
    //console.log(audio)
    console.log(key)

    const keys = [...document.querySelectorAll("li.key")].map(key =>
      key.addEventListener("transitionend", removeClass)
    )

    function removeClass(e) {
      if (e.propertyName !== "transform") return
      this.classList.remove("active")
    }
  }
})
