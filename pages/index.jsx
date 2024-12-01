import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "../lib/SceneInit";
import PlanetWithLighting from "../lib/PlanetWithLighting";
import Rotation from "../lib/Rotation";

export default function Home() {
  useEffect(async () => {
    let test = new SceneInit();
    test.initScene();
    test.animate();

    // Add skybox
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('/solarsystemscope/2k_stars_milky_way.jpg');
    test.scene.background = backgroundTexture;

    // Add ambient light (very dim, for slight visibility on dark side)
    const ambientLight = new THREE.AmbientLight(0x111111);
    test.scene.add(ambientLight);

    // Add directional light from the sun's position
    const sunLight = new THREE.PointLight(0xffffff, 2, 300);
    sunLight.position.set(0, 0, 0);
    test.scene.add(sunLight);

    const sunGeometry = new THREE.SphereGeometry(8);
    const sunTexture = new THREE.TextureLoader().load("solarsystemscope/2k_sun.jpg");
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    const solarSystem = new THREE.Group();
    solarSystem.add(sunMesh);
    test.scene.add(solarSystem);

        // Create a sphere
        const sphereRadius = 10;
        const spiralPoints = 1000; // Number of points in the spiral
        const pointsGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(spiralPoints * 3); // 3 coordinates for each point
    
        for (let i = 0; i < spiralPoints; i++) {
          const theta = i * (Math.PI / 5); // Angle in radians
          const phi = i * (Math.PI / 100); // Angle for vertical position
          const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
          const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
          const z = sphereRadius * Math.cos(phi);
    
          positions.set([x, y, z], i * 3);
        }
    
        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
        const pointsMaterial = new THREE.PointsMaterial({
          color: 0x888888,
          size: 1, // Size of points
          sizeAttenuation: true
        });
    
        const points = new THREE.Points(pointsGeometry, pointsMaterial);
    
        const points2 = new THREE.Points(pointsGeometry, pointsMaterial);
    

    const mercury = new PlanetWithLighting(2, 32, "solarsystemscope/2k_mercury.jpg");
    const mercuryMesh = mercury.getMesh();
    let mercurySystem = new THREE.Group();
    mercurySystem.add(mercuryMesh);

    const venus = new PlanetWithLighting(3, 64, "solarsystemscope/2k_venus_atmosphere.jpg");
    const venusMesh = venus.getMesh();
    let venusSystem = new THREE.Group();
    venusSystem.add(venusMesh);

    const earth = new PlanetWithLighting(3, 96, "solarsystemscope/2k_earth_daymap.jpg");
    const earthMesh = earth.getMesh();
    let earthSystem = new THREE.Group();
    earthSystem.add(earthMesh);

    const moon = new PlanetWithLighting(1, 96, "solarsystemscope/2k_moon.jpg");
    const moonMesh = moon.getMesh();
    let moonSystem = new THREE.Group();
    moonSystem.add(moonMesh);

    const mars = new PlanetWithLighting(3, 128, "solarsystemscope/2k_mars.jpg");
    const marsMesh = mars.getMesh();
    let marsSystem = new THREE.Group();
    marsSystem.add(marsMesh);

    const jupiter = new PlanetWithLighting(10, 160, "solarsystemscope/2k_jupiter.jpg");
    const jupiterMesh = jupiter.getMesh();
    let jupiterSystem = new THREE.Group();
    jupiterSystem.add(jupiterMesh);
    
    const saturn = new PlanetWithLighting(7, 192, "solarsystemscope/2k_saturn.jpg");
    const saturnMesh = saturn.getMesh();
    let saturnSystem = new THREE.Group();
    saturnSystem.add(saturnMesh);

    // Create Saturn's ring
    const ringGeometry = new THREE.RingGeometry(10, 11, 64); // inner radius, outer radius, segments
    const ringTexture = textureLoader.load("solarsystemscope/2k_saturn_ring_alpha.png");
    const ringMaterial = new THREE.MeshBasicMaterial({ 
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2; // Rotate ring to be horizontal
    ringMesh.position.x = 192;
    let ringSystem = new THREE.Group();
    ringSystem.add(ringMesh);

    const uranus = new PlanetWithLighting(6, 224, "solarsystemscope/2k_uranus.jpg");
    const uranusMesh = uranus.getMesh();
    let uranusSystem = new THREE.Group();
    uranusSystem.add(uranusMesh);

    const neptune = new PlanetWithLighting(6, 256, "solarsystemscope/2k_neptune.jpg");
    const neptuneMesh = neptune.getMesh();
    let neptuneSystem = new THREE.Group();
    neptuneSystem.add(neptuneMesh);


    solarSystem.add(mercurySystem, venusSystem, earthSystem, moonSystem, marsSystem, jupiterSystem, saturnSystem, ringSystem, uranusSystem, neptuneSystem, points, points2);

    // Add self-rotation to planets
    const mercuryRotation = new Rotation(mercuryMesh);
    const mercuryRotationMesh = mercuryRotation.getMesh();
    mercurySystem.add(mercuryRotationMesh);

    const venusRotation = new Rotation(venusMesh);
    const venusRotationMesh = venusRotation.getMesh();
    venusSystem.add(venusRotationMesh);

    const earthRotation = new Rotation(earthMesh);
    const earthRotationMesh = earthRotation.getMesh();
    earthSystem.add(earthRotationMesh);

    const moonRotation = new Rotation(moonMesh);
    const moonRotationMesh = moonRotation.getMesh();
    moonSystem.add(moonRotationMesh);

    const marsRotation = new Rotation(marsMesh);
    const marsRotationMesh = marsRotation.getMesh();
    marsSystem.add(marsRotationMesh);

    const jupiterRotation = new Rotation(jupiterMesh);
    const jupiterRotationMesh = jupiterRotation.getMesh();
    jupiterSystem.add(jupiterRotationMesh);

    const saturnRotation = new Rotation(saturnMesh);
    const saturnRotationMesh = saturnRotation.getMesh();
    saturnSystem.add(saturnRotationMesh);

    const uranusRotation = new Rotation(uranusMesh);
    const uranusRotationMesh = uranusRotation.getMesh();
    uranusSystem.add(uranusRotationMesh);

    const neptuneRotation = new Rotation(neptuneMesh);
    const neptuneRotationMesh = neptuneRotation.getMesh();
    neptuneSystem.add(neptuneRotationMesh);

    // NOTE: Animate solar system at 60fps.
    const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    const animate = () => {
      sunMesh.rotation.y += 0.001;

      mercurySystem.rotation.y += EARTH_YEAR * 4;
      mercuryMesh.rotation.y += 0.02;

      venusSystem.rotation.y += EARTH_YEAR * 1.6;
      venusMesh.rotation.y += 0.02;

      earthSystem.rotation.y += EARTH_YEAR;
      earthMesh.rotation.y += 0.02;

      marsSystem.rotation.y += EARTH_YEAR * 0.5;
      marsMesh.rotation.y += 0.02;

      moonSystem.rotation.y += EARTH_YEAR;
      moonSystem.position.z = -Math.cos(sunMesh.rotation.y*16)* 10; //cos(rotation.y*a)*b, a = orbit speed, b = radius
      moonSystem.position.x = -Math.sin(sunMesh.rotation.y*16)* 10;
      moonMesh.rotation.y += 0.02;

      jupiterSystem.rotation.y += EARTH_YEAR * 0.08;
      jupiterMesh.rotation.y += 0.02;

      saturnSystem.rotation.y += EARTH_YEAR * 0.03;
      saturnMesh.rotation.y += 0.02;

      ringSystem.rotation.y += EARTH_YEAR * 0.03;

      uranusSystem.rotation.y += EARTH_YEAR * 0.012;
      uranusMesh.rotation.y += 0.02;

      neptuneSystem.rotation.y += EARTH_YEAR * 0.006;
      neptuneMesh.rotation.y += 0.02;

      points.rotation.y -= 0.005; // Rotate the points
      points.rotation.x -= 0.005;

      points2.position.z = -Math.cos(earthSystem.rotation.y-1.57)* 96; //cos(rotation.y*a)*b, a = orbit speed, b = radius
      points2.position.x = -Math.sin(earthSystem.rotation.y-1.57)* 96;
      points2.scale.x = 0.35;
      points2.scale.y = 0.35;
      points2.scale.z = 0.35;
      points2.rotation.y -= 1; // Rotate the points
      points2.rotation.x -= 1;

      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}
