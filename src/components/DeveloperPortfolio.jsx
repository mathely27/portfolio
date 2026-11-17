import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Braces, Check, Code2, Copy, Cpu, ExternalLink, Fingerprint, Mail, Monitor, X } from 'lucide-react';
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from './Icons';
import ContributionGraphs from './ContributionGraphs';
import { projects } from '../data/projects';
import ReadmeTechStack from './ReadmeTechStack';
import '../developer.css';

function Starburst({ className = '' }) {
  return <svg className={className} viewBox="0 0 140 140" aria-hidden="true"><path fill="currentColor" d="m70 0 10 40 30-29-13 40 42-6-33 26 34 23-42-3 16 39-32-27-8 37-12-37-30 27 13-40-42 4 34-25L0 45l42 6-13-40 31 29z"/></svg>;
}

function Spiral() {
  return <svg viewBox="0 0 50 50" className="inline-doodle" fill="none" aria-hidden="true"><path d="M28 20c-13-4-13 15-1 12 17-4 11-23-1-24C4 6-1 40 24 43 48 47 54 11 34 3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/></svg>;
}

function HeroPortrait() {
  return <div className="hero-art portrait-art" aria-label="Illustrated developer portrait">
    <div className="hero-window portrait-window">
      <div className="window-controls" aria-hidden="true"><span className="window-dots"><i/><i/><i/></span><span className="window-buttons"><i>−</i><i>□</i><i>×</i></span></div>
      <div className="portrait-stage"><svg className="purple-scribble" viewBox="0 0 440 350" fill="none" aria-hidden="true"><path d="m38 260 90-175-35 210L224 65l-59 233L322 90l-79 207L403 119" stroke="currentColor" strokeWidth="27" strokeLinecap="round" strokeLinejoin="round"/></svg><img className="developer-portrait" src="/assets/developer-girl-portrait.png" alt="Sample animated-style illustration of a woman software developer" width="1159" height="1358" fetchPriority="high"/></div>
    </div>
    <span className="hero-label label-swift">SW/</span><span className="hero-label label-ai">/AI</span><Starburst className="hero-star"/>
  </div>;
}

