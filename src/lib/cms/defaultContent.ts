export const defaultCmsContent: Record<string, string> = {
  // --- HEADER & NAVIGATION ---
  'site.header.logo': '/images/logo-1.png',
  'site.header.brandName': 'JADMAA VARMAKALAI',
  
  'site.header.nav.home.label': 'Home',
  'site.header.nav.home.visible': 'true',
  
  'site.header.nav.courses.label': 'Courses',
  'site.header.nav.courses.visible': 'true',
  
  'site.header.nav.about.label': 'About',
  'site.header.nav.about.visible': 'true',
  
  'site.header.nav.contact.label': 'Contact',
  'site.header.nav.contact.visible': 'true',
  
  'site.header.cta.label': 'Student LMS',
  'site.header.cta.enabled': 'true',
  'site.header.cta.link': '/dashboard',

  // --- FOOTER ---
  'site.footer.description': 'JADMAA is the premier academy for authentic Varmakalai and traditional Tamil martial arts. We preserve, research, and teach this ancient Siddha science of vital pressure points for defense and holistic healing.',
  'site.footer.phone': '+91 93452 20020',
  'site.footer.email': 'info@jadmaa.com',
  'site.footer.copyright': 'JADMAA Varmakalai Academy. All rights reserved.',
  
  'site.footer.social.instagram': 'https://www.instagram.com/jadmaavarmakalai/',
  'site.footer.social.facebook': 'https://www.facebook.com/profile.php?id=61591816677608',
  'site.footer.social.youtube': 'https://www.youtube.com/@JADMAAVarmakalai',

  // --- HOME PAGE ---
  'home.hero.eyebrow': 'MASTER THE ANCIENT TAMIL MARTIAL SCIENCE',
  'home.hero.title': 'Awaken Your Inner Warrior with Varmakalai',
  'home.hero.subtitle': 'Learn the authentic Siddha science of vital pressure points. Train under Master Prasanna and master techniques for ultimate self-defense, healing, and spiritual discipline.',
  'home.hero.primaryButton.label': 'Explore Courses',
  'home.hero.primaryButton.link': '/courses',
  'home.hero.secondaryButton.label': 'Watch Intro',
  'home.hero.secondaryButton.link': '#',
  'home.hero.image': '/images/hero-kick-action-transparent.png',
  
  // Home: About Teaser
  'home.about.enabled': 'true',
  'home.about.eyebrow': 'OUR LEGACY',
  'home.about.title': 'Preserving the Siddha Tradition',
  'home.about.description': 'JADMAA Varmakalai Academy is dedicated to resurrecting the purest forms of traditional Tamil martial arts. Passed down through generations of masters, our curriculum bridges ancient wisdom with modern training methodologies.',
  'home.about.image': 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80',
  'home.about.button.label': 'Read Our Full Story',
  'home.about.button.link': '/about',

  // Home: Why Choose Us
  'home.whyChoose.enabled': 'true',
  'home.whyChoose.eyebrow': 'WHY JADMAA',
  'home.whyChoose.title': 'Authentic Training, Real Results',
  'home.whyChoose.description': 'Experience traditional martial arts taught the way it was meant to be—with discipline, focus, and respect for the lineage.',
  'home.whyChoose.image': 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?auto=format&fit=crop&q=80',

  // Home: Courses Section
  'home.courses.enabled': 'true',
  'home.courses.title': 'Featured Programs',
  'home.courses.description': 'From foundational techniques to advanced combat applications, choose the path that suits your journey.',
  'home.courses.cta': 'View All Courses',
  
  // Home: Branches Section
  'home.branches.enabled': 'true',
  'home.branches.title': 'Our Branches',
  'home.branches.description': 'Find a JADMAA training center near you.',

  // --- COURSES PAGE ---
  'courses.hero.eyebrow': 'Academy Curriculum',
  'courses.hero.title': 'Explore All Courses',
  'courses.hero.description': 'Choose from authentic Varmakalai pressure point training, self-defence programs, children\'s fitness, and Siddha energy healing therapies.',
  'courses.empty.title': 'No courses match your criteria',
  'courses.empty.description': 'Try adjusting your category tabs or search query.',
  
  // --- ABOUT PAGE ---
  'about.hero.eyebrow': 'OUR STORY',
  'about.hero.title': 'The Legacy of Jadmaa',
  'about.hero.description': 'Preserving and propagating the ancient Siddha science of Varmakalai for the modern world.',
  'about.hero.image': 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80',
  
  'about.mission.title': 'Our Mission',
  'about.mission.description': 'To systematically teach, research, and globally promote Varmakalai—ensuring this ancient science empowers individuals with unparalleled self-defense capabilities and holistic health benefits.',
  
  'about.vision.title': 'Our Vision',
  'about.vision.description': 'To establish JADMAA as the definitive global authority and premier institution for authentic Tamil traditional martial arts and Siddha healing practices.',

  // --- CONTACT PAGE ---
  'contact.hero.eyebrow': 'GET IN TOUCH',
  'contact.hero.title': 'Start Your Journey',
  'contact.hero.description': 'Have questions about our programs or want to enroll in offline classes? We are here to help.',
  
  'contact.info.address': '48, Carmel Nagar, Kaattuthottam, Thanjavur (HQ)',
  'contact.info.hours': 'Mon-Sat: 6:00 AM - 8:00 PM\nSunday: Special Classes Only',
};

/**
 * Helper to get a typed setting with a fallback to the default content.
 */
export const getSettingValue = (settings: Record<string, string>, key: string): string => {
  if (settings && settings[key] !== undefined) {
    return settings[key];
  }
  return defaultCmsContent[key] || '';
};

export const getBooleanSetting = (settings: Record<string, string>, key: string): boolean => {
  const val = getSettingValue(settings, key);
  return val === 'true';
};
