"use client"

import React, { useState, useEffect } from "react"

interface GraphIconProps {
  progress: number
  size?: number
}

const GraphIcon: React.FC<GraphIconProps> = ({ 
  progress, 
  size = 300 
}) => {
  const barHeights = [60, 75, 45, 65, 85]
  const numBars = barHeights.length
  const radius = size / 2
  const strokeWidth = 12
  const circleRadius = radius - strokeWidth / 2
  const centerX = size * 0.6
  const centerY = size * 0.6
  
  const barWidth = (2 * circleRadius - 28) / numBars
  const barGap = 4
  const adjustedBarWidth = barWidth - barGap
  
  const visibleBars = Math.ceil((progress / 100) * numBars)
  const lineProgress = progress
  
  const innerCircleRadius = circleRadius - 20 // Even thicker inner circle

  const getBarCoordinates = (index: number, height: number) => {
    const x = centerX - circleRadius + 14 + index * barWidth
    const y = centerY + circleRadius - 10 - (height / 100) * (2 * circleRadius - 20)
    return { x, y }
  }

  const getLineCoordinates = (index: number, height: number) => {
    const { x, y } = getBarCoordinates(index, height)
    const progressFactor = index / (numBars - 1)
    const offsetX = progressFactor * 35
    const offsetY = Math.sin(progressFactor * Math.PI) * 15
    
    const leftExtension = index === 0 ? -15 : 0
    
    return { 
      x: x + adjustedBarWidth / 2 + offsetX + leftExtension, 
      y: y - offsetY 
    }
  }

  const linePoints = barHeights
    .slice(0, Math.ceil((lineProgress / 100) * numBars))
    .map((height, i) => {
      const { x, y } = getLineCoordinates(i, height)
      return `${x},${y}`
    })
    .join(" L")

  const linePath = linePoints ? "M" + linePoints : ""

  // Calculate arrow coordinates
  const lastIndex = Math.ceil((lineProgress / 100) * numBars) - 1
  const { x: x2, y: y2 } = getLineCoordinates(lastIndex, barHeights[lastIndex])

  const angle = lastIndex > 0 
    ? Math.atan2(
        y2 - getLineCoordinates(lastIndex - 1, barHeights[lastIndex - 1]).y,
        x2 - getLineCoordinates(lastIndex - 1, barHeights[lastIndex - 1]).x
      )
    : 0

  const arrowLength = 30
  const arrowWidth = 20

  const arrowPoint1 = {
    x: x2 - arrowLength * Math.cos(angle) + arrowWidth * Math.sin(angle),
    y: y2 - arrowLength * Math.sin(angle) - arrowWidth * Math.cos(angle)
  }
  const arrowPoint2 = {
    x: x2 - arrowLength * Math.cos(angle) - arrowWidth * Math.sin(angle),
    y: y2 - arrowLength * Math.sin(angle) + arrowWidth * Math.cos(angle)
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size * 1.2} ${size * 1.2}`}>
      <defs>
        <clipPath id="circleClip">
          <circle cx={centerX} cy={centerY} r={circleRadius} />
        </clipPath>
        <clipPath id="innerCircleClip">
          <circle cx={centerX} cy={centerY} r={innerCircleRadius} />
        </clipPath>
      </defs>
      
      {/* Circle background */}
      <circle
        cx={centerX}
        cy={centerY}
        r={circleRadius}
        fill="none"
        stroke="#1e293b"
        strokeWidth={strokeWidth}
        className="opacity-20"
      />
      
      {/* Animated progress circle */}
      <circle
        cx={centerX}
        cy={centerY}
        r={circleRadius}
        fill="none"
        stroke="#1e293b"
        strokeWidth={strokeWidth}
        strokeDasharray={`${(progress / 100) * (2 * Math.PI * circleRadius)} ${2 * Math.PI * circleRadius}`}
        strokeDashoffset={2 * Math.PI * circleRadius * 0.25}
        className="transition-all duration-1000 ease-in-out"
        transform={`rotate(-90 ${centerX} ${centerY})`}
      />
      
      <g clipPath="url(#circleClip)">
        <g clipPath="url(#innerCircleClip)">
          {barHeights.map((height, i) => {
            const { x, y } = getBarCoordinates(i, height)
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={adjustedBarWidth}
                height={(height / 100) * (2 * circleRadius - 20)}
                fill={i < visibleBars ? "#1e293b" : "transparent"}
                className="transition-all duration-300"
                style={{
                  opacity: i < visibleBars ? 1 : 0,
                  transform: `scaleY(${i < visibleBars ? 1 : 0})`,
                  transformOrigin: "bottom"
                }}
              />
            )
          })}
        </g>
      </g>
      
      {lineProgress > 0 && (
        <path
          d={linePath}
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 ease-in-out"
        />
      )}
      
      {lineProgress > 0 && (
        <polygon
          points={`${x2},${y2} ${arrowPoint1.x},${arrowPoint1.y} ${arrowPoint2.x},${arrowPoint2.y}`}
          fill="#0ea5e9"
          stroke="#0ea5e9"
          strokeWidth="4"
          className="transition-all duration-300 ease-in-out"
          style={{
            opacity: lineProgress / 100,
            transform: `translate(${25 * Math.cos(angle)}px, ${25 * Math.sin(angle)}px) scale(${lineProgress / 100})`
          }}
        />
      )}
    </svg>
  )
}

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const [graphProgress, setGraphProgress] = useState(0)
  const [isSliding, setIsSliding] = useState(false)

  const titleText = "Welcome to PassiveWealth"
  const subtitleText = "Your Journey to Financial Freedom Starts Here"
  const introText = "Ready to unlock the power of passive income? Our platform is designed for ambitious individuals who want to build wealth while reclaiming their time. Let's begin by exploring your financial aspirations and crafting your path to success!"

  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), 100)

    const graphInterval = setInterval(() => {
      setGraphProgress(prev => {
        if (prev < 100) {
          return prev + 1
        }
        clearInterval(graphInterval)
        return prev
      })
    }, 20)

    const slideTimer = setTimeout(() => {
      setIsSliding(true)
    }, 5000) // Increased delay to 5 seconds before sliding up

    return () => {
      clearTimeout(visibilityTimer)
      clearInterval(graphInterval)
      clearTimeout(slideTimer)
    }
  }, [])

  return (
    <div className={`fixed inset-0 bg-gradient-to-b from-sky-100 to-white flex items-center justify-center transition-all duration-2000 ease-in-out ${isSliding ? '-translate-y-full' : ''}`}>
      <div className={`max-w-2xl text-center transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 flex justify-center">
          <GraphIcon progress={graphProgress} size={300} />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-sky-600 transition-all duration-1000 ease-in-out delay-500">
          {titleText}
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-sky-500 transition-all duration-1000 ease-in-out delay-700">
          {subtitleText}
        </h2>
        <p className="text-xl mb-8 text-gray-700 transition-all duration-1000 ease-in-out delay-900">
          {introText}
        </p>
      </div>
    </div>
  )
}