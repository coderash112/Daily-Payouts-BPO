'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Moon, Sun, Menu, X, MessageCircle, Send, CheckCircle,
  Headphones, Phone, MessageSquare, Plane, Ship, Car,
  Building2, Hash, TrendingUp, Search, Users, Shield,
  Clock, Globe, Award, Mail, MapPin, Linkedin, Twitter, Facebook
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

const services = [
  { icon: Car, title: 'Auto Parts Inhouse', description: 'Expert automotive parts support with in-house specialists' },
  { icon: Headphones, title: 'Printer Support Inhouse', description: 'Dedicated technical support for all printer-related queries' },
  { icon: MessageSquare, title: 'Chat Support - USA/Domestic', description: '24/7 domestic chat support services for US customers' },
  { icon: Plane, title: 'Flight Booking Inhouse', description: 'Inbound flight booking services with trained professionals' },
  { icon: Ship, title: 'Cruise Booking Inhouse', description: 'Specialized cruise booking and customer support' },
  { icon: Car, title: 'Car Rental - USA', description: 'US-focused car rental booking and support services' },
  { icon: Phone, title: 'Voice Process - Domestic Inbound', description: 'Professional inbound voice support for domestic clients' },
  { icon: Building2, title: 'Company Incorporation + Merchant Services', description: 'Complete business setup and payment processing solutions' },
  { icon: Hash, title: 'TFN Services', description: 'Toll-free number services and management' },
  { icon: TrendingUp, title: 'Digital Marketing', description: 'Full-spectrum digital marketing solutions' },
  { icon: Search, title: 'SEO Services (Online & Offline)', description: 'Comprehensive SEO optimization for maximum visibility' },
]

