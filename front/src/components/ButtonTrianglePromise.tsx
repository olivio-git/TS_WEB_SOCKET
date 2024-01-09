import { RotatingTriangles } from "react-loader-spinner";

export default function ButtonTrianglePromise() {
  return (
    <RotatingTriangles
      visible={true}
      height="80" 
      ariaLabel="rotating-triangles-loading"
      wrapperStyle={{}}
      wrapperClass=""
  />
  )
}
