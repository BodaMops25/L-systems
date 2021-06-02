'use strict'

//HOT KEYS

document.addEventListener('keydown', e => {
  if(e.code === 'KeyF') {
    cameraOnCnvs.focusCenter()
    cameraOnCnvs.rendering()
  }
})
