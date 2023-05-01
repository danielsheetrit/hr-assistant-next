import ReactTyped from "react-typed";
import { TypedContaienr } from "@/styled/typed-banner.styled";

export default function TypedBanner({ name, children }) {
  return (
    <TypedContaienr>
      <h3>Hi {name}, </h3>
      <ReactTyped
        loop
        strings={[
          "You can, Engage Canadid",
          "You can, Refactor CVs",
          "You can, Compose Job Description",
          "You can, Description Safe Scan",
          "You can Do You, just better :)",
        ]}
        typeSpeed={80}
        backSpeed={50}
        backDelay={50}
        startDelay={1}
        smartBackspace
        loopCount={3}
      />
      {children}
    </TypedContaienr>
  );
}
