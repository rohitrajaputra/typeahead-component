import { CustomLoaderProps } from "./types";

const CustomLoader = ({ text = "result" }: CustomLoaderProps) => {
  return <>Loading {text}... </>;
};

export default CustomLoader;
