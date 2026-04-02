import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Users2,
  MapPin,
  Send,
  Loader2,
  Award,
  Menu,
  X,
} from 'lucide-react'
import { useState, type FormEvent, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'

import aimlImg from '../assets/AIML.png'
import promptImg from '../assets/PromptEngineering.png'
import nvpLogo from '../assets/nvp-logo.png'

const stats = [
  { value: '8 Months', label: 'Course Duration', icon: Clock3 },
  { value: '99+ Modules', label: 'Comprehensive Content', icon: BookOpen },
  { value: '5 Projects', label: 'Hands-on Projects', icon: GraduationCap },
  { value: 'Online Live', label: 'Mode of Learning', icon: Users2 },
]

const curriculum = [
  {
    phase: 'Phase 1',
    title: 'Python Mastery',
    modules: 'Modules 1–20',
    description:
      'Overview, Python Basics, Lists, Tuples & Sets, Dictionaries, Conditionals & Loops, Comprehensions & Functions, OOP (Parts 1, 2 & 3), File Handling, Exception Handling, Multithreading, Memory Management, Databases (SQL), Web APIs, Flask Framework.',
  },
  {
    phase: 'Phase 2',
    title: 'Data Science & Analytics',
    modules: 'Modules 21–29',
    description: 'Data handling, analysis workflows, visualisation and practical analytics thinking for real datasets.',
  },
  {
    phase: 'Phase 3',
    title: 'Statistics & Mathematics',
    modules: 'Modules 30–38',
    description: 'Probability, distributions, hypothesis testing and the mathematical base required for machine learning.',
  },
  {
    phase: 'Phase 4',
    title: 'Machine Learning',
    modules: 'Modules 39–60',
    description:
      'Introduction to ML, Feature Engineering, Exploratory Data Analysis (EDA), Regression (Linear, Ridge, Lasso, ElasticNet).',
  },
  {
    phase: 'Phase 5',
    title: 'Deep Learning',
    modules: 'Modules 61–68',
    description: 'Neural network fundamentals, model training workflows and applied deep learning implementation.',
  },
  {
    phase: 'Phase 6',
    title: 'Computer Vision & Generative AI',
    modules: 'Modules 69–74',
    description: 'Computer Vision with YOLO, Introduction to GANs, NLP (Basics to Advanced), Advanced NLP Projects, real-world GenAI applications.',
  },
  {
    phase: 'Phase 7',
    title: 'Data Engineering & BI',
    modules: 'Modules 75–76',
    description: 'Production-oriented thinking around pipelines, data systems and business intelligence basics.',
  },
  {
    phase: 'Phase 8',
    title: 'LLMs, GenAI & Deployment',
    modules: 'Modules 77–99',
    description: 'Master Python for Data Science, Work with LLMs, RAG & Vector Databases, Perform EDA & Feature Engineering, Create NLP & Computer Vision solutions, Implement Deep Learning models, Use LangChain, LangGraph & HuggingFace APIs.',
  },
]

const highlights = [
  'Live Online Classes',
  'Recorded Backup of Every Session',
  '5 Industry-Level Projects',
  'Doubt-Clearing Sessions',
  'Course Completion Certificate',
]

const terms = [
  'Fee once paid is non-refundable unless the batch is cancelled by NeuroVidyaPeeth.',
  'Students are expected to maintain regular attendance for best learning outcomes.',
  'Course access and recorded sessions are for enrolled students only — sharing is prohibited.',
  'A Course Completion Certificate will be issued upon successful completion of all modules and projects.',
  'NeuroVidyaPeeth reserves the right to update the curriculum to align with industry trends.',
  'Batch timings and schedule will be communicated separately before batch commencement.',
]

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700 ease-out animate-out fade-out fill-mode-forwards">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>
        <div className="text-xl font-display font-bold text-indigo-900 animate-pulse">NeuroVidyaPeeth</div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [course, setCourse] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      background: formData.get('background'),
      goals: formData.get('goals'),
      course: formData.get('course'),
      website: formData.get('website'), // Honeypot field
    }

    // Honeypot check
    if (data.website) {
      setIsSubmitting(false)
      setIsSubmitted(true)
      return
    }

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...data,
          subject: `New Inquiry from ${data.name} - ${data.course}`
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit inquiry')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center animate-in fade-in duration-700">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 font-display">Thank you!</h2>
          <p className="mt-2 text-slate-600">
            Your inquiry has been received. We will get back to you shortly with more details about the program.
          </p>
          <Button 
            className="mt-8 w-full" 
            variant="outline"
            onClick={() => setIsSubmitted(false)}
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <LoadingScreen />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <img src={nvpLogo} alt="NeuroVidyaPeeth" className="h-10 w-auto object-contain" />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('curriculum')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Curriculum</button>
            <button onClick={() => scrollToSection('highlights')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Highlights</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">FAQ</button>
            <a href="https://rzp.io/rzp/neurovidyapeethtestportal" target="_blank" rel="noopener noreferrer">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20">
                Take Test — ₹99
              </Button>
            </a>
            <Button onClick={() => scrollToSection('inquiry')} className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 md:hidden shadow-xl animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('curriculum')} className="text-left text-sm font-medium text-slate-600 py-2">Curriculum</button>
              <button onClick={() => scrollToSection('highlights')} className="text-left text-sm font-medium text-slate-600 py-2">Highlights</button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-sm font-medium text-slate-600 py-2">FAQ</button>
              <a href="https://rzp.io/rzp/neurovidyapeethtestportal" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white">
                  Take Test — ₹99
                </Button>
              </a>
              <Button onClick={() => scrollToSection('inquiry')} className="w-full justify-center">
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 ring-1 ring-inset ring-indigo-100 bg-white shadow-sm">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              New Batch: 2nd Week of April 2026
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-8 font-display leading-[1.1]">
              Complete AI & <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Machine Learning</span> Program
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto font-sans">
              Master the future of technology with our comprehensive 8-month program. From Python basics to Advanced GenAI, build your career in Data Science and AI.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 w-full sm:w-auto transition-transform hover:scale-105 active:scale-95"
                onClick={() => scrollToSection('inquiry')}
              >
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <button 
                onClick={() => scrollToSection('curriculum')}
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600 transition-colors flex items-center gap-2 group px-6 py-4"
              >
                View Curriculum <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 max-w-5xl mx-auto opacity-90">
               <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/20 transform sm:rotate-[-1deg] hover:rotate-0 transition-all duration-500 hover:z-10 hover:scale-105">
                 <img src={aimlImg} alt="AI/ML Course Preview" className="w-full h-auto object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                   <p className="text-white font-medium text-sm">Comprehensive AI/ML Curriculum</p>
                 </div>
               </div>
               <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-white/20 transform sm:rotate-[1deg] hover:rotate-0 transition-all duration-500 hover:z-10 hover:scale-105 mt-0 sm:mt-8">
                 <img src={promptImg} alt="Prompt Engineering Preview" className="w-full h-auto object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                   <p className="text-white font-medium text-sm">Advanced Prompt Engineering</p>
                 </div>
               </div>
            </div>
          </FadeIn>
        </div>
        
        {/* Background decorative blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 100} className="flex flex-col items-center text-center group hover:translate-y-[-2px] transition-transform duration-300">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 shadow-sm ring-1 ring-slate-900/5 text-indigo-600 group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-7 w-7" />
                </div>
                <dt className="text-3xl font-bold text-slate-900 font-display">{stat.value}</dt>
                <dd className="text-sm font-medium text-slate-500 mt-1">{stat.label}</dd>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-24 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display mb-4">Course Curriculum</h2>
            <p className="text-lg text-slate-600">
              A meticulously crafted journey from fundamentals to advanced AI systems, broken down into 99 comprehensive modules.
            </p>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {curriculum.map((item, index) => (
              <FadeIn key={index} delay={index * 50}>
                <Card className="h-full border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white group overflow-hidden relative">
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-100/50 rounded-xl transition-colors duration-300 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-1 h-0 bg-indigo-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant="outline" className="border-indigo-100 bg-indigo-50/50 text-indigo-700 font-medium">
                        {item.phase}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.modules}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 font-display">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & Projects */}
      <section id="highlights" className="bg-[#1a1a1a] py-24 text-white relative border-y border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <FadeIn>
              <h2 className="text-4xl font-bold tracking-tighter mb-12 font-display text-white uppercase border-l-4 border-indigo-500 pl-6">Why Choose This Program?</h2>
              <div className="space-y-0 border-t border-neutral-800">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-6 p-6 border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors duration-200 group cursor-default">
                    <div className="flex-shrink-0 w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-colors duration-200 rounded-none">
                      <CheckCircle2 className="h-6 w-6 text-white group-hover:text-neutral-900" />
                    </div>
                    <span className="text-lg text-neutral-300 font-medium group-hover:text-white transition-colors font-mono">{highlight}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="relative mt-4">
                {/* Hard shadow effect */}
                <div className="absolute top-4 left-4 w-full h-full border-2 border-neutral-800 bg-transparent z-0 hidden md:block"></div>
                
                <div className="relative bg-[#1a1a1a] border-2 border-neutral-700 p-8 z-10 hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 font-display border-b-2 border-neutral-800 pb-6 uppercase tracking-tight">
                    <div className="p-3 bg-neutral-800 border border-neutral-700 rounded-none">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    Key Outcomes
                  </h3>
                  <div className="space-y-4 text-neutral-300">
                    {[
                      "Master Python for Data Science",
                      "Work with LLMs, RAG & Vector Databases",
                      "Perform EDA & Feature Engineering",
                      "Create NLP & Computer Vision solutions",
                      "Implement Deep Learning models",
                      "Use LangChain, LangGraph & HuggingFace APIs"
                    ].map((outcome, i) => (
                      <div key={i} className="flex items-start gap-4 p-2 group/item">
                        <div className="mt-2 h-2 w-2 bg-indigo-500 group-hover/item:bg-white transition-colors rounded-none"></div>
                        <p className="text-neutral-400 group-hover/item:text-white transition-colors font-mono text-sm leading-relaxed uppercase tracking-wide">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 lg:py-24 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="mx-auto max-w-xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">Start Your Journey</h2>
            <p className="mt-4 text-slate-600 max-w-md mx-auto">
              Fill out the form below to inquire about the course. We'll send you the detailed brochure and fee structure.
            </p>
          </FadeIn>
          
          <FadeIn delay={100}>
            <Card className="shadow-2xl shadow-indigo-100 border-0 overflow-hidden ring-1 ring-slate-900/5 bg-white">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input id="name" name="name" required placeholder="John Doe" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-slate-700">City</label>
                      <Input id="city" name="city" required placeholder="Delhi" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="background" className="text-sm font-medium text-slate-700">Educational Background</label>
                    <Input id="background" name="background" required placeholder="e.g. B.Tech CS Student..." className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="course" className="text-sm font-medium text-slate-700">Preferred Course</label>
                    <input type="hidden" name="course" value={course} />
                    <Select onValueChange={setCourse} required>
                      <SelectTrigger className="bg-slate-50 border-slate-200 focus:bg-white transition-colors">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PromptEngineering Masters">PromptEngineering Masters</SelectItem>
                        <SelectItem value="GenAI Masters">GenAI Masters</SelectItem>
                        <SelectItem value="Both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="text-sm font-medium text-slate-700">Learning Goals</label>
                    <Input id="goals" name="goals" required placeholder="What do you want to achieve?" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                  </div>

                  {/* Honeypot field - hidden from real users */}
                  <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-base font-medium transition-all hover:shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Inquiry <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Footer & Terms */}
      <footer id="faq" className="bg-gradient-to-b from-white to-slate-100 border-t border-slate-200 pt-16 pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="text-xl font-bold tracking-tight text-slate-900 font-display">NeuroVidyaPeeth</div>
              </div>
              <p className="text-slate-500 mb-6 max-w-sm leading-relaxed">
                Empowering the next generation of AI engineers with industry-relevant skills and hands-on project experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-6 font-display">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><button onClick={() => scrollToSection('curriculum')} className="hover:text-indigo-600 transition-colors">Curriculum</button></li>
                <li><button onClick={() => scrollToSection('highlights')} className="hover:text-indigo-600 transition-colors">Highlights</button></li>
                <li><button onClick={() => scrollToSection('inquiry')} className="hover:text-indigo-600 transition-colors">Apply Now</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-6 font-display">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500" /> Delhi, India (Online)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Admissions Open
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} NeuroVidyaPeeth. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-slate-500 md:justify-end">
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              </div>
            </div>
            
            <div className="mt-8 text-xs text-slate-400 space-y-2 border-t border-slate-100 pt-8">
               <p className="font-semibold text-slate-500 mb-2">Terms & Conditions</p>
               <ul className="space-y-1 list-disc pl-4">
                {terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
