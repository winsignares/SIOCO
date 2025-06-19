
import { AboutSection, ContactSection, HeroSection, ServicesSection, Footer, Header } from '../Components';

export const  PageLanding = () => {
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