function ProjectBrowser({ project, index, onOpen }) {
  return <article className="project-item">
    <button className="project-browser" onClick={() => onOpen(project)} aria-label={`Explore ${project.title}`}>
      <svg className="folder-outline" viewBox="0 0 600 465" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M54 2H182C211 2 223 17 237 39L253 61C265 78 280 82 309 82H548C576 82 598 104 598 132V411C598 439 576 463 548 463H54C24 463 2 439 2 411V54C2 25 25 2 54 2Z" stroke="currentColor" strokeWidth="1.4" vectorEffect="non-scaling-stroke"/></svg>
      <span className="folder-dots" aria-hidden="true"><i/><i/><i/></span><span className="folder-index">0{index+1}</span><div className="project-image"><img src={project.image} alt={`${project.title} application preview`} loading="lazy" width="1200" height="750"/><span className="project-name-tag">{project.title}</span><span className="project-view"><ArrowUpRight size={30} strokeWidth={1.6}/></span></div>
    </button><div className="project-meta"><span>{project.tags.slice(0,2).join(' / ')}{project.fork ? ' · Fork exploration' : ''}</span><div><a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}><GithubIcon size={16}/></a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live project`}><ExternalLink size={15}/></a>}</div></div>
  </article>;
}

function ProjectModal({ project, dialogRef, onClose }) {
  return <dialog className="dev-dialog" ref={dialogRef} onClose={onClose} aria-labelledby={project ? 'dev-project-title' : undefined} aria-label={project ? undefined : 'Project details'} onClick={event=>{if(event.target===event.currentTarget)dialogRef.current.close();}}>{project && <><div className="dialog-header"><span>PROJECT / {project.category.toUpperCase()}{project.fork ? ' / FORK EXPLORATION':''}</span><button className="circle-button" onClick={()=>dialogRef.current.close()} aria-label="Close project"><X size={21}/></button></div><img src={project.image} alt={`${project.title} interface`}/><div className="dialog-content"><h2 id="dev-project-title">{project.title}<span>↗</span></h2><p>{project.detail}</p><div className="dev-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><h3>Inside the build</h3><ul>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul><div className="dialog-actions"><a className="lime-button" href={project.source} target="_blank" rel="noreferrer"><GithubIcon size={16}/>View source<ArrowUpRight size={15}/></a>{project.demo && <a className="simple-link" href={project.demo} target="_blank" rel="noreferrer">Visit project<ArrowUpRight size={15}/></a>}</div></div></>}</dialog>;
}

export default function DeveloperPortfolio() {
  const [selected,setSelected]=useState(null);
  const [copied,setCopied]=useState(false);
  const [copyError,setCopyError]=useState(false);
  const dialogRef=useRef(null);
  const scrollRef=useRef(null);
  const copyTimer=useRef(null);

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme','dark');
    document.documentElement.style.colorScheme='dark';
    const target=document.getElementById(window.location.hash.slice(1));
    if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    return()=>clearTimeout(copyTimer.current);
  },[]);

  const navigate=(id,event)=>{
    event?.preventDefault();
    const behavior=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
    if(id==='home')scrollRef.current?.scrollTo({top:0,behavior});
    else document.getElementById(id)?.scrollIntoView({behavior,block:'start'});
    history.replaceState(null,'',`#${id}`);
  };
  const openProject=project=>{setSelected(project);dialogRef.current.showModal();};
  const copyEmail=async()=>{
    try{await navigator.clipboard.writeText('mathely27@gmail.com');setCopied(true);setCopyError(false);clearTimeout(copyTimer.current);copyTimer.current=setTimeout(()=>setCopied(false),2400);}
    catch{setCopyError(true);}
  };
  return <div className="developer-site" ref={scrollRef}>
    <a className="dev-skip" href="#about" onClick={event=>navigate('about',event)}>Skip to content</a>
    <header className="dev-header"><a href="#home" className="dev-logo" onClick={event=>navigate('home',event)}>Mathely<span>©</span></a><a href="#contact" className="lime-button" onClick={event=>navigate('contact',event)}>Get in touch<ArrowUpRight size={15}/></a></header>
    <main>
      <section className="dev-hero page-width" id="home" aria-labelledby="hero-heading"><div className="hero-copy"><h1 id="hero-heading">Hi, I'm Mathely :),<br/><span className="role-line">Software <span>Developer</span></span></h1><div className="social-circles"><a href="https://github.com/mathely27" target="_blank" rel="noreferrer" aria-label="GitHub — mathely27"><GithubIcon size={19}/></a><a href="https://leetcode.com/u/mathely_27/" target="_blank" rel="noreferrer" aria-label="LeetCode — mathely_27"><LeetcodeIcon size={19}/></a><a href="https://www.linkedin.com/in/mathely-mittal-b284143b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={18}/></a><a href="mailto:mathely27@gmail.com" aria-label="Email Mathely"><Mail size={18}/></a></div></div><HeroPortrait/></section>

      <section className="dev-about page-width section-space" id="about" aria-labelledby="about-heading"><div className="section-eyebrow"><span className="eyebrow-symbol">◎</span>About me</div><div className="about-content"><h2 id="about-heading">I'm a software developer <span className="coral-text"><Spiral/></span> who learns by building. From <span className="yellow-text">↝</span> native Mac utilities to private AI and web apps, I like making things that <span className="lime-text">actually work ✧.</span></h2><div className="about-facts"><div><strong><span>+</span>{String(projects.length).padStart(2,'0')}</strong><p>Selected projects</p></div><div><strong>03<span className="lime-text">/</span></strong><p>Areas to explore</p></div><div><strong><span className="coral-text">⌘</span>CS</strong><p>Chitkara University</p></div></div><a href="https://www.linkedin.com/in/mathely-mittal-b284143b9/" target="_blank" rel="noreferrer" className="lime-button">More about me<ArrowUpRight size={15}/></a></div></section>

      <section className="dev-work page-width section-space" id="work" aria-labelledby="work-heading"><aside className="work-sidebar"><h2 className="large-heading" id="work-heading">Selected<br/><span>Projects</span></h2></aside><div className="project-feed" aria-live="polite">{projects.map(project=><ProjectBrowser project={project} key={project.id} index={projects.indexOf(project)} onOpen={openProject}/>)}<a className="lime-button all-work-button" href="https://github.com/mathely27?tab=repositories" target="_blank" rel="noreferrer">All works<ArrowUpRight size={16}/></a></div></section>

      <section className="dev-activity page-width section-space" id="coding" aria-labelledby="coding-heading"><div className="activity-heading"><div><p className="section-eyebrow"><span className="eyebrow-symbol">⌁</span>Behind the builds</p><h2 className="large-heading" id="coding-heading">Code. Solve.<br/><span>Repeat.</span></h2></div></div><ContributionGraphs theme="dark"/></section>

      <section className="dev-services page-width section-space" aria-labelledby="services-heading"><h2 className="large-heading" id="services-heading">What I <span>build</span></h2><div className="service-cards">{[{title:'Native apps',description:'Mac utilities that feel at home on the Mac. SwiftUI interfaces, native authentication, and the small details that matter.',tags:'Swift / SwiftUI',icon:Fingerprint,color:'lime',target:'applocker'},{title:'Web apps',description:'Interactive platforms and useful browser tools. From the first component to a working app you can actually open.',tags:'React / JavaScript',icon:Monitor,color:'coral',target:'clutch'},{title:'Local AI',description:'Personal AI, a little closer to home. Exploring desktop assistants and language models that run on my own machine.',tags:'Python / Ollama',icon:Cpu,color:'yellow',target:'berry'},{title:'Dev tools',description:'Small tools for other builders. Making developer profiles, project READMEs, and everyday workflows a little better.',tags:'SVG / CSS / Git',icon:Braces,color:'purple',target:'gitstatcard'}].map(({title,description,tags,icon:Icon,color,target})=><button className={`service-card service-${color}`} key={title} onClick={()=>openProject(projects.find(p=>p.id===target))} aria-label={`Explore ${title}`}><div><Icon size={40} strokeWidth={1.35}/><h3>{title}</h3><p>{description}</p><span>{tags}<ArrowUpRight size={17}/></span></div></button>)}</div></section>

      <section className="dev-toolkit page-width section-space" id="toolkit" aria-labelledby="toolkit-heading"><div className="toolkit-heading"><p className="section-eyebrow"><Code2 size={20}/>The toolkit</p><h2 id="toolkit-heading">Different ideas.<br/><span>Different tools.</span></h2></div><ReadmeTechStack/></section>

      <section className="dev-contact page-width" id="contact" aria-labelledby="contact-heading"><p className="contact-eyebrow"><span>◎</span>Have an idea or an opportunity?</p><h2 id="contact-heading">Let's <span>Build</span><br/>Together<span className="contact-period">.</span></h2><div className="contact-code-badge" aria-hidden="true">&lt;/&gt;</div><a className="lime-button" href="mailto:mathely27@gmail.com">Get in touch<ArrowUpRight size={16}/></a><div className="contact-email-row"><a href="mailto:mathely27@gmail.com">mathely27@gmail.com</a><button className="circle-button" onClick={copyEmail} aria-label="Copy email address">{copied?<Check size={17}/>:<Copy size={17}/>}</button><span role="status">{copied?'Copied!':copyError?'Please copy the address manually.':''}</span></div></section>
    </main>

    <ProjectModal project={selected} dialogRef={dialogRef} onClose={()=>setSelected(null)}/>
  </div>;
}
