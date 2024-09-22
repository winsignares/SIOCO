import { AboutSection, ContactSection, HeroSection, ServicesSection, Footer, Header } from '../components';

export const LandingPage = () => {
    return (
        <>
            <div className="flex flex-col min-h-[100dvh]">
                <Header />
                <HeroSection />
                <ServicesSection />
                <AboutSection />
                <ContactSection />
                <Footer />
            </div>
        </>
    )
}
