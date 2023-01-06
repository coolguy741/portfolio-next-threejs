import experiwear2Large from 'assets/experiwear2-large.jpg';
import experiwear2Placeholder from 'assets/experiwear2-placeholder.jpg';
import experiwear2 from 'assets/experiwear2.jpg';
import experiwearLarge from 'assets/experiwear-large.jpg';
import experiwearPlaceholder from 'assets/experiwear-placeholder.jpg';
import experiwear from 'assets/experiwear.jpg';
import sanguineLarge from 'assets/sanguine-large.jpg';
import sanguinePlaceholder from 'assets/sanguine-placeholder.jpg';
import sanguine from 'assets/sanguine.jpg';
import weaveTextureLarge from 'assets/weave-dark-large.jpg';
import weaveTexturePlaceholder from 'assets/weave-dark-placeholder.jpg';
import weaveTexture from 'assets/weave-dark.jpg';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Back End Developer', 'Blockchain Developer', 'Three.js Developer'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Designer + Developer"
        description="Portfolio of Alexandre Andre — Full Stack Developer with 7+ years of experience."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Weave"
        description="Weave is a next generation yield farming platform"
        buttonText="View website"
        buttonLink="/projects/weave"
        model={{
          type: 'laptop',
          alt: 'Weave',
          textures: [
            {
              srcSet: [weaveTexture, weaveTextureLarge],
              placeholder: weaveTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Experiwear"
        description="Experiwear line of smartband products was created to deliver frictionless experiences that drive business and venue value while creating memorable user experiences."
        buttonText="View website"
        buttonLink="/projects/experiwear"
        model={{
          type: 'phone',
          alt: 'Experiwear',
          textures: [
            {
              srcSet: [experiwear, experiwearLarge],
              placeholder: experiwearPlaceholder,
            },
            {
              srcSet: [experiwear2, experiwear2Large],
              placeholder: experiwear2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Sanguine"
        description="Sanguine is a London-based full-service healthcare advertising agency."
        buttonText="View project"
        buttonLink="/projects/sanguine"
        model={{
          type: 'laptop',
          alt: 'Sanguine',
          textures: [
            {
              srcSet: [sanguine, sanguineLarge],
              placeholder: sanguinePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
