import React from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiNodedotjs, 
  SiExpress, 
  SiSpringboot, 
  SiMongodb, 
  SiPostgresql, 
  SiMysql, 
  SiRedis, 
  SiGit, 
  SiGithub, 
  SiDocker, 
  SiLinux, 
  SiPostman 
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { Network, HelpCircle } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = '', size = 18 }) => {
  const normName = name.toLowerCase().trim();

  // Return icons with official brand colors to make the stack vibrant and premium
  switch (normName) {
    case 'react':
      return <SiReact className={className} style={{ fontSize: size, color: '#61DAFB' }} />;
    case 'next.js':
      // Next.js color is black in light theme, white in dark theme. We let it inherit the parent text color.
      return <SiNextdotjs className={className} style={{ fontSize: size }} />;
    case 'typescript':
      return <SiTypescript className={className} style={{ fontSize: size, color: '#3178C6' }} />;
    case 'tailwind css':
      return <SiTailwindcss className={className} style={{ fontSize: size, color: '#38BDF8' }} />;
    case 'javascript':
      return <SiJavascript className={className} style={{ fontSize: size, color: '#F7DF1E' }} />;
    case 'html5':
      return <SiHtml5 className={className} style={{ fontSize: size, color: '#E34F26' }} />;
    case 'css3':
      return <SiCss className={className} style={{ fontSize: size, color: '#1572B6' }} />;
    case 'node.js':
      return <SiNodedotjs className={className} style={{ fontSize: size, color: '#339933' }} />;
    case 'express.js':
      // Express color is black/white, let it inherit
      return <SiExpress className={className} style={{ fontSize: size }} />;
    case 'spring boot':
      return <SiSpringboot className={className} style={{ fontSize: size, color: '#6DB33F' }} />;
    case 'java':
      return <FaJava className={className} style={{ fontSize: size, color: '#EA2D2E' }} />;
    case 'rest apis':
      return <Network className={className} size={size} style={{ color: '#009688' }} />;
    case 'mongodb':
      return <SiMongodb className={className} style={{ fontSize: size, color: '#47A248' }} />;
    case 'postgresql':
      return <SiPostgresql className={className} style={{ fontSize: size, color: '#4169E1' }} />;
    case 'mysql':
      return <SiMysql className={className} style={{ fontSize: size, color: '#4479A1' }} />;
    case 'redis':
      return <SiRedis className={className} style={{ fontSize: size, color: '#DC382D' }} />;
    case 'git':
      return <SiGit className={className} style={{ fontSize: size, color: '#F05032' }} />;
    case 'github':
      // GitHub is neutral, let it inherit
      return <SiGithub className={className} style={{ fontSize: size }} />;
    case 'docker':
      return <SiDocker className={className} style={{ fontSize: size, color: '#2496ED' }} />;
    case 'linux':
      return <SiLinux className={className} style={{ fontSize: size, color: '#FCC624' }} />;
    case 'postman':
      return <SiPostman className={className} style={{ fontSize: size, color: '#FF6C37' }} />;
    case 'aws':
      return <FaAws className={className} style={{ fontSize: size, color: '#FF9900' }} />;
    case 'vs code':
      return <VscVscode className={className} style={{ fontSize: size, color: '#007ACC' }} />;
    default:
      return <HelpCircle className={className} size={size} />;
  }
};
