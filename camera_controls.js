'use strict'

//CAMERA CONTROLS

const mouseCoordsCoeffisient = cnvs.width / parseInt(cnvs.style.width),
      body_cnvs = getNode('#body_cnvs')

function wheelFun(e) {
  if(e.deltaY < 0) {
    this.zoom *= 1.3
    this.translateX += (window.innerWidth / 2 - e.clientX) * 100 / window.innerWidth / this.zoom * window.innerWidth / 335
    this.translateY += (window.innerHeight / 2 - e.clientY) * 100 / window.innerHeight / this.zoom * window.innerHeight / 335
  }
  else {
    this.zoom /= 1.3
    this.translateX -= (window.innerWidth / 2 - e.clientX) * 100 / window.innerWidth / this.zoom * window.innerWidth / 335
    this.translateY -= (window.innerHeight / 2 - e.clientY) * 100 / window.innerHeight / this.zoom * window.innerHeight / 335
  }
}

function mousedownFun(e) {
  if(e.button === 1 || e.ctrlKey) {
    this.isMouseDownZoom = true
    this.nullPointX = e.clientX
    this.nullPointY = e.clientY

    this.currentTranslateX = 0
    this.currentTranslateY = 0
  }
}

function mouseupFun(e) {
  this.isMouseDownZoom = false

  if(e.button === 1 || e.ctrlKey) {

    this.translateX += this.currentTranslateX
    this.translateY += this.currentTranslateY
  }
}

function mousemoveFun(e) {
  if(this.isMouseDownZoom) {
    this.currentTranslateX = e.clientX / this.zoom - this.nullPointX / this.zoom
    this.currentTranslateY = e.clientY / this.zoom - this.nullPointY / this.zoom

    body_cnvs.style.transform = `scale(${this.zoom}) translate(${this.translateX + this.currentTranslateX}px, ${this.translateY + this.currentTranslateY}px)`
  }
}

function mouseRenderFun(currTranslX = 0, currTranslY = 0) {
  body_cnvs.style.transform = `scale(${this.zoom}) translate(${this.translateX}px, ${this.translateY}px)`
}

function cameraFocusCenterFun() {
  this.zoom = 1
  this.translateX = 0
  this.translateY = 0
}

const cameraOnCnvs = {
  cnvs: cnvs,
  zoom: 1,
  isMouseDownZoom: false,
  nullPointX: 0,
  nullPointY: 0,
  translateX: 0,
  translateY: 0,
  currentTranslateX: 0,
  currentTranslateY: 0,
  onWheel: wheelFun,
  onMouseDown: mousedownFun,
  onMouseUp: mouseupFun,
  onMouseMove: mousemoveFun,
  focusCenter: cameraFocusCenterFun,
  rendering: mouseRenderFun
}

document.addEventListener('wheel', e => {
  cameraOnCnvs.onWheel(e)
  cameraOnCnvs.rendering()
})

document.addEventListener('mousedown', e => {
  cameraOnCnvs.onMouseDown(e)
})

document.addEventListener('mouseup', e => {
  cameraOnCnvs.onMouseUp(e)
})

document.addEventListener('mousemove', e => {
  cameraOnCnvs.onMouseMove(e)
})