const whyChooseUs = [
  { icon: Shield, title: '100% In-House Operations', description: 'No third-party vendors - complete control and security' },
  { icon: Clock, title: 'US Time Zone Coverage', description: 'Seamless support aligned with American business hours' },
  { icon: Users, title: 'Scalable Teams', description: 'Flexible team sizes to match your growing needs' },
  { icon: Globe, title: 'Secure Infrastructure', description: 'Enterprise-grade security and data protection' },
  { icon: Award, title: 'NDA & Compliance', description: 'Full legal compliance and confidentiality guaranteed' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: '',
    city: '',
    seats: '',
    contactName: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const handleChatInput = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (chatStep === 0 && !formData.companyName) {
      toast.error('Please enter your company name')
      return
    }
    if (chatStep === 1 && !formData.city) {
      toast.error('Please enter the city')
      return
    }
    if (chatStep === 2 && !formData.seats) {
      toast.error('Please enter number of seats')
      return
    }
    if (chatStep === 3) {
      if (!formData.contactName || !formData.email || !formData.phone) {
        toast.error('Please fill all contact details')
        return
      }
      handleSubmit()
      return
    }
    setChatStep(prev => prev + 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (response.ok) {
        toast.success('Thank you! We\'ll contact you shortly.')
        setChatStep(4) // Success step
        setTimeout(() => {
          setChatOpen(false)
          setChatStep(0)
          setFormData({
            companyName: '',
            city: '',
            seats: '',
            contactName: '',
            email: '',
            phone: ''
          })
        }, 3000)
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast.error('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            BPO Services
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection('why-us')} className="hover:text-primary transition-colors">Why Us</button>
            <button onClick={() => scrollToSection('team')} className="hover:text-primary transition-colors">Team</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
            <Button onClick={() => setChatOpen(true)} size="sm">Get Started</Button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <button onClick={() => scrollToSection('services')} className="text-left hover:text-primary transition-colors">Services</button>
                <button onClick={() => scrollToSection('why-us')} className="text-left hover:text-primary transition-colors">Why Us</button>
                <button onClick={() => scrollToSection('team')} className="text-left hover:text-primary transition-colors">Team</button>
                <button onClick={() => scrollToSection('contact')} className="text-left hover:text-primary transition-colors">Contact</button>
                <Button onClick={() => { setChatOpen(true); setMobileMenuOpen(false); }} className="w-full">Get Started</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />
        <motion.div 
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            In-House Outsourcing<br />& IT Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scalable. Secure. US-Focused.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setChatOpen(true)} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="text-lg px-8">
              Talk to Us
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg">Comprehensive in-house solutions for your business needs</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">Excellence in every aspect of service delivery</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseUs.map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Team */}
      <section id="team" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Our Team</h2>
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    Our in-house team consists of highly trained professionals specializing in operations, 
                    customer support, quality assurance, and management. We pride ourselves on maintaining 
                    100% in-house operations with no third-party involvement.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">50+</div>
                      <div className="text-sm">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">5+</div>
                      <div className="text-sm">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                      <div className="text-sm">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">100%</div>
                      <div className="text-sm">US Process Trained</div>
                    </div>
                  </div>
                  <p>
                    Every team member undergoes rigorous training in US business processes, ensuring 
                    seamless integration with your operations. We emphasize NDA compliance, data security, 
                    and professional excellence in all our services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="py-16 px-4 bg-background border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                BPO Services
              </h3>
              <p className="text-muted-foreground mb-4">
                Premium in-house BPO and IT services tailored for US businesses.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('services')} className="block text-muted-foreground hover:text-primary transition-colors">Services</button>
                <button onClick={() => scrollToSection('why-us')} className="block text-muted-foreground hover:text-primary transition-colors">Why Us</button>
                <button onClick={() => scrollToSection('team')} className="block text-muted-foreground hover:text-primary transition-colors">Team</button>
                <button onClick={() => setChatOpen(true)} className="block text-muted-foreground hover:text-primary transition-colors">Get Started</button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <a href="mailto:partner@dailypayoutsbpo.com" className="hover:text-primary transition-colors">partner@dailypayoutsbpo.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>+1 (855) 889 4018</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BPO Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setChatOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-4 right-4 w-full max-w-md z-50"
            >
              <Card className="shadow-2xl border-border">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-6 w-6" />
                      <div>
                        <CardTitle className="text-white">Let's Get Started</CardTitle>
                        <CardDescription className="text-white/80">Tell us about your needs</CardDescription>
                      </div>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <AnimatePresence mode="wait">
                    {chatStep === 0 && (
                      <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-muted-foreground">What is your company name?</p>
                        <Input
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={(e) => handleChatInput('companyName', e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                          autoFocus
                        />
                      </motion.div>
                    )}

                    {chatStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-muted-foreground">Which city do you want to open the center in?</p>
                        <Input
                          placeholder="Enter city name"
                          value={formData.city}
                          onChange={(e) => handleChatInput('city', e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                          autoFocus
                        />
                      </motion.div>
                    )}

                    {chatStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-muted-foreground">How many seats do you want to start with?</p>
                        <Input
                          type="number"
                          placeholder="Enter number of seats"
                          value={formData.seats}
                          onChange={(e) => handleChatInput('seats', e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                          autoFocus
                        />
                      </motion.div>
                    )}

                    {chatStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <p className="text-muted-foreground">Great! Now let's get your contact details:</p>
                        <Input
                          placeholder="Your name"
                          value={formData.contactName}
                          onChange={(e) => handleChatInput('contactName', e.target.value)}
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={(e) => handleChatInput('email', e.target.value)}
                        />
                        <Input
                          type="tel"
                          placeholder="Your phone"
                          value={formData.phone}
                          onChange={(e) => handleChatInput('phone', e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                        />
                      </motion.div>
                    )}

                    {chatStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                        <p className="text-muted-foreground">We'll contact you shortly.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {chatStep < 4 && (
                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-muted-foreground">
                        Step {chatStep + 1} of 4
                      </div>
                      <Button onClick={handleNext} disabled={isSubmitting} className="gap-2">
                        {isSubmitting ? 'Submitting...' : chatStep === 3 ? 'Submit' : 'Next'}
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!chatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow z-40 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  )
}
