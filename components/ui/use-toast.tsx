"use client"

// Simplified version of the toast hook
import { useState } from "react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default" }) => {
    // In a real implementation, this would display a toast notification
    // For this demo, we'll just log to console
    console.log(`Toast: ${title} - ${description} (${variant})`)

    // You could implement a real toast system here
    alert(`${title}\n${description}`)
  }

  return {
    toast,
    toasts,
    dismiss: (id) => {},
  }
}

