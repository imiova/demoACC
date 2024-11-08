"use client"

import React, { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import IntroPage from "@/components/intro-page"

const fontUrl = "https://use.typekit.net/gcd4kuc.css";

const funnelData = {
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      sentence: "What's your primary goal for joining our passive income community?",
      options: [
        "Learn strategies to generate passive income",
        "Connect with like-minded individuals",
        "Access expert insights and resources",
        "Find accountability partners for my financial journey",
        "Other"
      ],
      correctAnswer: null // User input will vary
    },
    {
      id: 2,
      type: "multiple-choice",
      sentence: "What's your biggest challenge in creating passive income streams?",
      options: [
        "Lack of knowledge about available options",
        "Limited time to research and implement strategies",
        "Difficulty in choosing the right opportunities",
        "Fear of financial risks",
        "Other"
      ],
      correctAnswer: null // User input will vary
    },
    {
      id: 3,
      type: "multiple-choice",
      sentence: "Which feature of our platform would you find most valuable?",
      options: [
        "Step-by-step guides on various passive income methods",
        "Community forums to share experiences and ask questions",
        "Expert webinars and Q&A sessions",
        "Tools to track and optimize your passive income streams",
        "Other"
      ],
      correctAnswer: null
    }
  ]
}

export default function GetStarted() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(funnelData.questions.length).fill(null))
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const currentQuestion = funnelData.questions[currentQuestionIndex]
  const totalQuestions = funnelData.questions.length

  useEffect(() => {
    const link = document.createElement("link")
    link.href = fontUrl
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Show intro for a few seconds before starting the quiz
    const timer = setTimeout(() => {
      setShowIntro(false)
      setIsVisible(true)
    }, 3000) // Show intro for 3 seconds

    return () => {
      document.head.removeChild(link)
      clearTimeout(timer)
    }
  }, [])

  const handleAnswerChange = (value: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = value
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleFinish()
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      router.push('/')
    }
  }

  const handleFinish = () => {
    console.log("Quiz finished. Selected answers:", selectedAnswers)
    // Navigate to the dashboard page
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: 'circe, sans-serif' }}>
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        {showIntro ? (
          <IntroPage />
        ) : (
          <Card className={`w-full max-w-2xl bg-white-100 bg-opacity-60 border-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <CardContent className="p-6 bg-transparent">
              <div className="flex flex-col items-center justify-center">
                <div className="w-full space-y-6">
                  <h2 className="text-2xl font-semibold mb-6 text-center">{currentQuestion.sentence}</h2>
                  <RadioGroup
                    value={selectedAnswers[currentQuestionIndex] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-4"
                  >
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option}
                        className={`relative flex items-center p-5 rounded-lg
                          ${
                            selectedAnswers[currentQuestionIndex] === option
                              ? "bg-sky-100 border-2 border-sky-500"
                              : "bg-transparent border border-gray-300 hover:border-sky-500 hover:bg-sky-50"
                          }`}
                      >
                        <RadioGroupItem value={option} id={option} className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <Label
                          htmlFor={option}
                          className="pl-8 cursor-pointer flex-grow text-base font-medium text-lg"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <div className="flex justify-between mt-6">
                    <Button
                      onClick={handleBack}
                      className="px-6 py-2 text-xl rounded-full bg-transparent border border-gray-300 hover:bg-transparent hover:border-gray-500 text-gray-900 transition duration-300 ease-in-out"
                    >
                      ← Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="px-6 py-2 text-xl rounded-full bg-transparent border border-gray-300 hover:bg-transparent hover:border-sky-500 hover:bg-sky-50 text-gray-900 transition duration-300 ease-in-out"
                    >
                      {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next →"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}