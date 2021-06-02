'use strict'

// L-SYSTEM

function Create_L_system(axiome, x, y, varRulesObj) {
  this.axiome = axiome
  this.system = axiome
  this.coords = {x, y}
  this.objThis = this

  for(let key in varRulesObj) {
    this[key] = varRulesObj[key]
    this[key]?.ruleFunc ? this[key].ruleFunc = this[key].ruleFunc.bind(this) : {}
  }
}

function iteration(L_system) {
  let extraStr = ''

  for(let i = 0; i < L_system.system.length; i++) {

    for(let key in L_system) {

      L_system.system[i] == L_system[key]?.var ? L_system[key]?.rule ? extraStr += L_system[key].rule : extraStr += L_system[key].var : {}
    }
  }

  return extraStr
}

function iterations(number, L_system) {
  let i = 1
  for(let i = 1; i <= number; i++) {
    L_system.system = iteration(L_system)

  }

  draw(L_sys_PifagorasTree)
}

function draw(l_sys) {
  ctx.beginPath()
  ctx.moveTo(l_sys.coords.x, l_sys.coords.y)

  for(let i = 0; i < l_sys.system.length; i++) {

    for(let key in l_sys) {

      l_sys.system[i] == l_sys[key]?.var ? l_sys[key].ruleFunc() : {}
    }
  }
  ctx.stroke()
}
