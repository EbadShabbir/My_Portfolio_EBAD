import { useEffect, useRef, useState } from 'react';

const links = {
  github: 'https://github.com/EbadShabbir',
  linkedin: 'https://www.linkedin.com/in/ebad-shabbir-b9b34a282/',
  scholar: 'https://scholar.google.com/citations?user=j-ew0UgAAAAJ',
  acl: 'https://aclanthology.org/people/ebad-shabbir/unverified/',
  ieee: 'https://ieeexplore.ieee.org/author/536772113896644',
  email: 'mailto:ebadshabbir22@gmail.com',
};

const projects = [
  ['EBAD: Multimodal AI Assistant', 'Text, speech, and image-based interaction through unified large-model inference.', 'Voice + vision + chat'],
  ['Hierarchical Speculative Decoding', 'Dual-LLM inference acceleration for Raspberry Pi-class edge hardware.', 'Edge LLM deployment'],
  ['HealthRoleBench', 'Role-aware benchmark for health misinformation and AI safety judgments.', 'Safety evaluation'],
  ['HOLA: Efficient LLM Deployment', 'Adaptive retrieval, speculative decoding, pruning, and quantization for low-resource LLMs.', '+17.6% GSM8K EMA'],
];

const research = [
  ['AVATAR', 'ICASSP 2026', 'Audio-visual adaptive fusion for multimodal deepfake detection, reaching 0.945 ROC AUC on LAV-DF.'],
  ['LLMs on a Budget? Say HOLA', 'EMNLP 2025 Industry', 'A unified pipeline for faster and more efficient LLM deployment.'],
  ['Truth, Trust, and Trouble', 'EMNLP 2025 Industry', 'Medical AI safety and accuracy evaluation on edge-oriented models.'],
  ['CLARITY', 'IEEE Transactions on AI', 'Lightweight multimodal transformer for harmful content detection.'],
  ['ConLLM for Multi-Modal Deepfakes', 'Findings of EACL 2026', 'Contrastive alignment plus transformer reasoning for deepfake detection.'],
  ['Demographic Pluralism in Safety', 'Findings of EACL 2026', 'A 43K benchmark across 14 safety domains for pluralistic LLM safety.'],
];

const photos = [
  ['/photos/image_1.jpg', 'Portrait mode', 'The person behind the papers.'],
  ['/photos/image_2.jpg', 'Daily signal', 'Research life, between builds and benchmarks.'],
  ['/photos/image_3.jpg', 'Off the clock', 'Football, motion, and a reset after the models.'],
];

const skills = ['LLM Optimization', 'AI Safety', 'Edge AI', 'RAG Systems', 'Multimodal Fusion', 'Deepfake Detection', 'PyTorch', 'Hugging Face', 'FastAPI', 'Docker'];

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      particles = Array.from({ length: Math.min(90, Math.floor(window.innerWidth / 15)) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * ratio,
        vy: (Math.random() - 0.5) * ratio,
        r: (Math.random() * 1.8 + 0.8) * ratio,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(110,255,240,.78)';
      ctx.strokeStyle = 'rgba(255,79,216,.18)';
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 135) {
            ctx.globalAlpha = 1 - d / 135;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}

function TypingText() {
  const phrases = ['edge-ready LLM systems.', 'multimodal safety research.', 'deepfake detection pipelines.', 'interactive AI products.'];
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [back, setBack] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    const timer = setTimeout(() => {
      if (!back && count === phrase.length) return setBack(true);
      if (back && count === 0) {
        setBack(false);
        setIndex((index + 1) % phrases.length);
        return;
      }
      setCount(count + (back ? -1 : 1));
    }, back ? 32 : count === phrase.length ? 900 : 58);
    return () => clearTimeout(timer);
  }, [back, count, index]);

  return <span className="typing">{phrases[index].slice(0, count)}<i /></span>;
}

export default function App() {
  return (
    <div className="app">
      <ParticleField />
      <header className="nav">
        <a className="brand" href="#top"><b>ES</b><span>Ebad Shabbir</span></a>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#research">Research</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="pill" href={links.email}>Email</a>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <p className="status"><span /> Visiting Student at MBZUAI / Machine Learning Researcher</p>
            <h1>Ebad Shabbir builds <TypingText /></h1>
            <p className="lead">Undergraduate researcher and engineer working on LLM optimization, AI safety, edge deployment, and multimodal intelligence.</p>
            <div className="actions">
              <a className="primary" href="#projects">View projects</a>
              <a className="secondary" href={links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
            </div>
          </div>
          <aside className="console">
            <div className="hero-photo">
              <img src="/photos/image_1.jpg" alt="Ebad Shabbir portrait" />
              <div><small>Current node</small><strong>MBZUAI Visiting Student</strong></div>
            </div>
            <p><b>current.role</b> = "Visiting Student at MBZUAI"</p>
            <p><b>model.focus</b> = ["LLM Optimization", "AI Safety", "Multimodal Fusion"]</p>
            <p><b>deployment.target</b> = "edge hardware + real-world constraints"</p>
            <div className="ai-orbit">AI</div>
          </aside>
        </section>

        <section className="stats">
          <div><b>7+</b><span>research works</span></div>
          <div><b>0.945</b><span>LAV-DF ROC AUC</span></div>
          <div><b>43K</b><span>safety prompts</span></div>
          <div><b>3</b><span>major venues</span></div>
        </section>

        <section id="projects" className="section">
          <p className="eyebrow">Featured Builds</p>
          <h2>Research prototypes with product energy.</h2>
          <div className="grid cards">
            {projects.map(([name, text, metric]) => <article className="card" key={name}><small>{metric}</small><h3>{name}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section id="research" className="section">
          <p className="eyebrow">Research</p>
          <h2>Efficient LLMs, AI safety, and multimodal reasoning.</h2>
          <div className="research-list">
            {research.map(([title, venue, text], i) => <article className="paper" key={title}><b>{String(i + 1).padStart(2, '0')}</b><div><small>{venue}</small><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </section>

        <section id="gallery" className="section">
          <p className="eyebrow">Gallery</p>
          <h2>A little life around the work.</h2>
          <div className="photo-grid">
            {photos.map(([src, label, text]) => <article className="photo-card" key={src}><img src={src} alt={label} /><div><small>{label}</small><p>{text}</p></div></article>)}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Stack</p>
          <div className="skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section id="contact" className="section contact">
          <p className="eyebrow">Contact</p>
          <h2>Open to research collaboration and ambitious AI engineering.</h2>
          <div className="links">
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.acl} target="_blank" rel="noreferrer">ACL Anthology</a>
            <a href={links.ieee} target="_blank" rel="noreferrer">IEEE</a>
            <a href={links.email}>Email</a>
          </div>
        </section>
      </main>
    </div>
  );
}
