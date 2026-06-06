import { motion } from "framer-motion";
import { Heart, Star, Users, Award, Leaf, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="w-full bg-background pt-24 pb-16">

      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-medium tracking-widest uppercase text-sm mb-4"
        >
          Who We Are
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6"
        >
          Our Story
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 }}
          className="w-20 h-1 bg-primary mx-auto rounded-full"
        />
      </section>

      {/* Story Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-snug">
              Baking with passion,<br />serving with love.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              Dough & Pan began with a simple idea: the best things are made with care. From our bakery in the heart of Meerut, we lovingly craft fresh breads, pastries, and celebration cakes that turn everyday moments into something special. Every loaf, every layer, and every bite is baked to bring a little warmth, comfort, and joy to your table.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed font-light">
              From our sourdough loaves fresh from the oven to beautifully crafted celebration cakes, every creation is just made by hand. We take our time with every bake, quality ingredients, meticulous recipes, and plenty of care and professionalism because for your best moments are just a.
            </p>
            <p className="text-lg text-primary italic font-medium leading-relaxed">
              "Whether you're celebrating a achievement or simply it’s your cheat day at diet. Dough & Pan is here to make it sweeter."
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "50+", label: "Menu Items" },
                { value: "3+", label: "Years Baking" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-serif text-4xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-foreground/60 font-medium uppercase tracking-wide mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="/images/about.png"
                alt="Dough & Pan Bakery Interior"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555507036-ab1d4075cff3?w=900&q=80";
                }}
              />
            </div>
            {/* Decorative tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-6 z-20 bg-primary text-primary-foreground p-5 rounded-2xl shadow-2xl"
            >
              <div className="font-serif text-3xl font-bold">3+</div>
              <div className="text-xs uppercase tracking-widest opacity-80 mt-0.5">Years of Baking</div>
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/20 rounded-full -z-10 blur-3xl" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full -z-10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-card py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">What Drives Us</h2>
            <p className="text-foreground/60 font-light max-w-xl mx-auto">Every loaf, every tart, every cake — made with these values at heart.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Our Mission",
                desc: "Our mission is to bring warmth and connection to every table through our baked goods made with care & quality ingredients."
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Our Vision",
                desc: "To be the best name for Cakes in Meerut and Beyond & A prosperous environment for our bakers and team."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Our Community",
                desc: "To provide freshly baked delights, that stays with our consumers."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-10 rounded-2xl text-center shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ─────────────────────────────────────────── */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">The Visionary</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Meet Our Founder</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Founder Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-3xl border-2 border-primary/20 -rotate-3" />
                <div className="absolute -inset-4 rounded-3xl border border-accent/30 rotate-2" />

                <div className="relative w-80 h-[440px] rounded-3xl overflow-hidden shadow-2xl z-10">
                  <img
                    src={`${import.meta.env.BASE_URL}images/founder.png`}
                    alt="Founder of Dough & Pan"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle gradient at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-foreground/30 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-5 -right-5 z-20 bg-primary text-primary-foreground px-5 py-3 rounded-2xl shadow-xl"
                >
                  <div className="font-serif text-lg font-bold leading-tight text-center">Shweta</div>
                  <div className="text-[11px] uppercase tracking-widest opacity-80 text-center">Founder@Dough & Pan</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Founder Bio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-7"
            >
              <div>
                <h3 className="font-serif text-4xl font-bold text-foreground mb-1">The Baker Behind the Brand</h3>
                <div className="w-14 h-1 bg-accent rounded-full mt-3" />
              </div>

              <p className="text-lg text-foreground/80 leading-relaxed font-light">
                Dough & Pan began with a simple dream: to fill homes across Meerut with the comfort and joy of freshly baked treats. What started in a small kitchen, a visionary founder with countless hours spent perfecting recipes and experimenting with dough, has grown into a bakery that is proud to be a part of your birthdays, celebrations, and everyday moments shared by a family.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed font-light">
                With a deep love for artisan cakes and an eye for beauty, our founder Mrs. Shweta built Dough & Pan on the simple belief that every occasion deserves something extraordinary, and she can bring forth this vision with her expertise and love that she have for baking. 
              </p>

              <blockquote className="border-l-4 border-primary pl-6 italic text-foreground/70 text-xl font-light leading-relaxed">
                "A good cake is a responsibility and we take it with seriousness. That's the Dough & Pan promise."
              </blockquote>

              {/* Achievements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { icon: <Award className="w-5 h-5" />, label: "Premium Quality" },
                  { icon: <Leaf className="w-5 h-5" />,  label: "Fresh Ingredients" },
                  { icon: <Sparkles className="w-5 h-5" />, label: "Custom Creations" },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-secondary/60 px-4 py-3 rounded-xl"
                  >
                    <div className="text-primary">{badge.icon}</div>
                    <span className="text-sm font-medium text-foreground">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team note */}
      <section className="py-16 bg-card text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-5">The Bakers Behind The Magic</h2>
          <p className="text-lg text-foreground/60 font-light italic">
            "Behind every croissant or decadent cake is an early morning, flour dusted hands, and a baker who genuinely cares."
          </p>
        </div>
      </section>
    </div>
  );
}
