import bankOne from "./bankOne"

document.addEventListener("DOMContentLoaded", function() {
  //je recup #root
  const root = document.getElementById("root")

  //je .map() bankOne pour créer les <li>
  const elem = bankOne
    .map(
      el =>
        `<li class="button is-large key drum-pad" id="${el.id}" data-key="${
          el.keyCode
        }">${el.keyTrigger}
        <audio src="${el.url}" class="clip" id="${el.keyTrigger}" data-key=${
          el.keyCode
        }></audio>
        </li>`
    )
    .join("")

  //j'injecte mes li dans root
  root.innerHTML = `<div class="hero is-fullheight">
                      <div class="hero-body">
                        <div class="has-text-centered container">
                          <ul id="display">${elem}</ul>
                          <div class="title" id="soundName"></div>
                        </div>
                      </div>
                    </div>`

  //je recup #soundName
  const soundName = document.getElementById("soundName")

  window.addEventListener("keydown", drumMachine)

  //event click drum-pad
  const drums = [...document.getElementsByClassName("drum-pad")].map(drum =>
    drum.addEventListener("click", drumMachine)
  )

  const buttonsReaction = [...document.getElementsByClassName("button")].map(
    li => li.addEventListener("click", drumMachine)
  )

  function drumMachine(e) {
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    let key = document.querySelector(`li.key[data-key="${e.keyCode}"]`)
    console.log(e)
    const clickButton = e.target.dataset.key
    if (clickButton) {
      audio = document.querySelector(`audio[data-key="${clickButton}"]`)
      key = document.querySelector(`li.key[data-key="${clickButton}"]`)
    }
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    key.classList.add("active")
    soundName.innerText = e.target.id
    console.log(soundName)
    console.log(e)

    const keys = [...document.querySelectorAll("li.key")].map(key =>
      key.addEventListener("transitionend", removeClass)
    )

    function removeClass(e) {
      if (e.propertyName !== "transform") return
      this.classList.remove("active")
    }
  }
})
