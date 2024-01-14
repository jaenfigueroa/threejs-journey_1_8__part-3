import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects

// cube
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// plane
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100, 100, 100),
  new THREE.MeshBasicMaterial({
    color: 'gray',
    side: THREE.FrontSide,
    wireframe: true,
  })
)

plane.rotation.x = Math.PI * 1.5
plane.position.y = -0.5
scene.add(plane)

// esfera

const esfera = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
)

esfera.position.z = -1.5

scene.add(esfera)

// dona

const dona = new THREE.Mesh(
  new THREE.TorusGeometry(),
  new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
)

dona.scale.set(0.5, 0.5, 0.5)
dona.rotation.x = Math.PI * 0.5
dona.position.y = 1

scene.add(dona)

// cono
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
)

cone.position.x = -2

scene.add(cone)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
// const clock = new THREE.Clock()

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
