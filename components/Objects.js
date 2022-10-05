import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useTransform, useSpring } from "framer-motion";

export const Icosahedron = ({ scrollYProgress }) => {
  const rotationZ = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  const rotation = useSpring(rotationZ, { stiffness: 400, damping: 40 });
  const myMesh = useRef();
  useFrame(() => {
    myMesh.current.rotation.x += 0.003;
    myMesh.current.rotation.y += 0.002;
  });
  return (
    <motion.mesh
      ref={myMesh}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      rotateZ={rotation}
    >
      <icosahedronGeometry args={[1, 0]} />
      <Material />
    </motion.mesh>
  );
};

export const Torus = () => {
  const myMesh = useRef();
  useFrame(() => {
    myMesh.current.rotation.x += 0.001;
    myMesh.current.rotation.y += 0.003;
  });
  return (
    <motion.mesh
      ref={myMesh}
      initial={{ rotateX: -1, opacity: 0 }}
      animate={{ rotateX: 1, opacity: 1 }}
    >
      <torusGeometry args={[2, 0.05, 20, 100]} />
      <Material />
    </motion.mesh>
  );
};

export const Dodecahedron = ({ scrollYProgress }) => {
  const myMesh = useRef();
  const rotationZ = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  const rotation = useSpring(rotationZ, { stiffness: 400, damping: 40 });
  useFrame(() => {
    myMesh.current.rotation.x += 0.005;
    myMesh.current.rotation.y += 0.003;
  });
  return (
    <motion.mesh
      ref={myMesh}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      rotateZ={rotation}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <Material />
    </motion.mesh>
  );
};

export function Material() {
  return (
    <meshPhongMaterial
      color="#fff"
      specular="#61dafb"
      shininess={10}
      // wireframe
    />
  );
}

export function Lights() {
  return (
    <>
      <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={0.2} />
      <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={0.1} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={0.5} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={2} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={0.1} />
    </>
  );
}

export const transition = {
  type: "spring",
  stiffness: 50,
  damping: 50,
};
