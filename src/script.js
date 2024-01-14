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

// plane
// const plane = new THREE.Mesh(
//   new THREE.PlaneGeometry(100, 100, 100, 100),
//   new THREE.MeshBasicMaterial({
//     color: 'gray',
//     side: THREE.FrontSide,
//     wireframe: true,
//   })
// )

// plane.rotation.x = Math.PI * 1.5
// plane.position.y = -0.5
// scene.add(plane)

// figura 3d custom/personalizada

/* primera forma */

// const positionsArray = new Float32Array(9)

// // primer vertice
// positionsArray[0] = 0 // x
// positionsArray[1] = 0 // y
// positionsArray[2] = 0 // z

// // segundo vertice
// positionsArray[3] = 0 // x
// positionsArray[4] = 1 // y
// positionsArray[5] = 0 // z

// // tercer vertice
// positionsArray[6] = 1 // x
// positionsArray[7] = 1 // y
// positionsArray[8] = 0 // z

/////////////////////////////////////////////////////////////////////

/* SEGUNDA FORMA */

// // 1. geometry
// const geometryCustom = new THREE.BufferGeometry()

// // prettier-ignore
// const positionsArray = new Float32Array([
//     0, 0, 0, // primer vertice // x, y, z
//     0, 1, 0, // segundo vertice // x, y, z
//     1, 1, 0, // tercer vertice // x, y, z
// ])

// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)

// geometryCustom.setAttribute('position', positionAttribute)

// // 2. material
// const material = new THREE.MeshBasicMaterial({
//   color: 'red',
//   wireframe: true,
//   //   side: THREE.DoubleSide,
// })

// // 3. crear el mesh, haciendo uso de geometry creados por nosotros
// const meshCustom = new THREE.Mesh(geometryCustom, material)

// scene.add(meshCustom)

/////////////////////////////////////////////////////////////////////

/* TERCERA FORMA - ORDENDA Y 50 TRIANGULOS */

// 1. geometry
const geometryCustom = new THREE.BufferGeometry()

// prettier-ignore
// const positionsArray = new Float32Array([
//     0, 0, 0, // primer vertice // x, y, z
//     0, 1, 0, // segundo vertice // x, y, z
//     1, 1, 0, // tercer vertice // x, y, z
// ])

// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)

// geometryCustom.setAttribute('position', positionAttribute)

const countTriangles = 100

const positionsArray = new Float32Array(countTriangles * 3 * 3)

for (let i = 0; i < countTriangles * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometryCustom.setAttribute('position', positionAttribute)

// 2. material
const material = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: true,
  //   side: THREE.DoubleSide,
})

// 3. crear el mesh, haciendo uso de geometry creados por nosotros
const meshCustom = new THREE.Mesh(geometryCustom, material)

scene.add(meshCustom)
/////////////////////////////////////////////////////////////////////

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
