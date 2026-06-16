import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

export const Blog: React.FC = () => {
  const { blogs } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [55, -55]);

  return (
    <section id="blog" ref={containerRef} className="py-24 px-6 relative bg-gray-50/50 dark:bg-gray-950/20 overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[-5%] top-1/4 w-36 h-36 rounded-full bg-lightAccent/5 dark:bg-purple-500/10 blur-2xl pointer-events-none select-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[-5%] bottom-1/4 w-44 h-44 rounded-full bg-lightAccent/5 dark:bg-cyan-500/10 blur-3xl pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Writing
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Featured Articles
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.map((post) => (
            <ScrollStaggerItem key={post.id} animation="fade-up">
              <article className="group flex flex-col justify-between h-full p-6 sm:p-8 rounded-3xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm hover:border-lightAccent/20 dark:hover:border-darkAccent/20 hover:shadow-md hover:translate-y-[-3px] transition-all duration-300">
                <div className="space-y-4">
                  {/* Category & Read Time Row */}
                  <div className="flex items-center justify-between">
                    <span className="bg-lightAccent/5 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold">
                      {post.category}
                    </span>
                    
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Article Header info */}
                  <div className="space-y-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-lightText dark:text-darkText group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Tag Badges & Action */}
                <div className="border-t border-gray-100 dark:border-gray-800/80 pt-5 mt-6 space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded text-[9px] font-mono font-medium"
                      >
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>

                  <a
                    href={post.link}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-lightAccent dark:text-darkAccent group/link cursor-pointer"
                  >
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </article>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
};
