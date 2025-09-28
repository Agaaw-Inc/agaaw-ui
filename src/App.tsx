import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Avatar, Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Award,
  FileText,
  Calendar,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Story slides data
const storySlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwYWJyb2FkJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NTkwNjE4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Start Your Journey",
    description: "Connect with students already living your dream abroad"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591218214141-45545921d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnklMjBzdHVkZW50cyUyMGNlbGVicmF0aW5nfGVufDF8fHx8MTc1OTA2MTgzOHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Achieve Your Dreams", 
    description: "Graduate from top universities around the world"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBkaXZlcnNlJTIwZ3JvdXB8ZW58MXx8fHwxNzU5MDYxODM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Global Community",
    description: "Join a diverse community of international students"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1651670630210-a9a6604b4a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5MDQ5MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Top Universities",
    description: "Access information about leading institutions worldwide"
  }
];

type UserRole = 'student' | 'consultant';
type AppState = 'home' | 'login' | 'register' | 'dashboard';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [appState, setAppState] = useState<AppState>('home');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % storySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storySlides.length) % storySlides.length);
  };

  const handleRegister = (role: UserRole) => {
    setUserRole(role);
    setAppState('register');
  };

  const handleLogin = () => {
    setAppState('login');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setAppState('home');
  };

  // Homepage component
  const HomePage = () => (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-semibold text-primary">Agaaw</h1>
                <p className="text-sm text-muted-foreground">Fly to your Future</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={handleLogin}>Login</Button>
              <Button onClick={() => handleRegister('student')}>Get Started</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t mt-2 pt-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" onClick={handleLogin} className="justify-start">Login</Button>
                <Button onClick={() => handleRegister('student')} className="justify-start">Get Started</Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Agaaw
            </h1>
            <p className="text-2xl md:text-3xl text-primary/80 mb-8">
              Fly to your Future
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your all-in-one platform for studying abroad. Connect with mentors, find scholarships, and make your dreams a reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/40" 
                    onClick={() => handleRegister('student')}>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Register as Student</h3>
                    <p className="text-sm text-muted-foreground">Find your dream university</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-primary/20 hover:border-primary/40"
                    onClick={() => handleRegister('consultant')}>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Register as Consultant</h3>
                    <p className="text-sm text-muted-foreground">Help others achieve their dreams</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Story Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-96">
            {/* Slide Images */}
            <div className="relative h-full">
              {storySlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              ))}
            </div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
              <div className="max-w-md">
                <h3 className="text-3xl font-bold mb-4">{storySlides[currentSlide].title}</h3>
                <p className="text-lg opacity-90">{storySlides[currentSlide].description}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {storySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brief Discussion */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Why Choose Agaaw?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">Access to universities and opportunities worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real Mentors</h3>
              <p className="text-muted-foreground">Connect with actual students, not agency representatives</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">No Fraud</h3>
              <p className="text-muted-foreground">Transparent platform with verified mentors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Students */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-2" />
                For Students
              </h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                This is the all in one platform where you can find everything that you need in order to fulfill your dream, 
                going abroad for your study. Here you can find all the info about admitting yourself into the top universities 
                from all around the world.
              </p>
              <p className="text-primary-foreground/90 leading-relaxed mt-4">
                If you face difficulties, you can find other students who are already studying in your dream countries or 
                universities. Make them your mentor and process it. Fulfill your dream with no fraud, your mentor will be a 
                direct university student, not any other people who never studied in a foreign university, just opened an 
                agency to grab your money, time.
              </p>
              <p className="text-primary-foreground/90 leading-relaxed mt-4">
                So start your journey here, find all the information about scholarships, admission and find a mentor to guide you.
              </p>
              <Button 
                variant="secondary" 
                className="mt-6"
                onClick={() => handleRegister('student')}
              >
                Register now as a student
              </Button>
            </div>

            {/* For Mentors */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                For Mentors
              </h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                You have fulfilled your dream already, now help your brothers and sisters. Become a mentor on this platform 
                and earn some extra money. This profession makes you great as a community contributor and you can earn money 
                by mentoring others.
              </p>
              <Button 
                variant="secondary" 
                className="mt-6"
                onClick={() => handleRegister('consultant')}
              >
                Register now as a mentor
              </Button>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <GraduationCap className="h-6 w-6" />
              <span className="text-lg font-semibold">Agaaw</span>
            </div>
            <p className="text-primary-foreground/70">© 2025 Agaaw. Fly to your Future.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Login Form
  const LoginForm = () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-semibold">Agaaw</h1>
            </div>
            <h2 className="text-xl">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <Input type="password" placeholder="Enter your password" />
            </div>
            <Button className="w-full" onClick={handleLoginSuccess}>
              Sign In
            </Button>
            <div className="text-center">
              <Button variant="link" onClick={() => setAppState('home')}>
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Registration Form
  const RegistrationForm = () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-semibold">Agaaw</h1>
            </div>
            <h2 className="text-xl">Create Account</h2>
            <p className="text-muted-foreground">
              Register as {userRole === 'student' ? 'a Student' : 'a Consultant'}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Full Name</label>
              <Input placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <Input type="password" placeholder="Create a password" />
            </div>
            <div>
              <label className="block mb-2">Confirm Password</label>
              <Input type="password" placeholder="Confirm your password" />
            </div>
            <Button className="w-full" onClick={handleLoginSuccess}>
              Create Account
            </Button>
            <div className="text-center">
              <Button variant="link" onClick={() => setAppState('home')}>
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Dashboard Component (placeholder for now)
  const Dashboard = () => (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold text-primary">Agaaw</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Avatar>
                <AvatarFallback>{userRole === 'student' ? 'S' : 'C'}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Welcome to your {userRole === 'student' ? 'Student' : 'Consultant'} Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            {userRole === 'student' 
              ? 'Find mentors, scholarships, and universities to achieve your study abroad dreams'
              : 'Help students achieve their dreams and earn by mentoring'
            }
          </p>
        </div>

        {userRole === 'student' ? (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Find Consultant</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Award className="h-6 w-6" />
                    <span>Scholarships</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Globe className="h-6 w-6" />
                    <span>Countries</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>CV Builder</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Latest News</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">New Scholarships Available</p>
                    <p className="text-muted-foreground">DAAD scholarships now open for applications</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">University Rankings Updated</p>
                    <p className="text-muted-foreground">QS World University Rankings 2025 released</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Mentor Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex-col space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Create Blog Post</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <MessageCircle className="h-6 w-6" />
                    <span>Messages</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Set Availability</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Award className="h-6 w-6" />
                    <span>Service Pricing</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Profile Completion</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Basic Info</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">University Details</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Services & Pricing</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );

  // Main app render logic
  if (appState === 'login') {
    return <LoginForm />;
  }

  if (appState === 'register') {
    return <RegistrationForm />;
  }

  if (appState === 'dashboard' && isLoggedIn) {
    return <Dashboard />;
  }

  return <HomePage />;
}