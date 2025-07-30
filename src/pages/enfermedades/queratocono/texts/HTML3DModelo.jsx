import { Center, Html } from "@react-three/drei";
import "./HTML3DModelo.css";

const HTML3DModelo = ({ title }) => {
  return (
    <Center position={[-1, 2.45, 0]}>
      <Html
        center
        transform
        distanceFactor={5}
        wrapperClass="title-laser"
      >
        <h1>{title}</h1>
      </Html>
    </Center>
  );
};

export default HTML3DModelo;