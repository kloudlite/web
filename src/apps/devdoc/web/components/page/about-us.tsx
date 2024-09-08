import Wrapper from '../wrapper';
import AboutMain from '../website/about/main';
import AboutVision from '../website/about/vision';
import AboutMission from '../website/about/mission';
import AboutTeam from '../website/about/team';
import AboutBackedBy from '../website/about/backedby';

const AboutUs = () => {
  return (
    <Wrapper className="wb-relative wb-flex wb-flex-col wb-items-center">
      <AboutMain />
      <AboutVision />
      <AboutMission />
      <AboutTeam />
      <AboutBackedBy />
    </Wrapper>
  );
};

export default AboutUs;
