// import './style.css'

import * as THREE from "./three.module.js";

let scene, camera, renderer;
let sphere, cloud;
let loader = new THREE.TextureLoader();
let canvas = document.querySelector("canvas.webgl");
let tree;

loader.load(
  "https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json",
  function (response) {
    font = response;
  }
);

  scene = new THREE.Scene();

  let width = window.innerWidth;
  let height = window.innerHeight;
  let aspect = width / height;

  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });

  renderer.setClearColor("black");

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  let bg = loader.load('./Assets/bg.jpg');
  scene.background = bg;

  scene.add(camera);

  document.body.appendChild(renderer.domElement);


let addSphere = () => {
  let sphereTex = loader.load("./Assets/2k_earth_daymap.jpg");
  let sphereNormal = loader.load("./Assets/2k_earth_normal_map.jpg");
  let sphereSpec = loader.load("./Assets/2k_earth_specular_map.jpg");

  let geometry = new THREE.SphereGeometry(15, 20, 20);
  let material = new THREE.MeshPhongMaterial({
    map: sphereTex,
    normalMap: sphereNormal,
    specularMap: sphereSpec,
  });

  sphere = new THREE.Mesh(geometry, material);
  geometry.receiveShadow = true;
  scene.add(sphere);
};

let addCloud = () => {
  let sphereTex = loader.load("./Assets/2k_earth_clouds.jpg");

  let geometry = new THREE.SphereGeometry(15.2, 20, 20);
  let material = new THREE.MeshStandardMaterial({ alphaMap: sphereTex });

  cloud = new THREE.Mesh(geometry, material);
  geometry.castShadow = true;
  material.transparent = true;
  scene.add(cloud);
};

let createLight = () => {
  let ambLight = new THREE.AmbientLight("#FFFFFF", 1);
  let spotLight = new THREE.SpotLight("#FFFFFF", 5, 90, Math.PI / 4);

  spotLight.position.set(40, 20, 20);

  scene.add(spotLight);
  scene.add(ambLight);
};

let createtree = () => {
  let treegeometry = new THREE.BoxGeometry(1, 1, 1);

  let leaveDarkMaterial = new THREE.MeshLambertMaterial({ color: 0x91e56e });
  let leaveLightMaterial = new THREE.MeshLambertMaterial({ color: 0xa2ff7a });
  let leaveDarkDarkMaterial = new THREE.MeshLambertMaterial({
    color: 0x71b356,
  });
  let stemMaterial = new THREE.MeshLambertMaterial({ color: 0x7d5a4f });

  let stem = new THREE.Mesh(treegeometry, stemMaterial);
  stem.position.set(0, 0, 0);
  stem.scale.set(0.3, 1.5, 0.3);

  let squareLeave01 = new THREE.Mesh(treegeometry, leaveDarkMaterial);
  squareLeave01.position.set(0.5, 1.6, 0.5);
  squareLeave01.scale.set(0.8, 0.8, 0.8);

  let squareLeave02 = new THREE.Mesh(treegeometry, leaveDarkMaterial);
  squareLeave02.position.set(-0.4, 1.3, -0.4);
  squareLeave02.scale.set(0.7, 0.7, 0.7);

  let squareLeave03 = new THREE.Mesh(treegeometry, leaveDarkMaterial);
  squareLeave03.position.set(0.4, 1.7, -0.5);
  squareLeave03.scale.set(0.7, 0.7, 0.7);

  let leaveDark = new THREE.Mesh(treegeometry, leaveDarkMaterial);
  leaveDark.position.set(0, 1.2, 0);
  leaveDark.scale.set(1, 2, 1);

  let leaveLight = new THREE.Mesh(treegeometry, leaveLightMaterial);
  leaveLight.position.set(0, 1.2, 0);
  leaveLight.scale.set(1.1, 0.5, 1.1);

  let ground = new THREE.Mesh(treegeometry, leaveDarkDarkMaterial);
  ground.position.set(0, -1, 0);
  ground.scale.set(2.4, 0.8, 2.4);

  tree = new THREE.Group();
  tree.add(leaveDark);
  tree.add(leaveLight);
  tree.add(squareLeave01);
  tree.add(squareLeave02);
  tree.add(squareLeave03);
  tree.add(ground);
  tree.add(stem);

  tree.rotation.y = 1;
  tree.rotation.x = 0.5;

  // scene.add( tree );
};

