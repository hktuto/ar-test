
var showingCat = false;

function parseFloatToFixed(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

let scanObj;
let refreshInterval;
let lastMatrix;
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


        const Idle_4 = document.getElementById('Idle_4');
        const Idle_6 = document.getElementById('Idle_6');
        const Lick = document.getElementById('Lick');
        const Sit_loop_3 = document.getElementById('Sit_loop_3');

        Idle_4.addEventListener('click', () => {
            const newAttr = `clip: Idle_4; crossFadeDuration: .3;`
            this.el.setAttribute("animation-mixer", newAttr)
        })
        Idle_6.addEventListener('click', () => {
            const newAttr = `clip: Idle_6; crossFadeDuration: .3;`
            this.el.setAttribute("animation-mixer", newAttr)
        })
        Lick.addEventListener('click', () => {
            const newAttr = `clip: Lick; crossFadeDuration: .3;`
            this.el.setAttribute("animation-mixer", newAttr)
        })
        Sit_loop_3.addEventListener('click', () => {
            const newAttr = `clip: Sit_loop_3; crossFadeDuration: .3;`
            this.el.setAttribute("animation-mixer", newAttr)
        })

        // const animations =  this.el.object3D.children
        // console.log(animations)
        if(upBTN) {
            upBTN.addEventListener('click', () => {
                this.el.object3D.position.y += 0.1
                save()
            })
        }
        if(downBTN) {
            downBTN.addEventListener('click', () => {
                this.el.object3D.position.y -= 0.1
            })
        }
        if(leftBTN) {
            leftBTN.addEventListener('click', () => {
                this.el.object3D.position.x -= 0.1
                save()
                
            })
        }
        if(rightBTN) {
            rightBTN.addEventListener('click', () => {
                this.el.object3D.position.x += 0.1
                save()
                
            })
        }
        if(frontBTN) {
            frontBTN.addEventListener('click', () => {
                this.el.object3D.position.z -= 0.1
                save()
            })
        }
        if(backBTN) {

            backBTN.addEventListener('click', () => {
                this.el.object3D.position.z += 0.1
                save()
                
            })
        }
        if(rotateLeftBTN) {
            rotateLeftBTN.addEventListener('click', () => {
                this.el.object3D.rotation.y -= 0.1
                
            })
        }
        if(rotateRightBTN) {
            rotateRightBTN.addEventListener('click', () => {
                this.el.object3D.rotation.y += 0.1
                save()
                
            })
        }
        if(rotateDownBTN) {
            rotateDownBTN.addEventListener('click', () => {
                this.el.object3D.rotation.x += 0.1
                save()
                
            })
        }
        if(rotateUpBTN) {
            rotateUpBTN.addEventListener('click', () => {
                this.el.object3D.rotation.x -= 0.1
                save()
            })
        }
        if(bigBTN) {
            bigBTN.addEventListener('click', () => {
                this.el.object3D.scale.x += 0.1
                this.el.object3D.scale.y += 0.1
                this.el.object3D.scale.z += 0.1
                save()
            })
        }
        if(smallBTN) {
            smallBTN.addEventListener('click', () => {
                this.el.object3D.scale.x -= 0.1
                this.el.object3D.scale.y -= 0.1
                this.el.object3D.scale.z -= 0.1
                save()
            })
        }
        if(saveBtn) {

            saveBtn.addEventListener('click', () => {
                const data = {
                    rotation: `${parseFloatToFixed(this.el.object3D.rotation.x,2)} ${parseFloatToFixed(this.el.object3D.rotation.y,2)} ${parseFloatToFixed(this.el.object3D.rotation.z,2)}`,
                    position: `${parseFloatToFixed(this.el.object3D.position.x,2)} ${parseFloatToFixed(this.el.object3D.position.y,2)} ${parseFloatToFixed(this.el.object3D.position.z,2)}`,
                    scale: `${parseFloatToFixed(this.el.object3D.scale.x,2)} ${parseFloatToFixed(this.el.object3D.scale.x,2)} ${parseFloatToFixed(this.el.object3D.scale.x,2)}`,
                }
                localStorage.setItem('mindAR-image-storage', JSON.stringify(data))
            })
        }

        function save(){
            // const data = {
            //     rotation: `${parseFloatToFixed(this.el.object3D.rotation.x,2)} ${parseFloatToFixed(this.el.object3D.rotation.y,2)} ${parseFloatToFixed(this.el.object3D.rotation.z,2)}`,
            //     position: `${parseFloatToFixed(this.el.object3D.position.x,2)} ${parseFloatToFixed(this.el.object3D.position.y,2)} ${parseFloatToFixed(this.el.object3D.position.z,2)}`,
            //     scale: `${parseFloatToFixed(this.el.object3D.scale.x,2)} ${parseFloatToFixed(this.el.object3D.scale.x,2)} ${parseFloatToFixed(this.el.object3D.scale.x,2)}`,
            // }
            // localStorage.setItem('mindAR-image-storage', JSON.stringify(data))
        }
        
        
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
    const bots = document.querySelectorAll('.bot');
    const storage = localStorage.getItem('mindAR-image-storage');
    if(storage) {
        const data = JSON.parse(storage);
        
        
        bots.forEach( bot => {
            bot.setAttribute("rotation", data.rotation.replaceAll(',', ' '))
            bot.setAttribute("position", data.position.replaceAll(',', ' '))
            bot.setAttribute("scale", data.scale.replaceAll(',', ' '))
        })
    }else{
        bots.forEach( bot => {
            bot.setAttribute("rotation", "0 0 0")
            bot.setAttribute("position", "0 0 0")
            bot.setAttribute("scale", "2.7 2.7 2.7 2.7") 
        })
    }
    
    // // target 
    const targets = document.querySelectorAll('.target');
    const displayTarget = document.getElementById('displayTarget');
    targets.forEach( target => {
        target.addEventListener("targetFound", event => {
            console.log("targetFound")
            if(showingCat) return;
            showingCat = true;
            const style = document.createElement('style');
            style.innerHTML = `
            .mindar-ui-scanning{
                display: none!important;
            }
            `
            style.id = 'mindar-ui-scanning-style';
            document.head.appendChild(style);
            if(scanObj) {
                // clearInterval(refreshInterval);
                setTimeout(() => {
                    displayTarget.object3D.matrix =  event.target.object3D.matrix;  
                }, 100)
            }else{
                scanObj = event.target;
                setTimeout(() => {
                    displayTarget.object3D.matrix =  event.target.object3D.matrix;  
                }, 100)
            }
            if(refreshInterval){
                clearInterval(refreshInterval);
            }

            refreshInterval = setInterval(() => {
                // store last matrix
                // compare with current matrix, if too much change, then reset
                const currentMatrix = scanObj.object3D.matrix;
                if(lastMatrix) {
                    const diff = currentMatrix.elements.map((element, index) => {
                        return Math.abs(element - lastMatrix.elements[index]);
                    })
                    const differentAmount = diff.reduce((a, b) => a + b, 0);
                    console.log(differentAmount)
                    if(differentAmount > 0.01) {
                        lastMatrix = currentMatrix;
                        return;
                    }
                }
                lastMatrix = currentMatrix;

                // displayTarget.object3D.matrix =  scanObj.object3D.matrix;  
            }, 100)
            
            
            
            // setTimeout(() => {
            //     displayTarget.object3D.matrix =  event.target.object3D.matrix;

            //     setTimeout(() => {
            //         // remove mindar-ui-scanning-style
            //         const style = document.getElementById('mindar-ui-scanning-style');
            //         style.remove();
            //         displayTarget.object3D.matrix = new AFRAME.THREE.Matrix4().set(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
            //         displayTarget.children[0].setAttribute("rotation", "0 0 0")
            //         displayTarget.children[0].setAttribute("position", "0 0 0")
            //         displayTarget.children[0].setAttribute("scale", "2.7 2.7 2.7 2.7") 
                     
            //         showingCat = false;
            //     },3000)
            //     // event.target.object3D.matrix = new AFRAME.THREE.Matrix4().set(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
            //     // event.target.object3D.visible = false;
            // }, 200)
            // arSystem.pause()
            // displayTarget.object3D
        });
        target.addEventListener("targetLost", event => {
            console.log("targetLost")
            scanObj = null;
            clearInterval(refreshInterval);
            setTimeout(() => {
                        // remove mindar-ui-scanning-style
                const style = document.getElementById('mindar-ui-scanning-style');
                style.remove();
                displayTarget.object3D.matrix = new AFRAME.THREE.Matrix4().set(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
                displayTarget.children[0].setAttribute("rotation", "0 0 0")
                displayTarget.children[0].setAttribute("position", "0 0 0")
                displayTarget.children[0].setAttribute("scale", "2.7 2.7 2.7 2.7") 
                    
                showingCat = false;
                clearInterval(refreshInterval);
            },3000)
            // console.log("target Lost");
            // displayTarget.object3D.matrix = new AFRAME.THREE.Matrix4().set(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
        });
    })
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

    // selectAnimation.addEventListener('change', (ev) => {
    //     // get all class bots
    //     const bots = document.querySelectorAll('.bot');
    //     bots.forEach( bot => {
    //         const newAttr = `clip: ${selectAnimation.value}; crossFadeDuration: .3;`
    //         bot.setAttribute("animation-mixer", newAttr)
    //     })
    // })

    const emptyContainer = document.querySelector('.emptyContainer');
    // toggle show hide otherControl and top if emptyContainer is clicked
    emptyContainer.addEventListener('click', () => {
        if(!showingCat) {
            top.style.display = 'block';
            otherControl.style.display = 'block';
            return;
        }
        const top = document.querySelector('.top');
        const otherControl = document.querySelector('.controls');
        if(otherControl.style.display === 'block') {
            top.style.display = 'none';
            otherControl.style.display = 'none';
        }else{
            top.style.display = 'block';
            otherControl.style.display = 'block';
        }
    })
    
    
});