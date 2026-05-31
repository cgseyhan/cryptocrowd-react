import { storyblokEditable, StoryblokComponent } from '@storyblok/react';

/**
 * Page — top-level Storyblok content-type.
 * Iterates over blok.body[] and renders each nested component.
 */
const Page = ({ blok }) => (
  <div {...(storyblokEditable(blok) || {})}>
    {blok.body?.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>
);

export default Page;
