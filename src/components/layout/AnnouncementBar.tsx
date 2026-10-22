import React from "react"

interface AnnouncementBarProps {
  message: string
  href?: string
}

export function AnnouncementBar({ message, href }: AnnouncementBarProps) {
  return (
    <div className="bg-primary/5 border-b border-primary/10 text-primary py-2 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        {href ? (
          <a href={href} className="underline underline-offset-2 hover:underline-opacity-50" target="_blank" rel="noreferrer">
            {message}
          </a>
        ) : (
          <span>{message}</span>
        )}
        <button
          type="button"
          className="ml-auto rounded border-primary text-primary text-sm px-3 py-1 hover:bg-primary/10 transition-colors"
          aria-label="Close announcement"
        >
          ✕
        </button>
      </div>
    </div>
  )
}