// let addText = () => {
  let fontLoader = new THREE.FontLoader();

  //add fun fact
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry("Fun facts \nabout the earth", {
      font: font,
      size: 30,
      height: 1,
    });
    textGeo.center();

    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 50;
    text.position.y = 0;

    scene.add(text);
  });

  //fun fact 1
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Energi yang didapatkan dari mendaur ulang satu \nbotol kaca akan menyalakan bola lampu 100 watt \nselama 4 jam.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 600;
    scene.add(text);
  });

  //fun fact 2
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Sekitar 2 juta kantong plastik digunakan tiap menitnya di seluruh dunia. \n(Hmm gimana tuh kalau sampah plastik menumpuk dalam hitungan hari?)",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 1200;
    scene.add(text);
  });

  //penjelasan
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Berapa lama sampah plastik dapat terurai?",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 1800;
    scene.add(text);
  });

  //isi penjelasan
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Dilansir dari Tempo.co, \nrata-rata orang menggunakan kantong plastik \nhanya selama kurang lebih 12 menit. \nFaktanya, kurang dari 3% kantong plastik didaur ulang di seluruh dunia. \nSedangkan kantong plastik baru bisa terurai \nsekitar 10-500 tahun.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 2400;
    scene.add(text);
  });

  //isi penjelasan 2
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Sedotan plastik bisa terurai sekitar 20 tahun. \nGelas plastik terurai sekitar 50 tahun. \nLalu kemasan sachet butuh sekitar 50-80 tahun. \nBotol plastik terurai sekitar 450 tahun. \nSementara styrofoam tidak bisa terurai.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 3000;
    scene.add(text);
  });

  //isi penjelasan 3
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Program Lingkungan Perserikatan Bangsa-Bangsa (UNEP) \nmengatakan sampah plastik yang terurai menjadi mikroplastik itu banyak \ndimakan ikan atau hewan ternak karena mereka mengiranya makanan",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 3600;
    scene.add(text);
  });

  //isi 4
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Program Lingkungan Perserikatan Bangsa-Bangsa (UNEP) \nmengatakan sampah plastik yang terurai menjadi mikroplastik itu banyak \ndimakan ikan atau hewan ternak karena mereka mengiranya makanan",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 3600;
    scene.add(text);
  });

  //isi 5
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Hal ini tentu berbahaya bagi kesehatan hewan \nataupun manusia yang mengonsumsinya dan \nberpotensi menyebabkan penyakit tertentu.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 4200;
    scene.add(text);
  });

  //isi 6
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Dilansir dari Padi.com, \njika satu orang menggunakan kantong \ndaur ulang selama hidupnya, \nmereka bisa membersihkan sekitar 22 ribu kantong plastik\n dari lingkungan.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 4800;
    scene.add(text);
  });

  //isi 7
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "3. Jika di setiap rumah mengganti 1 gulungan tissue toilet \ndengan 1 gulungan tissue daur ulang, \nmaka 424.000 pohon akan terselamatkan.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 5400;
    scene.add(text);
  });

  //isi 8
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Penebangan hutan dapat menyebabkan pemanasan global juga loh! \nTentu pemanasan global adalah \nhal yang buruk bagi bumi yang kita tinggali ini. \nPeningkatan 1 derajat celcius \ndapat menyebabkan gelombang panas, kekeringan, banjir, dan siklon tropis.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 6000;
    scene.add(text);
  });

  //isi 9
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Lalu melelehnya es dan gletser di Greenland Antartika\n bisa menyebabkan kenaikan air laut yang lebih cepat dan\n akan berdampak pada sekitar 50 juta orang \nyang tinggal di kawasan pantai yang rendah dan kota-kota besar dunia, \nseperti London, New York, dan Shanghai.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 6600;
    scene.add(text);
  });

  //isi 10
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Kepunahan satwa pun dapat terjadi \nkarena pasti ada perubahan ekosistem karena perubahan iklim.",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 7200;
    scene.add(text);
  });

  //isi 11
  fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    let textGeo = new THREE.TextGeometry(
      "Amanat: \nYuk rawat bumi kita. \nJika menanam dan merawat tumbuhan sedikit sulit bagimu, \nsetidaknya kita bisa membantu \ndengan tidak mengotori lingkungan dengan plastik, \nyaitu membuang sampah pada tempatnya!",
      {
        font: font,
        size: 30,
        height: 1,
      }
    );
    textGeo.center();
    let textMat = new THREE.MeshBasicMaterial({ color: "white" });

    let text = new THREE.Mesh(textGeo, textMat);

    text.position.z = 7800;
    scene.add(text);
  });

// };

let onMouseWheel = (event) => {
  if (camera.position.z >= 30) {
    camera.position.z += event.deltaY / 5;
    sphere.material.transparent = true;
    cloud.material.transparent = true;

    sphere.material.opacity -= event.deltaY / 1300;
    cloud.material.opacity -= event.deltaY / 1300;

    if (camera.position.z <= 30) {
      camera.position.z = 30;
      sphere.material.opacity = 1;
      cloud.material.opacity = 1;
    }

    if (camera.position.z >= 8500) {
        camera.position.z = 8500;
    }
    // else if(camera.position.z >= 100){
    //     camera.position.z = 100 - 1;
    //     sphere.material.opacity = 0;
    //     cloud.material.opacity = 0;
    //     // scene.remove(sphere)
    // }
  }
  console.log(camera.position.z);
};

let addListener = () => {
  document.addEventListener("wheel", onMouseWheel);
};

let animate = () => {
  sphere.rotation.y += 0.002;
  cloud.rotation.y += 0.0025;

};

let render = () => {
  renderer.render(scene, camera);
  animate();
  addListener();
  requestAnimationFrame(render);
};

window.onload = () => {
  addSphere();
  addCloud();
  document.addEventListener("click", addInteraction);
  createLight();
  createtree();
  // addText();
  render();
};

window.onresize = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
