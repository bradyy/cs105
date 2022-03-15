import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, TransformControls, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";
import React, { Suspense } from "react";
import { useControls, folder } from "leva";
import { proxy, useSnapshot } from "valtio";
import { Leva, LevaInputs } from "leva";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import TeapotGeometry from "../objects/teapot";
import { useGLTF } from "@react-three/drei";

const state = proxy({ current: null });

const Light = () => {
  const value = useControls({
    "Point Lighting Settings": folder({
      lightIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
        label: "Light Intensity",
      },
      lightDistance: {
        value: 50,
        min: 50,
        max: 1000,
        step: 1,
        label: "Light Distance",
      },
      transform: { value: false, label: "Enable Transform" },
    }),
  });

  const ref = React.useRef();
  useHelper(ref, PointLightHelper, 1);

  return (
    <>
      {value.transform && <TransformControls object={ref} />}
      <pointLight
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="light"
        distance={value.lightDistance}
        castShadow
        receiveShadow
        ref={ref}
        intensity={value.lightIntensity}
        position={[0, 10, 0]}
      />
    </>
  );
};

const SceneAmbientLighting = () => {
  const ambientLightingValues = useControls({
    "Ambient Lighting Settings": folder({
      lightIntensity: {
        value: 0.1,
        min: 0,
        max: 0.2,
        step: 0.01,
        label: "Light Intensity",
      },
    }),
  });

  return <ambientLight intensity={ambientLightingValues.lightIntensity} />;
};

function Box(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 2, 0]}
        onClick={(e) => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
      >
        <boxBufferGeometry shadows attach="geometry" args={[4, 4, 4]} />
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.01}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function BoxPoints(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <points onClick={() => (state.current = "object")} name="object">
      <boxBufferGeometry args={[4, 4, 4]} />
      <pointsMaterial size={0.1} color={props.color} />
    </points>
  );
}

function Sphere(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);

  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 2, 0]}
        onClick={() => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
      >
        <sphereGeometry args={[3]} />
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.001}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function SpherePoints(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <points onClick={() => (state.current = "object")} name="object">
      <sphereGeometry args={[3]} />
      <pointsMaterial size={0.09} color={props.color} />
    </points>
  );
}

function Cylinder(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 2, 0]}
        onClick={() => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
      >
        <cylinderBufferGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.001}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function CylinderPoints(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <>
      <points onClick={() => (state.current = "object")} name="object">
        <cylinderBufferGeometry attach="geometry" args={[1, 1, 2, 32]} />
        <pointsMaterial size={0.08} color={props.color} />
      </points>
    </>
  );
}

function Teapot(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  const geometry = React.useMemo(() => {
    return new TeapotGeometry();
  }, []);

  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 0, 0]}
        onClick={() => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={geometry}
      >
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.001}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function Cup(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  const { nodes, materials } = useGLTF("/scene.gltf");
  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 0, 0]}
        onClick={() => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
        geometry={nodes.defaultMaterial.geometry}
        material={materials.material}
      >
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.001}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function CupPoints(props) {
  const { nodes } = useGLTF("/scene.gltf");

  React.useEffect(() => {
    state.current = null;
  }, []);

  return (
    <>
      <points onClick={() => (state.current = "object")} name="object"  geometry={nodes.defaultMaterial.geometry}>
        <pointsMaterial size={0.05} color={props.color} />
      </points>
    </>
  );
}

function TeapotPoints(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  const geometry = React.useMemo(() => {
    return new TeapotGeometry();
  }, []);
  return (
    <>
      <points
        onClick={() => (state.current = "object")}
        name="object"
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <pointsMaterial size={0.05} color={props.color} />
      </points>
    </>
  );
}

function Cone(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 2, 0]}
        onClick={() => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
      >
        <coneBufferGeometry attach="geometry" args={[3, 6, 14]} />
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.001}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function ConePoints(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <>
      <points onClick={() => (state.current = "object")} name="object">
        <coneBufferGeometry attach="geometry" args={[3, 6, 14]} />
        <pointsMaterial size={0.09} color={props.color} />
      </points>
    </>
  );
}

function Torus(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <>
      <mesh
        key={0}
        receiveShadow
        castShadow
        position={[0, 2, 0]}
        onClick={() => (state.current = "object")}
        onPointerMissed={(e) => e.type === "click" && (state.current = null)}
        name="object"
        dispose={null}
      >
        <torusGeometry args={[2, 0.8, 24, 32]} />
        <meshStandardMaterial
          shadows
          attach="material"
          color={props.color}
          size={0.001}
          wireframe={
            props.type === "solid"
              ? false
              : props.type === "lines"
              ? true
              : false
          }
        />
      </mesh>
    </>
  );
}

function TorusPoints(props) {
  React.useEffect(() => {
    state.current = null;
  }, []);
  return (
    <points onClick={() => (state.current = "object")} name="object">
      <torusGeometry args={[2, 0.8, 24, 32]} />
      <pointsMaterial size={0.09} color={props.color} />
    </points>
  );
}

