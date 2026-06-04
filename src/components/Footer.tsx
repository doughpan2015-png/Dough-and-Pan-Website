import { Link } from "wouter";
import { Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="flex flex-col items-center md:items-start">
            <img 
              src={`${import.meta.env.BASE_URL}images/doughandpan-logo.jpg`} 
              alt="Dough & Pan" 
              className="h-20 w-20 rounded-full bg-white object-cover p-1 mb-4"
            />
            <h3 className="font-serif text-2xl font-semibold text-primary-foreground">Dough & Pan</h3>
            <p className="mt-2 text-center text-sm text-primary-foreground/80 md:text-left">
              Artisan Bakery & Pâtisserie
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl font-medium text-primary-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-center md:text-left">
              <Link href="/"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">Home</span></Link>
              <Link href="/about"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">About Us</span></Link>
              <Link href="/menu"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">Menu</span></Link>
              <Link href="/gallery"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">Gallery</span></Link>
              <Link href="/contact"><span className="text-primary-foreground/80 hover:text-accent transition-colors cursor-pointer">Contact</span></Link>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl font-medium text-primary-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 text-accent" /> +91 95609 85539
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-accent" /> doughandpan@gmail.com
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Clock className="h-4 w-4 text-accent" /> Mon–Sun 8AM–9PM
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start text-center md:text-left">
                <MapPin className="h-4 w-4 text-accent shrink-0" /> 4 Nehru Road, Quivera Hotel, Meerut, UP
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-xl font-medium text-primary-foreground mb-4">Follow Us</h4>
            <a 
              href="https://www.instagram.com/doughandpan_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary-foreground transition-all hover:bg-accent hover:text-foreground"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Dough & Pan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}