

function parseFloatToFixed(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function displayText(label, object3D) {
    // const indexLabel = document.getElementById('indexLabel')
    // const position = document.getElementById('positionText')
    // const rotate = document.getElementById('rotateText')
    // const scaleText = document.getElementById('scaleText');

    // indexLabel.innerText = label;
    // position.innerText = parseFloatToFixed(object3D.position.x, 2) + ',' + parseFloatToFixed(object3D.position.y, 2) + ',' + parseFloatToFixed(object3D.position.z, 2);
    // rotate.innerText = parseFloatToFixed(object3D.rotation.x, 2) + ',' + parseFloatToFixed(object3D.rotation.y, 2) + ',' + parseFloatToFixed(object3D.rotation.z, 2);
    // scaleText.innerText = parseFloatToFixed(object3D.scale.x, 2) + ',' + parseFloatToFixed(object3D.scale.y, 2) + ',' + parseFloatToFixed(object3D.scale.z, 2);
    

}
AFRAME.registerComponent('grallop', {
    schema: {default: ''},
    init() {
        const label =this.data;
        const initPosition = {
            x:this.el.object3D.position.x,
            y:this.el.object3D.position.y,
            z:this.el.object3D.position.z,
        }
        const initRotation = {
            x:this.el.object3D.rotation.x,
            y:this.el.object3D.rotation.y,
            z:this.el.object3D.rotation.z,
        }
        const initScale = {
            x:this.el.object3D.scale.x,
            y:this.el.object3D.scale.y, 
            z:this.el.object3D.scale.z,
        }
        // get all elements
        const scene = document.querySelector('a-scene');

        const bot = document.getElementById('catEntry');
        const upBTN = document.getElementById('upBTN');
        const downBTN = document.getElementById('downBTN');
        const leftBTN = document.getElementById('leftBTN');
        const rightBTN = document.getElementById('rightBTN');
        const frontBTN = document.getElementById('frontBTN');
        const backBTN = document.getElementById('backBTN');
        const rotateLeftBTN = document.getElementById('rotateLeftBTN');
        const rotateRightBTN = document.getElementById('rotateRightBTN');
        const rotateUpBTN = document.getElementById('rotateUpBTN');
        const rotateDownBTN = document.getElementById('rotateDownBTN');
        const bigBTN = document.getElementById('bigBTN');
        const smallBTN = document.getElementById('smallBTN');
        const photo = document.getElementById('photo');
        const saveBtn = document.getElementById('saveBtn');

        // const animations =  this.el.object3D.children
        // console.log(animations)
        displayText(label,  this.el.object3D)
        upBTN.addEventListener('click', () => {
             this.el.object3D.position.y += 0.1
            displayText(label,  this.el.object3D)
        })
        downBTN.addEventListener('click', () => {
             this.el.object3D.position.y -= 0.1
            displayText(label,  this.el.object3D)
        })
        leftBTN.addEventListener('click', () => {
             this.el.object3D.position.x -= 0.1
            displayText(label,  this.el.object3D)

        })
        rightBTN.addEventListener('click', () => {
             this.el.object3D.position.x += 0.1
            displayText(label,  this.el.object3D)

        })
        frontBTN.addEventListener('click', () => {
             this.el.object3D.position.z -= 0.1
            displayText(label,  this.el.object3D)
        })
        backBTN.addEventListener('click', () => {
             this.el.object3D.position.z += 0.1
            displayText(label,  this.el.object3D)

        })
        rotateLeftBTN.addEventListener('click', () => {
             this.el.object3D.rotation.y -= 0.1
            displayText(label,  this.el.object3D)

        })
        rotateRightBTN.addEventListener('click', () => {
             this.el.object3D.rotation.y += 0.1
            displayText(label,  this.el.object3D)

        })
        rotateDownBTN.addEventListener('click', () => {
             this.el.object3D.rotation.x += 0.1
            displayText(label,  this.el.object3D)

        })
        rotateUpBTN.addEventListener('click', () => {
             this.el.object3D.rotation.x -= 0.1
            displayText(label,  this.el.object3D)
        })
        bigBTN.addEventListener('click', () => {
             this.el.object3D.scale.x += 0.1
             this.el.object3D.scale.y += 0.1
             this.el.object3D.scale.z += 0.1
            displayText(label,  this.el.object3D)
        })
        smallBTN.addEventListener('click', () => {
             this.el.object3D.scale.x -= 0.1
             this.el.object3D.scale.y -= 0.1
             this.el.object3D.scale.z -= 0.1
            displayText(label,  this.el.object3D)
        })

        saveBtn.addEventListener('click', () => {
            const data = {
                rotation: `${parseFloatToFixed(this.el.object3D.rotation.x,2)} ${parseFloatToFixed(this.el.object3D.rotation.y,2)} ${parseFloatToFixed(this.el.object3D.rotation.z,2)}`,
                position: `${parseFloatToFixed(this.el.object3D.position.x,2)} ${parseFloatToFixed(this.el.object3D.position.y,2)} ${parseFloatToFixed(this.el.object3D.position.z,2)}`,
                scale: `${parseFloatToFixed(this.el.object3D.scale.x,2)} ${parseFloatToFixed(this.el.object3D.scale.x,2)} ${parseFloatToFixed(this.el.object3D.scale.x,2)}`,
            }
            localStorage.setItem('mindAR-image-storage', JSON.stringify(data))
        })
        
        
        // bot control
        

        // photo.addEventListener('click', () => {
        //   document.querySelector('a-scene') .components.screenshot.capture('perspective')
        // })
    }
})

// domReady event
document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM ready');
    const scene = document.querySelector('a-scene');
    const selectAnimation = document.getElementById('selectAnimation');

    const storage = localStorage.getItem('mindAR-image-storage');
    if(storage) {
        const data = JSON.parse(storage);
        
        const bots = document.querySelectorAll('.bot');
        bots.forEach( bot => {
            bot.setAttribute("rotation", data.rotation.replaceAll(',', ' '))
            bot.setAttribute("position", data.position.replaceAll(',', ' '))
            bot.setAttribute("scale", data.scale.replaceAll(',', ' '))
        })
    }else{
        bots.forEach( bot => {
            bot.setAttribute("rotation", "0.22 0 2")
            bot.setAttribute("position", "0.5 -0.4 -0.2")
            bot.setAttribute("scale", "2.7 2.7 2.7 ") 
        })
    }
    
    // // target 
    const target = document.getElementById('target');
    const displayTarget = document.getElementById('displayTarget');
    
    target.addEventListener("targetFound", event => {
        console.log("target found", event.target);
        setTimeout(() => {
            displayTarget.object3D.matrix =  event.target.object3D.matrix;
            // event.target.object3D.matrix = new AFRAME.THREE.Matrix4().set(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
            // event.target.object3D.visible = false;
        }, 200)
        // arSystem.pause()
        // displayTarget.object3D
    });
    target.addEventListener("targetLost", event => {
        console.log("target Lost");
        displayTarget.object3D.matrix = new AFRAME.THREE.Matrix4().set(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
    });
    const bot = document.getElementById('catEntry');
    
    scene.addEventListener("arReady", (event) => {
        displayTarget.object3D.matrixAutoUpdate = false;
        // const animations =  bot.object3D.children[0]
        // if(animations && animations.animations) {
        //     animations.animations.forEach( animation => {
        //         const option = document.createElement('option')
        //         option.text = animation.name;
        //         option.value = animation.name
        //         selectAnimation.add(option);
        //     })
        // }
    });

    selectAnimation.addEventListener('change', (ev) => {
        // get all class bots
        const bots = document.querySelectorAll('.bot');
        bots.forEach( bot => {
            const newAttr = `clip: ${selectAnimation.value}; crossFadeDuration: .3;`
            bot.setAttribute("animation-mixer", newAttr)
        })
    })
    
});