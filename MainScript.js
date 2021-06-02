'use strict'

// CANVAS

const cnvs = getNode('#cnvs'),
      ctx = cnvs.getContext('2d'),
      inrWdth = window.innerWidth,
      inrHght = window.innerHeight,
      cnvsScale = 6

cnvs.width = inrWdth * cnvsScale
cnvs.height = inrHght * cnvsScale
cnvs.style.width = inrWdth + 'px'
cnvs.style.height = inrHght + 'px'

function rule_line(coordsObj, angle, distance) {
  coordsObj.x += Math.cos(angle * Math.PI / 180) * distance
  coordsObj.y += Math.sin(angle * Math.PI / 180) * distance
}



let varRulesObj
ctx.lineWidth = 10

// PIFAGORAS TREE

varRulesObj = {
  v0: {var: '0', rule: '1[0]0', ruleFunc: function() {
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(this.coords.x, this.coords.y)

    rule_line(this.coords, this.angle, 6 * cnvsScale)
    ctx.lineTo(this.coords.x, this.coords.y)

    ctx.strokeStyle = 'rgb(182, 60, 218)'
  }},
  v1: {var: '1', rule: '12', ruleFunc: function() {
    rule_line(this.coords, this.angle, 4 * cnvsScale)
    ctx.lineTo(this.coords.x, this.coords.y)
  }},
  v2: {var: '2', rule: '2', ruleFunc: function() {
    rule_line(this.coords, this.angle, 4 * cnvsScale)
    ctx.lineTo(this.coords.x, this.coords.y)
  }},
  v3: {var: '[', ruleFunc: function() {
    this.stack.push({x: this.coords.x, y: this.coords.y, angle: this.angle})
    this.angle += this.treeAngle1 * (Math.random() * (1.5 - 0.5) + 0.5)
  }},
  v4: {var: ']', ruleFunc: function() {

    this.coords.x = this.stack[this.stack.length - 1].x
    this.coords.y = this.stack[this.stack.length - 1].y
    this.angle = this.stack[this.stack.length - 1].angle

    this.stack.pop()

    this.angle -= this.treeAngle2 * (Math.random() * (1.5 - 0.5) + 0.5)

    ctx.beginPath()
    ctx.moveTo(this.coords.x, this.coords.y)
  }},
  angle: 90,
  treeAngle1: Math.random() * (45 - 15) + 15,
  treeAngle2: Math.random() * (45 - 15) + 15,
  stack: []
}

const L_sys_PifagorasTree = new Create_L_system(varRulesObj.v0.var, inrWdth * cnvsScale / 2, inrHght * cnvsScale * 0.25, varRulesObj)

iterations(12, L_sys_PifagorasTree)

// GRAPHICS

// ctx.lineWidth = 10

// draw(L_sys_KochCurve)

// draw(L_sys_PifagorasTree)
