import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "./lib/SceneInit";
import PlanetWithLighting from "./lib/PlanetWithLighting";
import Rotation from "./lib/Rotation";

export default function Home() {
  let gui;

  const initGui = async () => {
    const dat = await import("dat.gui");
    gui = new dat.GUI();
  };

  useEffect(async () => {
    // TODO: Understand this code later.
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

    solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem, moonSystem);

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
    

    // NOTE: Add solar system mesh GUI.
    await initGui();
    const solarSystemGui = gui.addFolder("solar system");
    solarSystemGui.add(mercuryRotationMesh, "visible").name("mercury").listen();
    solarSystemGui.add(venusRotationMesh, "visible").name("venus").listen();
    solarSystemGui.add(earthRotationMesh, "visible").name("earth").listen();
    solarSystemGui.add(moonRotationMesh, "visible").name("moon").listen();
    solarSystemGui.add(marsRotationMesh, "visible").name("mars").listen();

    // NOTE: Animate solar system at 60fps.
    const EARTH_YEAR = 2 * Math.PI * (1 / 60) * (1 / 60);
    const animate = () => {
      sunMesh.rotation.y += 0.001;
      mercurySystem.rotation.y += EARTH_YEAR * 4;
      venusSystem.rotation.y += EARTH_YEAR * 2;
      earthSystem.rotation.y += EARTH_YEAR;
      marsSystem.rotation.y += EARTH_YEAR * 0.5;
      moonSystem.rotation.y += EARTH_YEAR;
      moonSystem.position.z = -Math.cos(sunMesh.rotation.y*16)* 10;//cos(rotation.y*a)*b, a = orbit speed, b = radius
      moonSystem.position.x = -Math.sin(sunMesh.rotation.y*16)* 10;

    // Self-rotation of planets
    mercuryMesh.rotation.y += 0.02;
    venusMesh.rotation.y += 0.02;
    earthMesh.rotation.y += 0.02;
    moonMesh.rotation.y += 0.02;
    marsMesh.rotation.y += 0.02;

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
