'use client'

import React, { useState } from 'react'
import { Home, TrendingUp, Activity, FileText, DollarSign, Search, Moon, User, ArrowRight, ExternalLink, BookOpen, Calendar, Play, Users, BarChart2, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import IntroPage from '@/components/intropage'

// Add the font import
const fontUrl = "https://use.typekit.net/gcd4kuc.css";

const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) => (
  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg w-full ${active ? 'bg-sky-100 text-sky-600' : ''}`}>
    {icon}
    <span className="text-gray-700">{text}</span>
  </button>
)

const FeatureCard = ({ icon, title, description, grey = false }: { icon: React.ReactNode; title: string; description: string; grey?: boolean }) => (
  <Card className={`${grey ? 'bg-gray-100 shadow-none border-0' : 'bg-white hover:shadow-lg'} transition-shadow duration-300`}>
    <CardContent className="p-4 sm:p-6">
      <div className="mb-4 text-sky-600">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </CardContent>
  </Card>
)

const HelpCard = ({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode }) => (
  <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 cursor-pointer group">
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    {icon || <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-sky-600" />}
  </div>
)

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  return (
    <>
      <IntroPage />
      <div className="min-h-screen bg-white" style={{ fontFamily: 'proxima-nova, sans-serif' }}>
        {/* Add the font stylesheet */}
        <link rel="stylesheet" href={fontUrl} />
        
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20 mt-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg sm:text-xl font-bold text-sky-600">Onboard Accounting</span>
                <nav className="hidden md:flex space-x-2">
                  <NavItem icon={<Home className="w-5 h-5" />} text="Home" active />
                  <NavItem icon={<TrendingUp className="w-5 h-5" />} text="Services" />
                  <NavItem icon={<Activity className="w-5 h-5" />} text="Reports" />
                  <NavItem icon={<FileText className="w-5 h-5" />} text="Resources" />
                  <NavItem icon={<DollarSign className="w-5 h-5" />} text="Financials" />
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search services or resources"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 rounded-full"
                  />
                </div>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <Moon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                  <User className="w-5 h-5" />
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col space-y-4 mt-4">
                      <NavItem icon={<Home className="w-5 h-5" />} text="Home" active />
                      <NavItem icon={<TrendingUp className="w-5 h-5" />} text="Services" />
                      <NavItem icon={<Activity className="w-5 h-5" />} text="Reports" />
                      <NavItem icon={<FileText className="w-5 h-5" />} text="Resources" />
                      <NavItem icon={<DollarSign className="w-5 h-5" />} text="Financials" />
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-2">
              <section className="mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Streamline Your Accounting Process</h2>
                <p className="text-gray-600 mb-6 sm:mb-8">
                  Discover how Onboard Accounting can help optimize your financial operations and drive your business forward.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <FeatureCard
                    icon={<BookOpen className="w-10 h-10 sm:w-12 sm:h-12" />}
                    title="Comprehensive Bookkeeping"
                    description="Access detailed financial records and reports to keep your business on track."
                  />
                  <FeatureCard
                    icon={<Users className="w-10 h-10 sm:w-12 sm:h-12" />}
                    title="Tax Planning & Preparation"
                    description="Expert guidance to optimize your tax strategy and ensure compliance."
                  />
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Optimize Your Financial Management</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <FeatureCard
                    icon={<Play className="w-8 h-8 sm:w-10 sm:h-10" />}
                    title="Financial Webinars"
                    description="Attend live Q&A sessions and webinars with accounting experts."
                    grey
                  />
                  <FeatureCard
                    icon={<BarChart2 className="w-8 h-8 sm:w-10 sm:h-10" />}
                    title="Performance Analytics"
                    description="Monitor and optimize your financial performance with our analytics tools."
                    grey
                  />
                  <FeatureCard
                    icon={<TrendingUp className="w-8 h-8 sm:w-10 sm:h-10" />}
                    title="Growth Strategies"
                    description="Evaluate and compare different financial strategies for your business growth."
                    grey
                  />
                </div>
              </section>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <section>
                <h2 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <HelpCard
                    title="Accounting Basics"
                    description="Learn the fundamentals of accounting for your business."
                  />
                  <HelpCard
                    title="Service Comparison"
                    description="Compare different accounting services side by side."
                  />
                  <HelpCard
                    title="Client Success Stories"
                    description="Read about businesses that have thrived with our services."
                  />
                </div>
              </section>

              <section className="bg-sky-50 p-4 sm:p-6 rounded-lg">
                <h2 className="text-lg sm:text-xl font-bold mb-4">Book a Consultation</h2>
                <p className="text-gray-600 text-sm mb-4">
                  Get personalized advice from our accounting experts to optimize your financial strategies.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Schedule Now <Calendar className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Book a Consultation</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>
                    <DialogFooter>
                      <Button onClick={() => console.log(selectedDate)} disabled={!selectedDate}>
                        Book Session
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </section>

              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-bold">Financial Dashboard</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor your financial health and track your business growth with our interactive dashboard.
                </p>
                <Button variant="outline" className="w-full justify-between">
                  View Your Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
