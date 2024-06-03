import * as THREE from 'three';
import { GLTFLoader } from 'node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import * as dat from 'dat.gui';
class ModelPawn extends PawnBehavior {
    setup() {
      
        let trm = this.service("ThreeRenderManager");
        let group = this.shape;

        if (this.actor._cardData.toneMappingExposure !== undefined) {
            trm.renderer.toneMappingExposure = this.actor._cardData.toneMappingExposure;
        } 
       

        // Initialize DRACOLoader
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/');

        // Set DRACOLoader as an extension to GLTFLoader
        const gltfLoader = new THREE.GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);
        

        this.lights = [];
        let particles = [];

        const loadModelPromise = new Promise((resolve, reject) => {
            gltfLoader.load(
                './assets/Server room .glb',
                (gltf) => {
                    const model = gltf.scene;

                    model.position.set(0, -1.6, 0);
                    const scaleFactor = 2;
                    model.scale.set(scaleFactor, scaleFactor, scaleFactor);

                    group.add(model);
                    console.log(model);

                    resolve(model);
                },
                null,
                (error) => {
                    console.error('Error loading GLTF model:', error);
                    reject(error);
                }
              
            );
 
        });

        loadModelPromise.then((model) => {
            const colors = [0xff0e00, 0xff7100, 0xffde2d, 0xfbffff, 0x80f2ff, 0x01aeff, 0x0029ff];

            // Shuffle the colors array to randomize the order
            for (let i = colors.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [colors[i], colors[j]] = [colors[j], colors[i]];
            }

            let colorIndex = 0;

            const originalMaterials = new Map();

            function traverseAndColor(object, restore = false) {
                if (object.isMesh) {
                    if (restore) {
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        const color = colors[colorIndex % colors.length];
                        const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 });
                        object.material = material;
                        colorIndex++;
                    }
                }


                object.children.forEach((child, index) => {
                    if (index >= 1) { // Only affect children with an index of 2 or higher
                        traverseAndColor(child, restore);
                    }
                });
            }
            function traverseAndColor1(object, restore = false) {
                if (object.isMesh) {
                    if (restore) {
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        const color = colors[colorIndex % colors.length];
                        const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 });
                        object.material = material;
                        colorIndex++;
                    }
                }

                object.children.forEach((child, index) => {
                    if (index >= 1) { // Only affect children with an index of 2 or higher
                        traverseAndColor1(child, restore);
                    }
                });
            }

            function traverseAndColor2(object, restore = false) {
                // If the object is a mesh and it's within the desired range of children indices, apply the color or restore material
                if (object.isMesh) {
                    if (restore) {
                        // Restore the original material if available
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        // Apply new texture if restoring the original material is not requested
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        // Load texture
                        const textureLoader = new THREE.TextureLoader();
                        textureLoader.load('./assets/images/Texture.jpg', (texture) => {
                        const material = new THREE.MeshBasicMaterial({ 
                        map: texture,
                        transparent: true,
                        opacity: 0.6 // Adjust the opacity value as needed (0.0 to 1.0)
});

                            object.material = material;
                        });
                    }
                }

                // Recursively traverse specific children based on the index condition
                object.children.forEach((child, index) => {
                    if (index >= 0) { // Only affect children with an index of 2 or higher
                        traverseAndColor2(child, restore);
                    }
                });
            }
            function traverseAndColor3(object, restore = false) {
                // If the object is a mesh and it's within the desired range of children indices, apply the color or restore material
                if (object.isMesh) {
                    if (restore) {
                        // Restore the original material if available
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        // Apply new texture if restoring the original material is not requested
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        // Load texture
                        const textureLoader = new THREE.TextureLoader();
                        textureLoader.load('./assets/images/Texture1.jpg', (texture) => {
                           const material = new THREE.MeshBasicMaterial({ 
  map: texture,
  transparent: true,
  opacity: 0.6 // Adjust the opacity value as needed (0.0 to 1.0)
});

                            object.material = material;
                        });
                    }
                }

                // Recursively traverse specific children based on the index condition
                object.children.forEach((child, index) => {
                    if (index >= 0) { // Only affect children with an index of 2 or higher
                        traverseAndColor3(child, restore);
                    }
                });
            }
            function traverseAndColor4(object, restore = false) {
                // If the object is a mesh and it's within the desired range of children indices, apply the color or restore material
                if (object.isMesh) {
                    if (restore) {
                        // Restore the original material if available
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        // Apply new texture if restoring the original material is not requested
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        // Load texture
                        const textureLoader = new THREE.TextureLoader();
                        textureLoader.load('./assets/images/Texture2.jpg', (texture) => {
                           const material = new THREE.MeshBasicMaterial({ 
  map: texture,
  transparent: true,
  opacity: 0.6 // Adjust the opacity value as needed (0.0 to 1.0)
});

                            object.material = material;
                        });
                    }
                }

                // Recursively traverse specific children based on the index condition
                object.children.forEach((child, index) => {
                    if (index >= 0) { // Only affect children with an index of 2 or higher
                        traverseAndColor4(child, restore);
                    }
                });
            }
            function traverseAndColor5(object, restore = false) {
                // If the object is a mesh and it's within the desired range of children indices, apply the color or restore material
                if (object.isMesh) {
                    if (restore) {
                        // Restore the original material if available
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        // Apply new texture if restoring the original material is not requested
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        // Load texture
                        const textureLoader = new THREE.TextureLoader();
                        textureLoader.load('./assets/images/Texture3.jpg', (texture) => {
                           const material = new THREE.MeshBasicMaterial({ 
  map: texture,
  transparent: true,
  opacity: 0.6 // Adjust the opacity value as needed (0.0 to 1.0)
});

                            object.material = material;
                        });
                    }
                }

                // Recursively traverse specific children based on the index condition
                object.children.forEach((child, index) => {
                    if (index >= 0) { // Only affect children with an index of 2 or higher
                        traverseAndColor5(child, restore);
                    }
                });
            }
            function traverseAndColor6(object, restore = false) {
                // If the object is a mesh and it's within the desired range of children indices, apply the color or restore material
                if (object.isMesh) {
                    if (restore) {
                        // Restore the original material if available
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        // Apply new texture if restoring the original material is not requested
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        // Load texture
                        const textureLoader = new THREE.TextureLoader();
                        textureLoader.load('./assets/images/Texture5.jpg', (texture) => {
                           const material = new THREE.MeshBasicMaterial({ 
  map: texture,
  transparent: true,
  opacity: 0.6 // Adjust the opacity value as needed (0.0 to 1.0)
});

                            object.material = material;
                        });
                    }
                }

                // Recursively traverse specific children based on the index condition
                object.children.forEach((child, index) => {
                    if (index >= 0) { // Only affect children with an index of 2 or higher
                        traverseAndColor6(child, restore);
                    }
                });
            }

            function traverseAndColor7(object, restore = false) {
                if (object.isMesh) {
                    if (restore) {
                        const originalMaterial = originalMaterials.get(object);
                        if (originalMaterial) {
                            object.material = originalMaterial;
                        }
                    } else {
                        if (!originalMaterials.has(object)) {
                            originalMaterials.set(object, object.material);
                        }
                        const color = colors[colorIndex % colors.length];
                        const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 });
                        object.material = material;
                        colorIndex++;
                    }
                }


                object.children.forEach((child, index) => {
                    if (index >= 1) { // Only affect children with an index of 2 or higher
                        traverseAndColor7(child, restore);
                    }
                });
            }