function Controls() {
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);

  const control = useControls(
    {
      Controls: folder({
        mode: {
          value: "translate",
          options: ["rotate", "scale"],
          render: () => snap.current === "object",
          label: "Transform Mode",
        },
      }),
    },
    [snap]
  );

  return (
    <>
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode={control.mode}
        />
      )}
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

function Animation() {
  const scene = useThree((state) => state.scene);

  const currentObj = scene.getObjectByName("object");

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    currentObj.rotation.y = a;
    currentObj.rotation.x = a;
  });
  return null;
}

function Plane() {
  return (
    <mesh
      receiveShadow
      castShadow
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[7000, 7000]} />
      <meshStandardMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

function ChangeTexture(props) {
  const colorMap = useLoader(TextureLoader, props.url);

  const scene = useThree((state) => state.scene);
  const selectedObject = scene.getObjectByName("object");

  if (selectedObject) {
    if (props.enable === true) selectedObject.material.map = colorMap;
    else selectedObject.material.map = null;
    selectedObject.material.needsUpdate = true;
  }

  return null;
}

const ObjectRenders = (props) => {
  if (props.object === "sphere") {
    if (props.type !== "points") {
      return <Sphere type={props.type} color={props.color} />;
    } else return <SpherePoints color={props.color} />;
  }
  if (props.object === "box") {
    if (props.type !== "points") {
      return <Box type={props.type} color={props.color} />;
    } else return <BoxPoints color={props.color} />;
  }
  if (props.object === "cylinder") {
    if (props.type !== "points") {
      return <Cylinder type={props.type} color={props.color} />;
    } else return <CylinderPoints color={props.color} />;
  }
  if (props.object === "cone") {
    if (props.type !== "points") {
      return <Cone type={props.type} color={props.color} />;
    } else return <ConePoints color={props.color} />;
  }
  if (props.object === "teapot") {
    if (props.type !== "points") {
      return <Teapot type={props.type} color={props.color} />;
    } else return <TeapotPoints color={props.color} />;
  }
  if (props.object === "torus") {
    if (props.type !== "points") {
      return <Torus type={props.type} color={props.color} />;
    } else return <TorusPoints color={props.color} />;
  }
  if (props.object === "cup") {
    if (props.type !== "points") {
      return <Cup type={props.type} color={props.color} />;
    } else return <CupPoints color={props.color} />;
  }
};

function CameraControls() {
  const cameraValues = useControls({
    "Camera Options": folder({
      fov: { value: 100, min: 0, max: 200, step: 1, label: "FOV" },
    }),
  });

  useFrame((state) => {
    state.camera.fov = cameraValues.fov;
    state.camera.updateProjectionMatrix();
  });

  return null;
}

export default function MainApp() {
  const [textureUrl, setTextureUrl] = React.useState(null);

  const objectValues = useControls({
    "Object Options": folder({
      type: {
        value: "sphere",
        options: ["cone", "box", "cylinder", "teapot", "torus", "cup"],
        label: "Type",
        onChange: () => {
          state.current = null;
        },
        transient: false,
      },
      color: {
        value: "#ffffff",
        label: "Color",
      },

      texturetype: {
        value: "solid",
        options: ["lines", "points"],
        label: "Texture",
      },
      texture: {
        value: false,
        label: "Custom Texture",
      },
      image: {
        type: LevaInputs.IMAGE,
        label: "Upload Texture",
        onChange: (v) => {
          getTextureFile(v);
        },
      },
      animation: {
        value: false,
        label: "Animation",
      },
    }),
  });

  const lightingValues = useControls({
    "Lighting Options": folder({
      AmbientLighting: { value: true, label: "Ambient Lighting" },
      PointLighting: { value: true, label: "Point Lighting" },
    }),
  });

  const getTextureFile = async (e) => {
    if (e === undefined) return;
    setTextureUrl(e);
  };

  return (
    <div
      id="canvas"
      style={{
        width: "100vw",
        height: "100vh",
        bottom: "0",
        position: "absolute",
      }}
    >
      <div style={{ width: "360px", height: "auto" }}>
        <Leva />
      </div>
      <Canvas shadows camera={{ position: [0, 15, 15] }}>
        <fog attach="fog" args={["white", 1, 1000]} />
        <Plane />
        <Suspense fallback={null}>
          <ObjectRenders
            object={objectValues.type}
            type={objectValues.texturetype}
            color={objectValues.color}
            url={textureUrl}
          />
          {textureUrl && (
            <ChangeTexture enable={objectValues.texture} url={textureUrl} />
          )}
        </Suspense>
        <Controls />
        <CameraControls />
        {objectValues.animation && <Animation />}
        {lightingValues.AmbientLighting && <SceneAmbientLighting />}
        {lightingValues.PointLighting && <Light />}
      </Canvas>
    </div>
  );
}
