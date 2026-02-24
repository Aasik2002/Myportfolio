import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MainLayout } from './components/layout/MainLayout';
import { Hero } from './components/pages/Hero';
import { About } from './components/pages/About';
import { Skills } from './components/pages/Skills';
import { Projects } from './components/pages/Projects';
import { Contact } from './components/pages/Contact';
import { pageVariants, pageTransition } from './utils/animations';
import type { PageName } from './types';

function App() {
  const [activePage, setActivePage] = useState<PageName>('hero');

  const handleNavigate = (page: PageName) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'hero':
        return <Hero key="hero" onNavigate={handleNavigate} />;
      case 'about':
        return <About key="about" onNavigate={handleNavigate} />;
      case 'skills':
        return <Skills key="skills" onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects key="projects" onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact key="contact" onNavigate={handleNavigate} />;
      // other pages will be cases here
      default:
        return <Hero key="hero" onNavigate={handleNavigate} />;
    }
  };

  return (
    <MainLayout activePage={activePage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full absolute inset-0 backface-hidden"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