function createTemperatureSimulation(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            3 + Math.random() * 7.2, // Range from -20 to +20
            -Math.random() * 5, // Start from bottom to top
            -2 + Math.random() * 7
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation1(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            13 + Math.random() * 5.5,
            -Math.random() * 5, // Start from bottom to top
            -2 + Math.random() * 7
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation2(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            -13 + Math.random() * 1,
            -Math.random() * 5, // Start from bottom to top
            -2 + Math.random() * 7
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation3(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            0.1 + Math.random() * -9,
            -Math.random() * 5, // Start from bottom to top
            -2 + Math.random() * 7
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation4(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            3 + Math.random() * 7.2, // Range from -20 to +20
            -Math.random() * 5, // Start from bottom to top
            8.5 + Math.random() * 8.5
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation5(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            13 + Math.random() * 5.5,
            -Math.random() * 5, // Start from bottom to top
            8.5 + Math.random() * 8.5
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation6(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            -13 + Math.random() * 1,
            -Math.random() * 5, // Start from bottom to top
            8.5 + Math.random() * 8.5
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}

function createTemperatureSimulation7(group, THREE) {
    const particleCount = 3000;
    const particles = [];

    // Create temperature particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.02, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff }) // Initial color
        );

        particle.position.set(
            0.1 + Math.random() * -9,
            -Math.random() * 5, // Start from bottom to top
            8.5 + Math.random() * 8.5
        );

        // Assign temperature based on height (warmer at the top, cooler at the bottom)
        const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
        particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

        particles.push(particle);
        group.add(particle);
    }

    // Function to remove temperature particles
    function removeParticles() {
        particles.forEach(particle => {
            group.remove(particle); // Remove particle from the group
        });
        particles.length = 0; // Clear the array
    }

    // Function to update temperature particles
    function updateTemperature() {
        particles.forEach(particle => {
            // Move particles upward
            particle.position.y += 0.01;

            // Simulate temperature diffusion or other effects here

            // For simplicity, let's just randomly adjust temperature colors
            const temperature = (particle.position.y / 3) * 255; // Scale from 0 to 255 for color representation
            particle.material.color.setRGB(temperature / 255, 0, (255 - temperature) / 255);

            // Reset temperature particle position if it goes beyond certain height
            if (particle.position.y > 3) {
                particle.position.y = -Math.random() * 3; // Reset to the bottom
            }
        });

        // Schedule next update
        requestAnimationFrame(updateTemperature);
    }

    // Start the temperature simulation
    updateTemperature();

    // Return an object with a remove function to clean up particles
    return {
        remove: removeParticles
    };
}
            function init() {
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer();
            
                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);
            
                const group = new THREE.Group();
                scene.add(group);
            
         
            
                // Adjust the camera position to view the simulation
                camera.position.set(5, 5, 20);
                camera.lookAt(5, 0, 5); // Looking at the center of the room
            
                function animate() {
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }
            
                animate();
            }
            
            init();
            
            
                if (!window.gui) {
                    window.gui = new dat.GUI();
                
                    const savedState = JSON.parse(localStorage.getItem("guiState")) || {
                        traverseAndColor: false,
                        traverseAndColor1: false,
                        traverseAndColor2: false,
                        traverseAndColor3: false,
                        traverseAndColor4: false,
                        traverseAndColor5: false,
                        traverseAndColor6: false,
                        traverseAndColor7: false,
                        createTemperatureSimulation: false,createTemperatureSimulation1: false,createTemperatureSimulation2: false,createTemperatureSimulation3: false,createTemperatureSimulation4: false,createTemperatureSimulation5: false,createTemperatureSimulation6: false,createTemperatureSimulation7: false,
                       
                      };
                
                
                
                const obj = {
                    traverseAndColor: savedState.traverseAndColor // Initial state of the checkbox
                };
                
                window.gui
                .add(obj, 'traverseAndColor')
                .name('Server Temp')
                .onChange(function(value) {
                    if (value) {
                        
                        for (let i=0; i <= 74; i++) {
                            if(i>=5 && i<=19){
                                continue;
                            }
                            
                            // Reset colorIndex for each row
                            colorIndex = i - 1;
                            for (let j = 2; j <= 13; j++) {
                                traverseAndColor(model.children[i].children[j], false);
                            }
                        }
                    } else {
                        for (let i=0; i <= 74; i++) {
                            if(i>=5 && i<=19){
                                continue;
                            }
                            for (let j = 2; j <= 13; j++) {
                                traverseAndColor(model.children[i].children[j], true);
                            }
                        }
                    }
                });
                var obj1 = {
                    traverseAndColor1: false // Initial state of the checkbox
                };
                
                window.gui.add(obj1, 'traverseAndColor1').name('Rack wise Temp').onChange(function(value) {
                    if (value) {
                        for (let i=0; i <= 74; i++) {
                            if(i>=5 && i<=19){
                                continue;
                            }
                            // Reset colorIndex for each row
                            colorIndex = i ;
                            traverseAndColor1(model.children[i].children[1], false);
                            traverseAndColor1(model.children[i].children[1].children[0], false);
                            }
                        }
                     else {
                        for (let i=0; i <= 74; i++) {
                            if(i>=5 && i<=19){
                                continue;
                            }
                           
                            traverseAndColor1(model.children[i].children[1], true);
                                traverseAndColor1(model.children[i].children[1].children[0], true);
                            }
                    }
                });
                var obj2 = {
                    traverseAndColor2: false // Initial state of the checkbox
                };
        
                window.gui.add(obj2, 'traverseAndColor2').name('CFD').onChange(function (value) {
                    if (value) {
                        for (let i=0; i <= 10; i++) {
                            
                            // Reset colorIndex for each row
                            colorIndex = i - 1;
                           
                                traverseAndColor2(model.children[17].children[i], false);
                            }
                            for (let i=11; i <= 22; i++) {
                            
                                // Reset colorIndex for each row
                                colorIndex = i - 1;
                               
                                    traverseAndColor3(model.children[17].children[i], false);
                                } 
                                for (let i=23; i <= 34; i++) {
                            
                                    // Reset colorIndex for each row
                                    colorIndex = i - 1;
                                   
                                        traverseAndColor4(model.children[17].children[i], false);
                                    }
                                     for (let i=35; i <= 46; i++) {
                            
                                        // Reset colorIndex for each row
                                        colorIndex = i - 1;
                                       
                                            traverseAndColor5(model.children[17].children[i], false);
                                        }
                                        for (let i=47; i <= 59; i++) {
                            
                                            // Reset colorIndex for each row
                                            colorIndex = i - 1;
                                           
                                                traverseAndColor6(model.children[17].children[i], false);
                                            }
                        }
                     else {
                        for (let i=0; i <= 10; i++) {
                            
                            // Reset colorIndex for each row
                           
                           
                                traverseAndColor2(model.children[17].children[i], true);
                            }
                            for (let i=11; i <= 22; i++) {
                               traverseAndColor3(model.children[17].children[i], true);
                                } 
                                for (let i=23; i <= 34; i++) {
                            
                                        traverseAndColor4(model.children[17].children[i], true);
                                    }
                                     for (let i=35; i <= 46; i++) {
                            
                                            traverseAndColor5(model.children[17].children[i], true);
                                        }
                                        for (let i=47; i <= 59; i++) {
                            
                                            // Reset colorIndex for each row
                                           
                                           
                                                traverseAndColor6(model.children[17].children[i], true);
                                            }
                    }
                    
                });
        
                var obj3 = {
                    traverseAndColor7: false // Initial state of the checkbox
                };
                
                window.gui.add(obj3, 'traverseAndColor7').name('Hvac Convection ').onChange(function(value) {
                    if (value) {
                       
                        for (let i=0; i <=267; i++) {
                            
                            // Reset colorIndex for each row
                            colorIndex = i - 1;
                           
                                traverseAndColor7(model.children[75].children[i], false);
                           
                        }
                    } 
                    else {
                                for (let i=0; i <= 267; i++) {
                            
                           
                                traverseAndColor7(model.children[75].children[i], true);
                            
                        } 
                    }
                }); 
               
           
                var obj6 = {
                    createTemperatureSimulation: false // Initial state of the checkbox
                };
                
                let temperatureSimulations = []; // Store all simulation instances
                
                const simulationFunctions = [
                    createTemperatureSimulation,
                    createTemperatureSimulation1,
                    createTemperatureSimulation2,
                    createTemperatureSimulation3,
                    createTemperatureSimulation4,
                    createTemperatureSimulation5,
                    createTemperatureSimulation6,
                    createTemperatureSimulation7
                ];
                
                // GUI event handler
                window.gui.add(obj6, 'createTemperatureSimulation').name('Air Flow').onChange(function(value) {
                    if (value) {
                        // Iterate over each function and execute it, storing the instances
                        simulationFunctions.forEach(func => {
                            const simulation = func(group, THREE);
                            temperatureSimulations.push(simulation);
                        });
                    } else {
                        // Remove all simulations
                        temperatureSimulations.forEach(simulation => {
                            simulation.remove(); // Call the remove function for each simulation
                        });
                        temperatureSimulations = []; // Clear the array
                    }
                });
            }
            
    
        

           
            
        
       

        }).catch((error) => {
            console.error('Error loading GLTF model:', error);
        });
       
        this.listen("updateShape", "updateShape");
    }
   
    
    
    teardown() {
        console.log("teardown lights");
     
        let scene = this.service("ThreeRenderManager").scene;
        scene.background?.dispose();
        scene.environment?.dispose();
        scene.background = null;
        scene.environment = null;

        // Dispose particle system
        if (this.particleSystem) {
            this.shape.remove(this.particleSystem);
            this.particleSystem.geometry.dispose();
            this.particleSystem.material.dispose();
        }
    }

    updateShape(options) {
        this.constructBackground(options);
    }

    update(_time) {
        if (this.csm) this.csm.update();
    }
}

export default {
    modules: [{
        name: "Model2",
        pawnBehaviors: [ModelPawn]
    }]
};