import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { Github, Linkedin, X } from '../components/SocialIcons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from '../components/ScrollReveal';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { email, location, socials } = portfolioData.personalInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/ronitsinha177@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _subject: `[Portfolio Contact] ${data.subject}`,
          message: data.message
        })
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#a855f7', '#06b6d4', '#10b981']
      });

      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      // Fallback: open mail client prefilled with ronitsinha177@gmail.com
      const mailtoUrl = `mailto:ronitsinha177@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${data.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )}`;
      window.open(mailtoUrl, '_blank');

      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#a855f7', '#06b6d4', '#10b981']
      });

      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Inquiries
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Get In Touch
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left panel contact specs */}
          <ScrollReveal animation="fade-left" duration={0.8} className="lg:col-span-5 space-y-8">
            <div className="p-5 rounded-lg glass-subtle space-y-2 text-stone-300 font-sans leading-relaxed">
              <h3 className="font-display font-bold text-lg text-lightHeading dark:text-darkHeading">
                Let's discuss a project
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Whether you're looking to hire me for a software internship, have an open-source collaboration idea, or need custom freelance services, my inbox is open!
              </p>
            </div>

            {/* Icons rows list */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg glass-light">
                <div className="p-2.5 rounded-lg glass-subtle text-lightAccent dark:text-darkAccent flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-semibold text-gray-400 uppercase tracking-wide block">
                    Direct Email
                  </span>
                  <a href={`mailto:${email}`} className="text-xs sm:text-sm font-mono text-lightHeading dark:text-darkHeading hover:underline">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg glass-light">
                <div className="p-2.5 rounded-lg glass-subtle text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-semibold text-gray-400 uppercase tracking-wide block">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm text-lightHeading dark:text-darkHeading font-medium">
                    {location} (Remote Support Available)
                  </span>
                </div>
              </div>
            </div>

            {/* Social rows */}
            <div className="space-y-3 pt-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Connect ElseWhere
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full glass-subtle-interactive text-stone-300 hover:text-white cursor-pointer"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full glass-subtle-interactive text-stone-300 hover:text-white cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socials.x}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full glass-subtle-interactive text-stone-300 hover:text-white cursor-pointer"
                  title="X"
                >
                  <X className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right panel contact form card (Primary Glass) */}
          <ScrollReveal animation="fade-right" duration={0.8} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-lg glass-primary relative overflow-hidden"
            >
              {/* Success Banner message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 glass-primary z-20 flex flex-col items-center justify-center text-center p-6 space-y-4"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
                    <div>
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-lightHeading dark:text-darkHeading">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-xs text-gray-400 font-sans mt-1">
                        Thank you for reaching out. I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-4 py-2 rounded-lg glass-subtle-interactive text-xs font-semibold uppercase tracking-wider text-stone-300 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form elements */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-400">Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                      className="w-full px-4 py-3.5 rounded-lg border border-white/10 bg-[rgba(15,18,24,0.35)] focus:border-darkAccent focus:bg-[rgba(15,18,24,0.5)] outline-none text-stone-100 placeholder:text-stone-500 font-medium transition-colors"
                    />
                    {errors.name && <span className="text-[10px] text-red-500">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-400">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email format' }
                      })}
                      className="w-full px-4 py-3.5 rounded-lg border border-white/10 bg-[rgba(15,18,24,0.35)] focus:border-darkAccent focus:bg-[rgba(15,18,24,0.5)] outline-none text-stone-100 placeholder:text-stone-500 font-medium transition-colors"
                    />
                    {errors.email && <span className="text-[10px] text-red-500">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-400">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    {...register('subject', { required: 'Subject is required', minLength: { value: 5, message: 'Minimum 5 characters' } })}
                    className="w-full px-4 py-3.5 rounded-lg border border-white/10 bg-[rgba(15,18,24,0.35)] focus:border-darkAccent focus:bg-[rgba(15,18,24,0.5)] outline-none text-stone-100 placeholder:text-stone-500 font-medium transition-colors"
                  />
                  {errors.subject && <span className="text-[10px] text-red-500">{errors.subject.message}</span>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-400">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your goals, timelines, or role details..."
                    {...register('message', { required: 'Message content is required', minLength: { value: 10, message: 'Minimum 10 characters' } })}
                    className="w-full px-4 py-3.5 rounded-lg border border-white/10 bg-[rgba(15,18,24,0.35)] focus:border-darkAccent focus:bg-[rgba(15,18,24,0.5)] outline-none text-stone-100 placeholder:text-stone-500 font-medium transition-colors resize-none"
                  />
                  {errors.message && <span className="text-[10px] text-red-500">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-lightAccent dark:bg-darkAccent text-white font-semibold cursor-pointer shadow-md shadow-black/20 hover:bg-lightAccent/90 dark:hover:bg-darkAccent/90 disabled:opacity-50 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
