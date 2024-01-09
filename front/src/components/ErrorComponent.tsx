import { ErrorProps } from "../interfaces/Interfaces";

export default function ErrorComponent({strong,span}:ErrorProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert">
      <strong className="font-bold">{strong}</strong>
      <span className="block sm:inline">{span}</span>
    </div>
  );
}
