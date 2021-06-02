'use strict'

// KOCH CURVE

 varRulesObj = {
	v0: {var: 'F', rule: 'F+F-F-F+F', ruleFunc: function() {
		rule_line(this.coords, this.angle, 10 * 3/4)
		ctx.lineTo(this.coords.x, this.coords.y)
	}},
	v1: {var: '+', ruleFunc: function() {
		this.angle += 45
		rule_line(this.coords, this.angle, Math.sqrt(2 * Math.pow(10 * 1/4, 2)))
		ctx.lineTo(this.coords.x, this.coords.y)
		this.angle += 45
	}},
	v2: {var: '-', ruleFunc: function() {
		this.angle -= 45
		rule_line(this.coords, this.angle, Math.sqrt(2 * Math.pow(10 * 1/4, 2), 2))
		ctx.lineTo(this.coords.x, this.coords.y)
		this.angle -= 45
	}},
	angle: 0
}

const L_sys_KochCurve = new Create_L_system(varRulesObj.v0.var, 10, inrHght * 0.25, varRulesObj)

iterations(5, L_sys_KochCurve)
