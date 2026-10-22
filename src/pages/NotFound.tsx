import React from "react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-error mb-2">Page Not Found</h1>
        <p className="text-lg text-muted-foreground">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="rounded border-primary px-4 py-2 text-sm font-medium hover:bg-primary/10 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.href="/"}
            className="rounded border-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/10 transition-colors mt-2"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  )
}
