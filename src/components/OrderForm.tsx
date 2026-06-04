import { useState } from "react";
import { Send } from "lucide-react";
import { sendToWhatsApp } from "@/utils/whatsapp";

export function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    flavor: "Chocolate",
    size: "1kg",
    message: "",
    date: "",
    instructions: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `*NEW CUSTOM CAKE ORDER* 🎂
    
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Flavor:* ${formData.flavor}
*Size:* ${formData.size}
*Date needed:* ${formData.date}
*Message on cake:* ${formData.message || "None"}

*Special Instructions:* 
${formData.instructions || "None"}

Please confirm my order and let me know the total price!`;

    sendToWhatsApp(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="order" className="py-24 bg-primary/5 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card rounded-[2.5rem] shadow-warm p-8 md:p-12 border border-border">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground mb-4">Design Your Dream Cake</h2>
            <p className="text-muted-foreground">
              Fill out the details below and we'll craft the perfect cake for your special occasion.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Name *</label>
                <input 
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number *</label>
                <input 
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Flavor *</label>
                <select 
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                >
                  <option>Chocolate</option>
                  <option>Vanilla</option>
                  <option>Strawberry</option>
                  <option>Red Velvet</option>
                  <option>Butterscotch</option>
                  <option>Black Forest</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Size *</label>
                <select 
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                >
                  <option>500gm</option>
                  <option>1kg</option>
                  <option>1.5kg</option>
                  <option>2kg</option>
                  <option>3kg+</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Delivery Date *</label>
                <input 
                  required
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Message on Cake</label>
              <input 
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                placeholder="Happy Birthday Sarah!"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Special Instructions</label>
              <textarea 
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none"
                placeholder="Any specific design references or dietary requirements?"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-[#A0522D] text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Send Order via WhatsApp
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
