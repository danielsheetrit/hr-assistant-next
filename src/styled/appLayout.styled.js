import styled from "styled-components";

const AppLayoutContainer = styled.main`
  display: grid;
  grid-template-columns:
    minmax(1rem, 1fr)
    minmax(auto, 1280px)
    minmax(1rem, 1fr);

  > * {
    grid-column: 2;

    &.full {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 550px) {
    grid-template-columns:
      minmax(1rem, 1fr)
      minmax(auto, 550px)
      minmax(1rem, 1fr);
  }

  @media (min-width: 740px) {
    grid-template-columns:
      minmax(1rem, 1fr)
      minmax(auto, 740px)
      minmax(1rem, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns:
      minmax(2rem, 1fr)
      minmax(auto, 1280px)
      minmax(2rem, 1fr);
  }
`;

export default AppLayoutContainer;
