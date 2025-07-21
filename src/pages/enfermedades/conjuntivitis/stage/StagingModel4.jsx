import { Cloud, Sky, Sparkles, Stars } from "@react-three/drei";
import { Color } from "three";
  
  // Environment,
  const StagingModel4 = () => {
    return (
      <>
        <Stars
          radius={50} // Radius of the sphere in which stars are placed
          depth={10} // Depth of the star field, creating a layered effect
          count={5000} // Total number of stars in the scene
          factor={4} // Star size factor, affecting how large they appear
          saturation={0} // Color saturation of the stars, 0 means grayscale
          fade // Enables fading effect for a more realistic sky
          speed={10} // Speed at which the stars move (if animated)
        />
      </>
    );
  };
  
  export default StagingModel4;