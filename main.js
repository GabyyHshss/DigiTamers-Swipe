import * as THREE from 'three';


const $bkg = document.getElementById('smoke-bkg');

    let w = window.innerWidth
    let h = window.innerHeight

    // creando la base
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, w/h, 1, 1000)
    camera.position.z = 10
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(w, h)
    renderer.setClearColor(0xff0030, 0.6)

    $bkg?.appendChild(renderer.domElement)

    // luz direccional
    const light = new THREE.DirectionalLight(0xffffff, 0.2)
    light.position.set(-1, 3, 1)
    scene.add(light)

    // smoke
    const smokeParticles /*: THREE.Mesh[]*/ = [] // To Investigate
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = ''

    loader.load('resources/background/smoke.webp', (texture) => {
        const smokeGeo = new THREE.PlaneGeometry(300, 300)

        const smokeMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true,
            opacity: 0.2
        })

        const NUM_OF_PARTICLES = 300

        for (let p = 0; p < NUM_OF_PARTICLES; p++){
            const particle = new THREE.Mesh(smokeGeo, smokeMaterial)
            particle.position.set(
                Math.random() * 500 - 250,
                Math.random() * 500 - 250,
                Math.random() * 1000 - 100
            )
            particle.rotation.z = Math.random() * 360
            scene.add(particle)
            smokeParticles.push(particle)
        }
    })

    function resize() {
        h = window.innerHeight
        w = window.innerWidth
        camera.aspect = w / h
        camera.updateProjectionMatrix() // ejecutar siempre q se cambiam los parametros de la camara
        renderer.setSize(w, h)
    }

    function animate() {
        requestAnimationFrame(animate)
        
        smokeParticles.forEach(particle => {
            particle.rotation.z += 0.003
        })

        renderer.render(scene, camera)
    }

    animate()
    window.addEventListener("resize", resize)