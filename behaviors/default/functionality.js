import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as dat from 'dat.gui';
import Chart from 'chart.js/auto';

class ModelPawn extends PawnBehavior {
    setup() {
        let trm = this.service("ThreeRenderManager");
        let group = this.shape;

        if (this.actor._cardData.toneMappingExposure !== undefined) {
            trm.renderer.toneMappingExposure = this.actor._cardData.toneMappingExposure;
        }

        const originalMaterials = new Map(); // Store original materials for each object

        let highlightedObject = null; // Define highlightedObject variable
        let lineChart = null; // Reference to the line chart

        const onDocumentMouseClick = (event) => {
            event.preventDefault();

            const mouse = new THREE.Vector2(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, trm.camera);

            const intersects = raycaster.intersectObjects(group.children, true);

            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;

                // Reset previously highlighted object
                if (highlightedObject && highlightedObject !== clickedObject) {
                    console.log('Resetting previously highlighted object:', highlightedObject.uuid);
                    resetObjectMaterial(highlightedObject);
                }

                // Highlight the clicked object only if it is not already highlighted
                if (highlightedObject !== clickedObject) {
                    console.log('Highlighting new object:', clickedObject.uuid);
                    highlightObject(clickedObject);
                    displayServerInfo(clickedObject);
                    updateLineChart(clickedObject);
                } else {
                    console.log('Clicked object is already highlighted:', clickedObject.uuid);
                }

            } else {
                // Hide the serverInfo div and line chart if no object is clicked
                console.log('No object clicked, hiding server info and line chart');
                hideServerInfo();
                hideLineChart();

                // Reset previously highlighted object
                if (highlightedObject) {
                    console.log('Resetting previously highlighted object:', highlightedObject.uuid);
                    resetObjectMaterial(highlightedObject);
                    highlightedObject = null; // Clear the highlightedObject
                }
            }
        };

        const displayServerInfo = (server) => {
            const serverInfo = document.getElementById('serverInfo');
            serverInfo.innerHTML = `
                <h3>Server Info</h3>
                <p>ID: ${server.uuid}</p>
                <p>Name: ${server.name || 'N/A'}</p>
                <p>Position: ${server.position.toArray().map(coord => coord.toFixed(2)).join(', ')}</p>
                <p>Rotation: ${[
                    server.rotation.x.toFixed(2),
                    server.rotation.y.toFixed(2),
                    server.rotation.z.toFixed(2)
                ].join(', ')}</p>
                <h4>Sub-children</h4>
                ${getSubChildrenInfo(server)}
            `;
            serverInfo.style.left = '10px'; // Set position to fixed values for now
            serverInfo.style.top = '10px';
            serverInfo.style.display = 'block';
        };

        const getSubChildrenInfo = (object) => {
            let info = '';
            object.traverse(child => {
                if (child !== object) {
                    info += `
                        <p>Sub-child ID: ${child.uuid}</p>
                        <p>Sub-child Name: ${child.name || 'N/A'}</p>
                        <p>Position: ${child.position.toArray().map(coord => coord.toFixed(2)).join(', ')}</p>
                        <p>Rotation: ${[
                            child.rotation.x.toFixed(2),
                            child.rotation.y.toFixed(2),
                            child.rotation.z.toFixed(2)
                        ].join(', ')}</p>
                        <hr>
                    `;
                }
            });
            return info;
        };

        const hideServerInfo = () => {
            const serverInfo = document.getElementById('serverInfo');
            serverInfo.style.display = 'none';
        };

        const highlightObject = (object) => {
            // Store original material
            if (!originalMaterials.has(object)) {
                originalMaterials.set(object, object.material.clone()); // Clone the material to ensure a deep copy
            }

            // Set highlight material
            const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            object.material = highlightMaterial;

            // Store highlighted objectsss
            highlightedObject = object;
        };

        const resetObjectMaterial = (object) => {
            // Reset to original material
            const originalMaterial = originalMaterials.get(object);
            if (originalMaterial) {
                object.material = originalMaterial;
            }

            // Clear the highlightedObject if it is being reset
            if (highlightedObject === object) {
                highlightedObject = null;
            }
        };

        const hideLineChart = () => {
            const lineChartCanvas = document.getElementById('barChart');
            lineChartCanvas.style.display = 'none';
        };

        const updateLineChart = (object) => {
            const lineChartCanvas = document.getElementById('barChart');
        
            // Ensure lineChartCanvas is a canvas element
            if (!(lineChartCanvas instanceof HTMLCanvasElement)) {
                console.error('Element with ID barChart is not a canvas element.');
                return;
            }
        
            lineChartCanvas.width = 50; // Set the width to 200px
            lineChartCanvas.height = 50; // Set the height to 200px
        
            const ctx = lineChartCanvas.getContext('2d');
        
            const data = {
                labels: ['Position X', 'Position Y', 'Position Z'],
                datasets: [{
                    label: 'Object Data',
                    data: [
                        object.position.x, 
                        object.position.y, 
                        object.position.z, 
                     
                    ],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            };
        
            const options = {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            };
        
            // Destroy the previous chart if it exists
            if (lineChart) {
                lineChart.destroy();
            }
        
            // Create a new chart
            lineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: options
            });
        
            // Display the line chart
            lineChartCanvas.style.display = 'block';
        };
        

        // Add event listener for mouse clicks
        document.addEventListener('click', onDocumentMouseClick, false);

        // Initialize DRACOLoader
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/libs/draco/');

        // Set DRACOLoader as an extension to GLTFLoader
        const gltfLoader = new THREE.GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        this.lights = [];

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
            // Further actions if needed after model load
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

