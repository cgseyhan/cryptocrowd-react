/**
 * Storyblok Automated Setup Script
 * Creates all component schemas and the "home" story with pre-populated content.
 *
 * Usage: node scripts/storyblok-setup.mjs
 */

const PERSONAL_TOKEN = 'VtjkQ3hgmMC6bjdkOOJwrAtt-167467614137753-jWotBFf8yP1mT9DTrcLs';
const SPACE_ID = '291946586847864';
const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

const headers = {
  'Authorization': PERSONAL_TOKEN,
  'Content-Type': 'application/json',
};

// ── Helper: API call with retry ──
async function api(method, path, body = null) {
  const url = `${BASE}${path}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  let res;
  for (let attempt = 0; attempt < 3; attempt++) {
    res = await fetch(url, opts);
    if (res.status === 429) {
      // Rate limited — wait and retry
      const wait = parseInt(res.headers.get('retry-after') || '2', 10) * 1000;
      console.log(`  ⏳ Rate limited, waiting ${wait}ms...`);
      await new Promise(r => setTimeout(r, wait));
      continue;
    }
    break;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  }

  return res.status === 204 ? null : res.json();
}

// Small delay between API calls to avoid rate limits
const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

// ──────────────────────────────────────────────────
// PHASE 1: Create Component Schemas
// ──────────────────────────────────────────────────

const COMPONENTS = [
  // ── Leaf bloks (nested inside section bloks) ──
  {
    name: 'partner_item',
    display_name: 'Partner Item',
    is_root: false,
    is_nestable: true,
    schema: {
      name: { type: 'text', pos: 0 },
      logo: { type: 'asset', filetypes: ['images'], pos: 1 },
    },
  },
  {
    name: 'metric_item',
    display_name: 'Metric Item',
    is_root: false,
    is_nestable: true,
    schema: {
      value: { type: 'text', pos: 0 },
      label: { type: 'text', pos: 1 },
    },
  },
  {
    name: 'case_study_item',
    display_name: 'Case Study Item',
    is_root: false,
    is_nestable: true,
    schema: {
      client: { type: 'text', pos: 0 },
      title: { type: 'text', pos: 1 },
      description: { type: 'textarea', pos: 2 },
      tags: { type: 'textarea', pos: 3 },
      color: { type: 'text', default_value: '#343cbb', pos: 4 },
      metrics: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['metric_item'], pos: 5 },
    },
  },
  {
    name: 'service_item',
    display_name: 'Service Item',
    is_root: false,
    is_nestable: true,
    schema: {
      title: { type: 'text', pos: 0 },
      features: { type: 'textarea', pos: 1 },
      result: { type: 'text', pos: 2 },
    },
  },
  {
    name: 'team_member',
    display_name: 'Team Member',
    is_root: false,
    is_nestable: true,
    schema: {
      name: { type: 'text', pos: 0 },
      role: { type: 'text', pos: 1 },
      photo: { type: 'asset', filetypes: ['images'], pos: 2 },
      linkedin_url: { type: 'text', pos: 3 },
    },
  },
  {
    name: 'blog_post',
    display_name: 'Blog Post',
    is_root: false,
    is_nestable: true,
    schema: {
      tag: { type: 'text', pos: 0 },
      title: { type: 'text', pos: 1 },
      tagline: { type: 'text', pos: 2 },
      is_featured: { type: 'boolean', pos: 3 },
    },
  },
  {
    name: 'faq_item',
    display_name: 'FAQ Item',
    is_root: false,
    is_nestable: true,
    schema: {
      question: { type: 'text', pos: 0 },
      answer: { type: 'richtext', pos: 1 },
    },
  },

  // ── Section bloks (nestable inside page body) ──
  {
    name: 'hero_section',
    display_name: 'Hero Section',
    is_root: false,
    is_nestable: true,
    schema: {
      tagline: { type: 'text', default_value: 'Web3 Growth Infrastructure', pos: 0 },
      headline_line1: { type: 'text', default_value: 'Scale Your', pos: 1 },
      headline_line2: { type: 'text', default_value: 'Web3 Vision.', pos: 2 },
      description: { type: 'textarea', pos: 3 },
      description_suffix: { type: 'text', default_value: 'No fluff — Just scalable results.', pos: 4 },
      cta_primary_text: { type: 'text', default_value: 'BOOK A CALL', pos: 5 },
      cta_primary_url: { type: 'text', default_value: 'https://zcal.co/cryptocrowdtr/firstmeeting', pos: 6 },
      cta_secondary_text: { type: 'text', default_value: 'CASE STUDIES', pos: 7 },
      cta_secondary_anchor: { type: 'text', default_value: '#case-studies', pos: 8 },
      watermark_text: { type: 'text', default_value: '10M+', pos: 9 },
    },
  },
  {
    name: 'partners_section',
    display_name: 'Partners Section',
    is_root: false,
    is_nestable: true,
    schema: {
      label: { type: 'text', default_value: 'Trusted by leading Web3 teams', pos: 0 },
      partners: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['partner_item'], pos: 1 },
    },
  },
  {
    name: 'case_studies_section',
    display_name: 'Case Studies Section',
    is_root: false,
    is_nestable: true,
    schema: {
      badge_text: { type: 'text', default_value: '10M+ VIEWS', pos: 0 },
      studies: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['case_study_item'], pos: 1 },
    },
  },
  {
    name: 'services_section',
    display_name: 'Services Section',
    is_root: false,
    is_nestable: true,
    schema: {
      subtitle: { type: 'text', default_value: 'Everything You Need for Web3 Growth', pos: 0 },
      services: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['service_item'], pos: 1 },
    },
  },
  {
    name: 'team_section',
    display_name: 'Team Section',
    is_root: false,
    is_nestable: true,
    schema: {
      subtitle: { type: 'text', default_value: 'Meet the Architects', pos: 0 },
      members: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['team_member'], pos: 1 },
    },
  },
  {
    name: 'blog_section',
    display_name: 'Blog Section',
    is_root: false,
    is_nestable: true,
    schema: {
      sidebar_title: { type: 'text', default_value: 'BLOG', pos: 0 },
      sidebar_description: { type: 'textarea', pos: 1 },
      posts: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['blog_post'], pos: 2 },
    },
  },
  {
    name: 'faq_section',
    display_name: 'FAQ Section',
    is_root: false,
    is_nestable: true,
    schema: {
      subtitle: { type: 'text', default_value: 'Intelligence', pos: 0 },
      items: { type: 'bloks', restrict_type: '', restrict_components: true, component_whitelist: ['faq_item'], pos: 1 },
    },
  },
  {
    name: 'cta_section',
    display_name: 'CTA Section',
    is_root: false,
    is_nestable: true,
    schema: {
      headline: { type: 'text', default_value: 'STILL HAVE QUESTIONS?', pos: 0 },
      highlight_text: { type: 'text', default_value: "LET'S TALK.", pos: 1 },
      description: { type: 'textarea', pos: 2 },
      button_text: { type: 'text', default_value: 'BOOK A CALL', pos: 3 },
      button_url: { type: 'text', default_value: 'https://zcal.co/cryptocrowdtr/firstmeeting', pos: 4 },
    },
  },

  // ── Page (root content type) ──
  {
    name: 'page',
    display_name: 'Page',
    is_root: true,
    is_nestable: false,
    schema: {
      body: {
        type: 'bloks',
        pos: 0,
        restrict_type: '',
        restrict_components: true,
        component_whitelist: [
          'hero_section', 'partners_section', 'case_studies_section',
          'services_section', 'team_section', 'blog_section',
          'faq_section', 'cta_section',
        ],
      },
      global_settings: { type: 'section', pos: 1, keys: ['nav_cta_url', 'nav_cta_text', 'footer_description', 'twitter_url', 'linkedin_url'] },
    },
  },
];

// ──────────────────────────────────────────────────
// PHASE 2: Home Story Content (pre-populated)
// ──────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).substring(2, 15);
}

const HOME_CONTENT = {
  component: 'page',
  body: [
    // ── Hero ──
    {
      _uid: uid(),
      component: 'hero_section',
      tagline: 'Web3 Growth Infrastructure',
      headline_line1: 'Scale Your',
      headline_line2: 'Web3 Vision.',
      description: 'We execute high-impact KOL campaigns, build resilient global communities, and drive explosive growth for top-tier Web3 projects.',
      description_suffix: 'No fluff — Just scalable results.',
      cta_primary_text: 'BOOK A CALL',
      cta_primary_url: 'https://zcal.co/cryptocrowdtr/firstmeeting',
      cta_secondary_text: 'CASE STUDIES',
      cta_secondary_anchor: '#case-studies',
      watermark_text: '10M+',
    },

    // ── Partners ──
    {
      _uid: uid(),
      component: 'partners_section',
      label: 'Trusted by leading Web3 teams',
      partners: [
        { _uid: uid(), component: 'partner_item', name: 'DOP' },
        { _uid: uid(), component: 'partner_item', name: 'GEMS' },
        { _uid: uid(), component: 'partner_item', name: 'VENOM' },
        { _uid: uid(), component: 'partner_item', name: 'OASYS' },
      ],
    },

    // ── Case Studies ──
    {
      _uid: uid(),
      component: 'case_studies_section',
      badge_text: '10M+ VIEWS',
      studies: [
        {
          _uid: uid(), component: 'case_study_item',
          client: 'Web3 Privacy', title: 'Data Ownership Protocol',
          description: 'Successfully scaled community engagement and boosted local adoption in just 3 months.',
          tags: 'KOL Campaigns, Community Operations, Giveaway & AMA Events, Content Production',
          color: '#343cbb',
          metrics: [
            { _uid: uid(), component: 'metric_item', value: '45K+', label: 'Local Testnet Users' },
            { _uid: uid(), component: 'metric_item', value: '4M+', label: 'Content Views' },
            { _uid: uid(), component: 'metric_item', value: '12K+', label: 'Local Followers' },
          ],
        },
        {
          _uid: uid(), component: 'case_study_item',
          client: 'Modular Blockchain Infrastructure', title: 'Caldera',
          description: 'Increased visibility and positioned Caldera within the Turkish Web3 ecosystem.',
          tags: 'Local Social Media Management, Global & Local Community Moderation, Awareness Campaigns',
          color: '#343cbb',
          metrics: [
            { _uid: uid(), component: 'metric_item', value: '2.5M+', label: 'Content Views' },
            { _uid: uid(), component: 'metric_item', value: '4.8K+', label: 'Local Followers' },
          ],
        },
        {
          _uid: uid(), component: 'case_study_item',
          client: 'DeFi', title: 'Tea-Fi',
          description: 'Boosted engagement and increased active platform participation.',
          tags: 'X (Twitter) Management, Telegram & Discord Moderation, Community Growth',
          color: '#343cbb',
          metrics: [
            { _uid: uid(), component: 'metric_item', value: '2M+', label: 'Content Views' },
            { _uid: uid(), component: 'metric_item', value: '3.6K+', label: 'Local Followers' },
          ],
        },
        {
          _uid: uid(), component: 'case_study_item',
          client: 'Launchpad', title: 'Gems',
          description: 'Strengthened global presence and scaled community participation.',
          tags: 'Global Community Management, Growth Strategy, Campaign Execution',
          color: '#343cbb',
          metrics: [
            { _uid: uid(), component: 'metric_item', value: '28K', label: 'Telegram Members' },
            { _uid: uid(), component: 'metric_item', value: '20K', label: 'Galxe Participants' },
            { _uid: uid(), component: 'metric_item', value: '37K', label: 'Twitter Followers' },
          ],
        },
      ],
    },

    // ── Services ──
    {
      _uid: uid(),
      component: 'services_section',
      subtitle: 'Everything You Need for Web3 Growth',
      services: [
        { _uid: uid(), component: 'service_item', title: 'KOL & Influencer Marketing', features: 'Access to 500+ global & local influencers\nCampaign strategy & execution\nPerformance tracking', result: '10M+ campaign views' },
        { _uid: uid(), component: 'service_item', title: 'Community Management', features: 'Telegram, Discord moderation\n24/7 active support\nEngagement & growth tactics', result: '70K+ users managed' },
        { _uid: uid(), component: 'service_item', title: 'Social Media Growth', features: 'X (Twitter) management\nContent planning & posting\nViral growth strategies', result: '+36K followers growth' },
        { _uid: uid(), component: 'service_item', title: 'Content Creation', features: 'Visuals, videos, threads\nVoice-over & localization\nWeb3-native storytelling', result: 'Millions of impressions' },
        { _uid: uid(), component: 'service_item', title: 'Growth Campaigns', features: 'Airdrops, Galxe, quests\nGiveaway & AMA planning\nUser acquisition funnels', result: 'High participation rates' },
        { _uid: uid(), component: 'service_item', title: 'Strategy & Consulting', features: 'Go-to-market strategy\nLocalization\nGrowth roadmap', result: 'Proven scaling frameworks' },
      ],
    },

    // ── Team ──
    {
      _uid: uid(),
      component: 'team_section',
      subtitle: 'Meet the Architects',
      members: [
        { _uid: uid(), component: 'team_member', name: 'XXX', role: 'FOUNDER & CEO', linkedin_url: '#' },
        { _uid: uid(), component: 'team_member', name: 'XXX', role: 'CO-FOUNDER & COO', linkedin_url: '#' },
        { _uid: uid(), component: 'team_member', name: 'XXX', role: 'CFO', linkedin_url: '#' },
        { _uid: uid(), component: 'team_member', name: 'XXX', role: 'CMO', linkedin_url: '#' },
      ],
    },

    // ── Blog ──
    {
      _uid: uid(),
      component: 'blog_section',
      sidebar_title: 'BLOG',
      sidebar_description: 'Deep dives, tactical strategies, and growth marketing guides.',
      posts: [
        { _uid: uid(), component: 'blog_post', tag: 'Featured', title: 'How We Scaled a Layer 2 to 10M+ Views', tagline: 'KOL networking · Aggressive growth tactics · Community moat', is_featured: true },
        { _uid: uid(), component: 'blog_post', tag: 'Market Analysis', title: 'Narrative Rotation Cycles', tagline: 'Liquidity trends · Next major cycle shifts', is_featured: false },
        { _uid: uid(), component: 'blog_post', tag: 'Operations', title: 'Beyond Discord', tagline: 'Autonomous growth networks · Scalable ops', is_featured: false },
      ],
    },

    // ── FAQ ──
    {
      _uid: uid(),
      component: 'faq_section',
      subtitle: 'Intelligence',
      items: [
        { _uid: uid(), component: 'faq_item', question: 'Do you offer ongoing support?', answer: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Absolutely, our commitment extends beyond the initial strategy implementation. We offer continuous support, including regular reporting and analysis to ensure our clients not only meet but surpass their objectives. As a proactive partner, we provide ongoing recommendations to fine-tune and optimize your digital marketing strategies.' }] }] } },
        { _uid: uid(), component: 'faq_item', question: 'What advantages would my business gain through a collaboration with your agency?', answer: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Navigating the digital marketing landscape can be challenging without a solid foundation. Our agency specializes in creating customized strategic plans and providing expert guidance. By choosing our services, your brand can overcome common challenges, ensuring a streamlined path to sustained, long-term growth in the dynamic digital arena.' }] }] } },
        { _uid: uid(), component: 'faq_item', question: "What's the expected timeframe to witness tangible results from our partnership?", answer: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'The timeline for results depends on the specific services and goals. Content marketing may necessitate several months for noticeable impact, while influencer marketing and paid advertising can yield immediate results. Throughout the process, transparent communication is maintained, with regular reporting and updates to manage expectations effectively.' }] }] } },
        { _uid: uid(), component: 'faq_item', question: 'What metrics or criteria do you use to gauge the success of your strategies?', answer: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Success, in our perspective, hinges on achieving our clients' goals. We rely on data-driven metrics such as website traffic, token/NFT sales and engagement rates to assess the efficacy of our strategies. Regular reporting and in-depth analysis empower our clients to make informed, data-driven decisions, fostering an environment where success is not just a goal but a tangible outcome." }] }] } },
      ],
    },

    // ── CTA ──
    {
      _uid: uid(),
      component: 'cta_section',
      headline: 'STILL HAVE QUESTIONS?',
      highlight_text: "LET'S TALK.",
      description: 'We know that no two projects are the same. Jump on a discovery call so we can truly understand your specific needs and outline a roadmap tailored just for you.',
      button_text: 'BOOK A CALL',
      button_url: 'https://zcal.co/cryptocrowdtr/firstmeeting',
    },
  ],
};

// ──────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────

async function main() {
  console.log('🚀 Storyblok Automated Setup');
  console.log(`   Space ID: ${SPACE_ID}\n`);

  // ── Step 1: Delete default components (teaser, grid, feature, page) ──
  console.log('🗑️  Cleaning up default components...');
  try {
    const existing = await api('GET', '/components');
    for (const comp of existing.components || []) {
      if (['teaser', 'grid', 'feature'].includes(comp.name)) {
        console.log(`   Deleting default: ${comp.name}`);
        await api('DELETE', `/components/${comp.id}`);
        await delay();
      }
      // Delete existing "page" — we'll recreate it with our schema
      if (comp.name === 'page') {
        console.log(`   Deleting default: ${comp.name}`);
        await api('DELETE', `/components/${comp.id}`);
        await delay();
      }
    }
  } catch (e) {
    console.log(`   ⚠️  Cleanup warning: ${e.message}`);
  }

  // ── Step 2: Create component schemas ──
  console.log('\n📦 Creating component schemas...');
  for (const comp of COMPONENTS) {
    try {
      console.log(`   ✨ ${comp.display_name} (${comp.name})`);
      await api('POST', '/components', { component: comp });
      await delay(500);
    } catch (e) {
      // Component might already exist
      if (e.message.includes('422')) {
        console.log(`   ⚠️  ${comp.name} already exists, updating...`);
        const existing = await api('GET', '/components');
        const found = existing.components.find(c => c.name === comp.name);
        if (found) {
          await api('PUT', `/components/${found.id}`, { component: comp });
          await delay(500);
        }
      } else {
        throw e;
      }
    }
  }

  // ── Step 3: Delete existing "home" story (if any) ──
  console.log('\n🏠 Setting up "home" story...');
  try {
    const stories = await api('GET', '/stories?with_slug=home');
    for (const s of stories.stories || []) {
      console.log(`   Deleting existing home story (id: ${s.id})`);
      await api('DELETE', `/stories/${s.id}`);
      await delay();
    }
  } catch (e) {
    console.log(`   ⚠️  ${e.message}`);
  }

  // ── Step 4: Create "home" story with content ──
  console.log('   Creating "home" story with pre-populated content...');
  try {
    const result = await api('POST', '/stories', {
      story: {
        name: 'Home',
        slug: 'home',
        content: HOME_CONTENT,
      },
      publish: 1,
    });
    console.log(`   ✅ Home story created (id: ${result.story.id})`);
  } catch (e) {
    console.error(`   ❌ Failed to create home story: ${e.message}`);
  }

  // ── Step 5: Set Visual Editor URL ──
  console.log('\n🔧 Setting Visual Editor URL...');
  try {
    await api('PUT', '', {
      space: {
        environments: [
          { name: 'Development', location: 'https://localhost:5173/' },
        ],
      },
    });
    console.log('   ✅ Visual Editor → https://localhost:5173/');
  } catch (e) {
    console.log(`   ⚠️  Could not set Visual Editor URL: ${e.message}`);
  }

  console.log('\n🎉 Setup complete! Restart your dev server to see CMS content.');
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
