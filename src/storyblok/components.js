/**
 * Storyblok Component Registry
 *
 * Maps Storyblok component type names (as defined in the Storyblok Space)
 * to the local React wrapper components. Each wrapper applies
 * storyblokEditable() and passes the blok data to the original component.
 */
import Page from './Page';
import HeroSection from './HeroSection';
import PartnersSection from './PartnersSection';
import CaseStudiesSection from './CaseStudiesSection';
import ServicesSection from './ServicesSection';
import TeamSection from './TeamSection';
import BlogSection from './BlogSection';
import FaqSection from './FaqSection';
import CtaSection from './CtaSection';

const components = {
  page: Page,
  hero_section: HeroSection,
  partners_section: PartnersSection,
  case_studies_section: CaseStudiesSection,
  services_section: ServicesSection,
  team_section: TeamSection,
  blog_section: BlogSection,
  faq_section: FaqSection,
  cta_section: CtaSection,
};

export default components;
