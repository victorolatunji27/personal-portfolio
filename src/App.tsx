import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import Hero from './sections/Hero';
import Profile from './sections/Profile';
import PublicProfiles from './sections/PublicProfiles';
import TechStack from './sections/TechStack';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Leadership from './sections/Leadership';
import Skills from './sections/Skills';
import Interests from './sections/Interests';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-textp">
      <CustomCursor />
      <ProgressBar />
      <Navbar />

      <main className="lg:pl-56">
        <Hero />
        <Profile />
        <PublicProfiles />
        <TechStack />
        <Experience />
        <Education />
        <Projects />
        <Leadership />
        <Skills />
        <Interests />
      </main>

      <Footer />
    </div>
  );
}
