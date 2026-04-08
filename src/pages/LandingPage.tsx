import {
  ArrowRight,
  CheckCircle2,
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

import nvpLogo from '../assets/nvp-logo-circular.png'

function TypewriterText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true)
      let index = 0
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(startDelay)
  }, [text, delay, speed])
  
  return (
    <span>
      {displayedText}
      {isTyping && displayedText.length < text.length && (
        <span className="inline-block w-0.5 h-4 sm:h-5 bg-purple-500 ml-1 animate-pulse" />
      )}
    </span>
  )
}

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
        <img src={nvpLogo} alt="NeuroVidyaPeeth" className="h-16 w-16 rounded-full object-cover" />
        <div className="text-xl font-display font-bold text-slate-900 animate-pulse">NeuroVidyaPeeth</div>
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
  const [isBrandVisible, setIsBrandVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsBrandVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

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
      website: formData.get('website'),
    }

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
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center animate-in fade-in duration-700">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <CheckCircle2 className="h-8 w-8 text-purple-500" />
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
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-purple-100 selection:text-slate-900">
      <LoadingScreen />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 sm:h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <img src={nvpLogo} alt="NeuroVidyaPeeth" className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover" />
            <span className="text-lg font-display font-bold text-slate-900 hidden sm:block">NeuroVidyaPeeth</span>
            <span className={`text-lg font-display font-bold text-slate-900 sm:hidden transition-opacity duration-500 ${isBrandVisible ? 'opacity-100' : 'opacity-0'}`}>
              NeuroVidyaPeeth
            </span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('curriculum')} className="text-sm font-medium text-slate-600 hover:text-purple-500 transition-colors">Curriculum</button>
            <button onClick={() => scrollToSection('highlights')} className="text-sm font-medium text-slate-600 hover:text-purple-500 transition-colors">Highlights</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-slate-600 hover:text-purple-500 transition-colors">FAQ</button>
            <a href="https://rzp.io/rzp/neurovidyapeethtestportal" target="_blank" rel="noopener noreferrer">
              <Button variant="purple" size="lg" className="text-sm font-semibold">
                Eligibility Test — ₹99
              </Button>
            </a>
            <Button variant="navy" size="lg" onClick={() => scrollToSection('inquiry')} className="text-sm font-semibold">
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
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 md:hidden shadow-lg">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('curriculum')} className="text-left text-sm font-medium text-slate-600 py-2">Curriculum</button>
              <button onClick={() => scrollToSection('highlights')} className="text-left text-sm font-medium text-slate-600 py-2">Highlights</button>
              <button onClick={() => scrollToSection('faq')} className="text-left text-sm font-medium text-slate-600 py-2">FAQ</button>
              <a href="https://rzp.io/rzp/neurovidyapeethtestportal" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                <Button variant="purple" className="w-full justify-center">
                  Eligibility Test — ₹99
                </Button>
              </a>
              <Button variant="navy" onClick={() => scrollToSection('inquiry')} className="w-full justify-center">
                Apply Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <Badge variant="purple" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-white animate-pulse"></span>
              Upcoming Batch Starting on 7May'26
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 font-display leading-[1.1]">
              Complete AI &<br className="hidden sm:block" />
              <span className="text-purple-gradient">Machine Learning</span> Program
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-600 max-w-2xl mx-auto">
              <TypewriterText 
                text="Master the future of technology with our comprehensive 8-month program. From Python basics to Advanced GenAI, build your career in Data Science and AI." 
                delay={300}
                speed={25}
              />
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <a href="https://rzp.io/rzp/neurovidyapeethtestportal" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="purple" size="xl" className="h-14 px-8 text-base font-semibold w-full sm:w-auto shadow-purple-lg">
                  Eligibility Test — ₹99
                </Button>
              </a>
              <Button
                variant="navy"
                size="xl"
                className="h-14 px-8 text-base w-full sm:w-auto shadow-md"
                onClick={() => scrollToSection('inquiry')}
              >
                Request Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <button
                onClick={() => scrollToSection('curriculum')}
                className="text-sm font-semibold leading-6 text-slate-900 hover:text-purple-500 transition-colors flex items-center gap-2 group px-4 py-3"
              >
                View Curriculum <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <FadeIn className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display mb-4">Course Curriculum</h2>
            <p className="text-base sm:text-lg text-slate-600">
              A meticulously crafted journey from fundamentals to advanced AI systems, broken down into 99 comprehensive modules.
            </p>
          </FadeIn>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {curriculum.map((item, index) => (
              <FadeIn key={index} delay={index * 50}>
                <Card className="h-full border border-slate-200 shadow-sm group hover:shadow-md hover:border-l-4 hover:border-l-purple-500 transition-all duration-300">
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <Badge variant="purple" className="font-semibold text-xs sm:text-sm">
                        {item.phase}
                      </Badge>
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{item.modules}</span>
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 font-display">{item.title}</CardTitle>
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
      <section id="highlights" className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight mb-10 font-display text-slate-900">Why Choose This Program?</h2>
              <div className="space-y-0 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-5 p-5 hover:bg-slate-50 transition-colors duration-200 group cursor-default border-b border-slate-100 last:border-b-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 flex items-center justify-center rounded-full group-hover:bg-purple-200 transition-colors duration-200">
                      <CheckCircle2 className="h-5 w-5 text-purple-500" />
                    </div>
                    <span className="text-base text-slate-900 font-medium group-hover:text-purple-600 transition-colors">{highlight}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="relative mt-4">
                <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3 font-display text-slate-900 border-b border-slate-100 pb-5">
                      <div className="p-2.5 bg-purple-100 rounded-xl">
                        <Award className="h-5 w-5 text-purple-500" />
                      </div>
                      Key Outcomes
                    </h3>
                    <div className="space-y-4">
                      {[
                        "Master Python for Data Science",
                        "Work with LLMs, RAG & Vector Databases",
                        "Perform EDA & Feature Engineering",
                        "Create NLP & Computer Vision solutions",
                        "Implement Deep Learning models",
                        "Use LangChain, LangGraph & HuggingFace APIs"
                      ].map((outcome, i) => (
                        <div key={i} className="flex items-start gap-4 p-2 group/item">
                          <div className="mt-2 h-2 w-2 bg-purple-400 group-hover/item:bg-purple-500 transition-colors rounded-full flex-shrink-0"></div>
                          <p className="text-slate-600 group-hover/item:text-slate-900 transition-colors text-sm leading-relaxed">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">Start Your Journey</h2>
            <p className="mt-4 text-slate-600 max-w-md mx-auto">
              Fill out the form below to inquire about the course. We'll send you the detailed brochure and fee structure.
            </p>
          </FadeIn>
          
          <FadeIn delay={100}>
            <Card className="shadow-lg border border-slate-200 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100 animate-in fade-in slide-in-from-top-2">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-slate-900">Full Name</label>
                      <Input id="name" name="name" required placeholder="John Doe" className="bg-slate-50 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium text-slate-900">City</label>
                      <Input id="city" name="city" required placeholder="Delhi" className="bg-slate-50 border-slate-200" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-900">Email Address</label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-slate-50 border-slate-200" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-900">Phone Number</label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="bg-slate-50 border-slate-200" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="background" className="text-sm font-medium text-slate-900">Educational Background</label>
                    <Input id="background" name="background" required placeholder="e.g. B.Tech CS Student..." className="bg-slate-50 border-slate-200" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="course" className="text-sm font-medium text-slate-900">Preferred Course</label>
                    <input type="hidden" name="course" value={course} />
                    <Select onValueChange={setCourse} required>
                      <SelectTrigger className="bg-slate-50 border-slate-200">
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
                    <label htmlFor="goals" className="text-sm font-medium text-slate-900">Learning Goals</label>
                    <Input id="goals" name="goals" required placeholder="What do you want to achieve?" className="bg-slate-50 border-slate-200" />
                  </div>

                  <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Button type="submit" variant="purple" size="lg" className="w-full h-12 text-base font-semibold shadow-purple-lg" disabled={isSubmitting}>
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
      <footer id="faq" className="bg-slate-900 pt-12 pb-8 sm:pt-16 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12 sm:mb-16">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={nvpLogo} alt="NeuroVidyaPeeth" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-xl font-bold tracking-tight text-white font-display">NeuroVidyaPeeth</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm leading-relaxed text-sm sm:text-base">
                Empowering the next generation of AI engineers with industry-relevant skills and hands-on project experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6 font-display">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => scrollToSection('curriculum')} className="hover:text-purple-400 transition-colors">Curriculum</button></li>
                <li><button onClick={() => scrollToSection('highlights')} className="hover:text-purple-400 transition-colors">Highlights</button></li>
                <li><button onClick={() => scrollToSection('inquiry')} className="hover:text-purple-400 transition-colors">Apply Now</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-6 font-display">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-400" /> Delhi, India (Online)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Admissions Open
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 sm:pt-8 border-t border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} NeuroVidyaPeeth. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm text-slate-400 sm:justify-end">
                <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 text-xs text-slate-500 space-y-2 border-t border-slate-800 pt-6 sm:pt-8">
               <p className="font-semibold text-slate-400 mb-2">Terms & Conditions</p>
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
