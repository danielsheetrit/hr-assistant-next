import LayoutContainer from "@/styled/layout-container.styled";
import { MobileHeroContainer } from "@/styled/mobile-hero.styled";
import TypedBanner from "./typed-banner";

export default function MobileHero({ name }) {
  return (
    <LayoutContainer>
      <MobileHeroContainer>
        <TypedBanner name={name}>
          <i className="pi pi-arrow-down"></i>
        </TypedBanner>
      </MobileHeroContainer>
    </LayoutContainer>
  );
}
