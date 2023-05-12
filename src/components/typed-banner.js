import { TypedContaienr } from "@/styled/typed-banner.styled";
import { TypeAnimation } from "react-type-animation";

export default function TypedBanner({ name, children }) {
  return (
    <TypedContaienr>
      <h3>Hi {name}, We are good at:</h3>
      <TypeAnimation
        className="typed-animation"
        sequence={[
          "Streamline HR tasks",
          1000,
          "Maximize productivity, minimize HR paperwork",
          2000,
          "Empower employees with self-service HR capabilities",
        ]}
        wrapper="div"
        cursor
        repeat={3}
        style={{
          width: "90%",
          fontFamily: "Poppins",
          fontSize: "1.5rem",
        }}
      />
      {children}
    </TypedContaienr>
  );
}
