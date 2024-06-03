if (!window.gui) {
    window.gui = new dat.GUI();
  
    // Load state from localStorage
    const savedState = JSON.parse(localStorage.getItem("guiState")) || {
      traverseAndColor: false,
      traverseAndColor1: false,
      traverseAndColor2: false,
      traverseAndColor3: false,
      traverseAndColor4: false,
      traverseAndColor5: false,
      traverseAndColor6: false,
      traverseAndColor7: false,
      createTemperatureSimulation: false,
      createTemperatureSimulation1: false,
      createTemperatureSimulation2: false,
      createTemperatureSimulation3: false,
      createTemperatureSimulation4: false,
      createTemperatureSimulation5: false,
      createTemperatureSimulation6: false,
      createTemperatureSimulation7: false,
    };
  
    // GUI object definitions
    const guiObjects = {
      traverseAndColor: savedState.traverseAndColor,
      traverseAndColor1: savedState.traverseAndColor1,
      traverseAndColor2: savedState.traverseAndColor2,
      traverseAndColor3: savedState.traverseAndColor3,
      traverseAndColor4: savedState.traverseAndColor4,
      traverseAndColor5: savedState.traverseAndColor5,
      traverseAndColor6: savedState.traverseAndColor6,
      traverseAndColor7: savedState.traverseAndColor7,
      createTemperatureSimulation: savedState.createTemperatureSimulation,
    };
  
    // Add GUI controls and their change handlers
    window.gui.add(guiObjects, "traverseAndColor").name("Server Temp").onChange((value) => {
      savedState.traverseAndColor = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor1").name("Rack wise Temp").onChange((value) => {
      savedState.traverseAndColor1 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor1(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor2").name("CFD").onChange((value) => {
      savedState.traverseAndColor2 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor2(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor3").name("CFD 2").onChange((value) => {
      savedState.traverseAndColor3 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor3(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor4").name("CFD 3").onChange((value) => {
      savedState.traverseAndColor4 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor4(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor5").name("CFD 4").onChange((value) => {
      savedState.traverseAndColor5 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor5(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor6").name("CFD 5").onChange((value) => {
      savedState.traverseAndColor6 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor6(value);
    });
  
    window.gui.add(guiObjects, "traverseAndColor7").name("Hvac Convection").onChange((value) => {
      savedState.traverseAndColor7 = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      applyTraverseAndColor7(value);
    });
  
    window.gui.add(guiObjects, "createTemperatureSimulation").name("Air Flow").onChange((value) => {
      savedState.createTemperatureSimulation = value;
      localStorage.setItem("guiState", JSON.stringify(savedState));
      handleTemperatureSimulations(value);
    });
  
    // Apply the saved state to the GUI on load
    if (savedState.traverseAndColor) applyTraverseAndColor(true);
    if (savedState.traverseAndColor1) applyTraverseAndColor1(true);
    if (savedState.traverseAndColor2) applyTraverseAndColor2(true);
    if (savedState.traverseAndColor3) applyTraverseAndColor3(true);
    if (savedState.traverseAndColor4) applyTraverseAndColor4(true);
    if (savedState.traverseAndColor5) applyTraverseAndColor5(true);
    if (savedState.traverseAndColor6) applyTraverseAndColor6(true);
    if (savedState.traverseAndColor7) applyTraverseAndColor7(true);
    if (savedState.createTemperatureSimulation) handleTemperatureSimulations(true);
  }
  
  // Define the functions to apply the color traversal
  function applyTraverseAndColor(value) {
    for (let i = 0; i <= 74; i++) {
      if (i >= 5 && i <= 19) continue;
      colorIndex = i - 1;
      for (let j = 2; j <= 13; j++) {
        traverseAndColor(model.children[i].children[j], !value);
      }
    }
  }
  
  function applyTraverseAndColor1(value) {
    for (let i = 0; i <= 74; i++) {
      if (i >= 5 && i <= 19) continue;
      colorIndex = i;
      traverseAndColor1(model.children[i].children[1], !value);
      traverseAndColor1(model.children[i].children[1].children[0], !value);
    }
  }
  
  function applyTraverseAndColor2(value) {
    handleTraverseColoring(model.children[17], value, 0, 10, traverseAndColor2);
    handleTraverseColoring(model.children[17], value, 11, 22, traverseAndColor3);
    handleTraverseColoring(model.children[17], value, 23, 34, traverseAndColor4);
    handleTraverseColoring(model.children[17], value, 35, 46, traverseAndColor5);
    handleTraverseColoring(model.children[17], value, 47, 59, traverseAndColor6);
  }
  
  function applyTraverseAndColor3(value) {
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
  
  function applyTraverseAndColor4(value) {
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
  
  function applyTraverseAndColor5(value) {
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
  
  function applyTraverseAndColor6(value) {
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
  
  function applyTraverseAndColor7(value) {
    for (let i = 0; i <= 267; i++) {
      traverseAndColor7(model.children[75].children[i], !value);
    }
  }
  
  // Helper function for applying traverse and color
  function handleTraverseColoring(parent, value, start, end, func) {
    for (let i = start; i <= end; i++) {
      colorIndex = i - 1;
      func(parent.children[i], !value);
    }
  }
  
  // Handle temperature simulations
  function handleTemperatureSimulations(value) {
    if (value) {
      temperatureSimulations = simulationFunctions.map((func) => func(group, THREE));
    } else {
      temperatureSimulations.forEach((simulation) => simulation.remove());
      temperatureSimulations = [];
    }
  }
  
  // Define your traverse and color functions (example implementations)
  function traverseAndColor(node, reset) {
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
  
  function traverseAndColor1(node, reset) {
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
  
  function traverseAndColor2(node, reset) {
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
  
  function traverseAndColor3(node, reset) {
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
  
  function traverseAndColor4(node, reset) {
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
  
  function traverseAndColor5(node, reset) {
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
  
  function traverseAndColor6(node, reset) {
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
  
  function traverseAndColor7(node, reset) {
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
  
  // Define your temperature simulation functions (example implementations)
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
  