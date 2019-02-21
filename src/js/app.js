import bankOne from './bankOne'

document.addEventListener('DOMContentLoaded', function() {
  //je recup #root
  const root = document.getElementById('drum-machine')

  //je .map() bankOne pour créer les <li>
  const elem = bankOne
    .map(
      el =>
        `<li class="button is-large key drum-pad" id="${el.id}" data-key="${
          el.keyCode
        }">${el.keyTrigger}
        <audio src="${el.url}" class="clip" id="${el.keyTrigger}" data-key=${
          el.keyCode
        } name=${el.id}>
        </audio>
        </li>`
    )
    .join('')

  //j'injecte mes li dans root
  root.innerHTML = `
  <div class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="has-text-centered">
        <div class="title">DrumMachine</div>
        <div class="subtitle">FreeCodeCamp</div>
      </div>
      <hr />
      <div class="has-text-centered container">
        <ul>
          ${elem}
        </ul>
        <div class="title" id="display"></div>
      </div>
    </div>
  </div>
</div>
  `

  //je recup #soundName
  const soundName = document.getElementById('display')
  soundName.innerText = 'play'

  window.addEventListener('keydown', drumMachine)

  //event click drum-pad
  const drums = [...document.getElementsByClassName('drum-pad')].map(drum =>
    drum.addEventListener('click', drumMachine)
  )

  const buttonsReaction = [...document.getElementsByClassName('button')].map(
    li => li.addEventListener('click', drumMachine)
  )

  function drumMachine(e) {
    console.log('type => ', e)
    const audio =
      document.querySelector(`audio[data-key="${e.keyCode}"]`) ||
      document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
    const key = audio.parentElement

    //console.log('audio => ', audio.parentElement)

    if (!audio) return
    audio.currentTime = 0
    audio.play()
    key.classList.add('active')
    soundName.innerText = audio.getAttribute('name')
    key.addEventListener('transitionend', removeClass)
    function removeClass(e) {
      if (e.propertyName !== 'transform') return
      this.classList.remove('active')
    }
  }
})
