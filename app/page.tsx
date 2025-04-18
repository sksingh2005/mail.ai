// pages/index.js
"use client"
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import { 
  Sun, Moon, Mail, CheckCircle, 
  ArrowRight, MessageSquare, Clock, 
  Shield, Sparkles, Zap, Users
} from 'lucide-react';


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [animatedText, setAnimatedText] = useState(" ");
  const fullText = 'Effortlessly manage your inbox';
  const [scrollY, setScrollY] = useState(0);
  const router=useRouter();
  const { data: session} = useSession();
  // Define refs for each section to trigger animations
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const { ref: pricingRef, inView: pricingInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: faqRef, inView: faqInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    // Check user's preferred color scheme
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      setDarkMode(isDark);
      
      // Handle scroll for parallax effect
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
  
    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing forward
        setAnimatedText(fullText.substring(0, currentIndex));
        currentIndex++;
  
        if (currentIndex > fullText.length) {
          isDeleting = true;
          currentIndex = fullText.length; // stay at end
        }
      } else {
        // Deleting backward
        setAnimatedText(fullText.substring(0, currentIndex));
        currentIndex--;
  
        if (currentIndex < 0) {
          isDeleting = false;
          currentIndex = 0; // restart typing
        }
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, [fullText]);
  
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Replies",
      description: "AI-generated response suggestions that match your writing style and tone."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Email Summaries",
      description: "Get concise summaries of long emails to quickly understand the content."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Priority Inbox",
      description: "Automatically sort emails by importance using advanced AI algorithms."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Schedule Sending",
      description: "Plan your emails to be sent at the optimal time for better response rates."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Controls",
      description: "End-to-end encryption and advanced security settings for all your emails."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Share inboxes and collaborate with your team on email threads."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      features: ["1 email account", "Basic AI features", "5GB storage", "Standard support"]
    },
    {
      name: "Pro",
      price: "$8",
      period: "monthly",
      popular: true,
      features: ["5 email accounts", "Advanced AI features", "50GB storage", "Priority support", "Custom domains"]
    },
    {
      name: "Business",
      price: "$16",
      period: "monthly",
      features: ["Unlimited email accounts", "Enterprise AI features", "500GB storage", "24/7 support", "Admin dashboard", "API access"]
    }
  ];

  const testimonials = [
    {
      quote: "Mail.ai has completely transformed how I handle my emails. The AI suggestions are spot on!",
      author: "Sarah J.",
      role: "Product Manager",
      avatar: "S"
    },
    {
      quote: "As someone who gets hundreds of emails daily, Mail.ai's smart categorization is a lifesaver.",
      author: "Michael T.",
      role: "CEO",
      avatar: "M"
    },
    {
      quote: "The clean interface combined with powerful AI makes this my favorite email client by far.",
      author: "Elena R.",
      role: "Designer",
      avatar: "E"
    }
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-900'}`}>
       
      <Head>
        <title>Mail.ai | AI-Powered Email Client</title>
        <meta name="description" content="Mail.ai is a minimalistic, AI-powered email client that empowers you to manage your email with ease." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid pattern */}
        <div 
          className={`absolute inset-0 opacity-5 ${darkMode ? 'bg-grid-white/5' : 'bg-grid-dark/5'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 0V20M0 1H20' stroke='%23${darkMode ? 'FFFFFF' : '000000'}' stroke-opacity='0.4' stroke-width='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        ></div>
        
        {/* Animated gradient blobs */}
        <div 
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full ${darkMode ? 'bg-red-900/30' : 'bg-blue-300/30'} blur-3xl animate-pulse`}
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full ${darkMode ? 'bg-white-900/20' : 'bg-purple-300/20'} blur-3xl animate-pulse delay-700`}
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        ></div>
        <div 
          className={`absolute top-1/2 right-1/3 w-72 h-72 rounded-full ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-300/20'} blur-3xl animate-pulse delay-1000`}
          style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
        ></div>
      </div>
      
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 flex justify-between items-center p-6 ${darkMode ? 'bg-slate-950/80' : 'bg-slate-50/80'} backdrop-blur-md border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center space-x-2">
          <Mail className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <span className="text-xl font-bold">Mail.ai</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-blue-500 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-blue-500 transition-colors">Testimonials</a>
          <a href="#faq" className="hover:text-blue-500 transition-colors">FAQ</a>
          <button 
            className={`p-2 rounded-full cursor-pointer ${darkMode ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700 ' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'} transition-colors`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {session ? (
            <Button onClick={()=>{signOut()}} className={`transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20'
            }`}
          > Log Out </Button>
          ) : (
            <Button
              onClick={() => router.push('/signin')}
              className={`transition-all cursor-pointer duration-300 hover:scale-105 shadow-lg ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                  : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20'
              }`}
            >
              Sign Up
            </Button>
          )}

          
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-16 pb-24 md:pb-32 flex flex-col items-center justify-center text-center px-4 z-10">
      <section className="fade-in-section py-10 md:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm mb-6">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
              <span>Introducing Mail.ai</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              The minimalistic,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                AI-powered
              </span>{" "}
              email client
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-10">
              Empowering you to manage your email with ease. Let AI handle the clutter while you focus on what matters.
            </p>
            <p className="mb-5 min-h-[3rem]">
              {animatedText}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r cursor-pointer from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-primary/20 cursor-pointer hover:bg-primary/5">
                See how it works
              </Button>
            </div>
          </div>
        </section>
        
        {/* Animated Mock Email Interface with loading effect */}
        <div 
          className={`w-full max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden ${
            darkMode ? 'bg-slate-950 border border-slate-700 shadow-blue-900/10' : 'bg-white border border-slate-200 shadow-slate-200/50'
          } transform transition-all duration-700 hover:scale-105`}
        >
          <div className={`h-12 ${darkMode ? 'bg-slate-950' : 'bg-slate-100'} flex items-center px-4 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row h-96">
            <div className={`w-full md:w-1/4 p-4 border-r ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className={`mb-6 p-2 rounded ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} flex items-center gap-2`}>
                <Mail size={18} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <span className="font-medium">Inbox</span>
              </div>
              <div className="space-y-4">
                {['Drafts', 'Sent', 'Archive', 'Spam', 'Trash'].map((item) => (
                  <div key={item} className={`p-2 flex items-center gap-2 rounded transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-3/4 p-4">
              <div className={`mb-4 p-4 rounded ${darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
                <h3 className="font-medium mb-2">AI Suggestions</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className={`px-3 py-1.5 rounded-full ${darkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                    📩 Summarize 5 new emails
                  </span>
                  <span className={`px-3 py-1.5 rounded-full ${darkMode ? 'bg-purple-900/50 text-purple-200' : 'bg-purple-100 text-purple-800'}`}>
                    ⏰ Schedule 2 follow-ups
                  </span>
                  <span className={`px-3 py-1.5 rounded-full ${darkMode ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800'}`}>
                    ✓ Archive 3 read emails
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {/* Loading animation for emails */}
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className={`p-3 rounded cursor-pointer animate-fadeIn ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
                    style={{ animationDelay: `${item * 150}ms` }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Team Update {item}</span>
                      <span className="text-sm text-slate-500">10:{item}0 AM</span>
                    </div>
                    <p className="text-sm truncate opacity-70">Latest updates on the project status and upcoming tasks for this week...</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with scroll animation */}
      <section 
        id="features" 
        ref={featuresRef}
        className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-white'} relative z-10`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className={`mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>Features</Badge>
            <h2 className="text-4xl font-bold mb-4">Intelligent Features</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-80">Powerful AI tools that adapt to your email habits and help you stay organized.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border ${darkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' : 'bg-white hover:bg-slate-50 border-slate-200'} transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: featuresInView ? 1 : 0,
                  transform: featuresInView ? 'translateY(0)' : 'translateY(20px)' 
                }}
              >
                <CardHeader>
                  <div className={`p-3 rounded-full inline-block mb-2 ${darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with animation */}
      <section 
        id="pricing" 
        ref={pricingRef}
        className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} relative z-10`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${pricingInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className={`mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>Pricing</Badge>
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-80">Choose the plan that works best for you and your team.</p>
          </div>
          
          <Tabs defaultValue="monthly" className="w-full max-w-md mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly"></TabsContent>
            <TabsContent value="yearly"></TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative transition-all duration-500 transform ${
                  pricingInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  plan.popular 
                    ? darkMode ? 'bg-blue-900/20 border-blue-700 shadow-lg shadow-blue-900/10' : 'bg-blue-50 border-blue-200 shadow-lg shadow-blue-500/10' 
                    : darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {plan.popular && (
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className={`px-3 py-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                      Most Popular
                    </Badge>
                  </span>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold mt-2 inline-block">{plan.price}</span>
                    {plan.period && <span className="text-lg">/{plan.period}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600' 
                        : darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with animation */}
      <section 
        id="testimonials" 
        ref={testimonialsRef}
        className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-white'} relative z-10`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${testimonialsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className={`mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-80">Join thousands of satisfied users who have transformed their email experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`transition-all duration-500 transform ${
                  testimonialsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700/70' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className={darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}>
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl mb-2">❝</div>
                  <p className="italic">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with animation */}
      <section 
        id="faq" 
        ref={faqRef}
        className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} relative z-10`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${faqInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className={`mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>FAQ</Badge>
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-80">Find answers to common questions about Mail.ai.</p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "How does the AI in Mail.ai work?",
                a: "Mail.ai uses advanced natural language processing to understand email content, suggest replies, categorize messages, and help you manage your inbox more efficiently."
              },
              {
                q: "Is my email data secure with Mail.ai?",
                a: "Absolutely. We use end-to-end encryption and never store your email content on our servers. Your privacy and security are our top priorities."
              },
              {
                q: "Can I integrate Mail.ai with my existing email accounts?",
                a: "Yes! Mail.ai works seamlessly with Gmail, Outlook, Yahoo Mail, and most other email providers through IMAP/SMTP."
              },
              {
                q: "Is there a mobile app available?",
                a: "Yes, Mail.ai is available on iOS and Android devices, offering the same powerful features with a mobile-optimized interface."
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className={`transition-all duration-500 transform ${
                  faqInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${darkMode ? 'bg-gradient-to-br from-slate-900 to-blue-950/30' : 'bg-gradient-to-br from-blue-50 to-slate-50'} relative z-10`}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your email experience?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-80">Join thousands of users who have simplified their email workflow with Mail.ai&apos;s intelligent features.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className={`px-8 py-6 text-lg transition-all duration-300 hover:scale-105 shadow-xl ${darkMode ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20' : 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/20'}`}>
              Start Your Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className={`px-8 py-6 text-lg transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mail className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className="text-xl font-bold">Mail.ai</span>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Revolutionizing email management with advanced AI technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Integrations', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Documentation', 'Tutorials', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-4 md:mb-0`}>
              © {new Date().getFullYear()} Mail.ai. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}