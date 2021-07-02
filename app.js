const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight
partcleArray = []

const colours = [
    'white',
    'rgba(255,255,255,0.3)',
    'rgba(173,216,230,0.8)',
    'rgba(211,211,211,0.8)'
]

const maxSize = 40
const minSize = 0
const mouseRadius = 60;
// mous position

let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x
    mouse.y = e.y

})

//create condtructor function for particle

function Particle(x, y, directionX, directionY, size, colour) {

    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.colour = colour

}
//add draw method to particle prototype

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        // ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.fillStyle = 'black'
        // ctx.fillStyle = this.colour;
    ctx.fill()
    ctx.strokeStyle = 'white';
    ctx.stroke()


}

//add update method particle prototype

Particle.prototype.update = function() {
    if (this.x + this.size > canvas.width || this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX
    }

    if (this.y + this.size > canvas.height || this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY
    }
    this.x += this.directionX
    this.y += this.directionY

    // mouse interactivity
    if (mouse.x - this.x < mouseRadius &&
        mouse.x - this.x > -mouseRadius &&
        mouse.y - this.y < mouseRadius &&
        mouse.y - this.y > -mouseRadius

    ) {
        if (this.size < maxSize) {
            this.size += 5
        }
    } else if (this.size > minSize) {
        this.size -= .1

    }

    if (this.size < 0) {
        this.size = 0
    }
    this.draw()
}

// create particle array

function init() {
    partcleArray = []

    for (let i = 0; i < 1000; i++) {
        let size = 0
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        let directionX = (Math.random() * .2) - .1
        let directionY = (Math.random() * .2) - .1
        let colour = colours[Math.floor(Math.random() * colours.length)]

        partcleArray.push(new Particle(x, y, directionX, directionY, size, colour))
    }

}

// animation loop
function animate() {

    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (let i = 0; i < partcleArray.length; i++) {
        partcleArray[i].update()
    }
    requestAnimationFrame(animate)

}

init()
animate()

window / addEventListener('resize', function() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

setInterval(function() {
    mouse.x = undefined
    mouse.y = undefined

}, 1000)