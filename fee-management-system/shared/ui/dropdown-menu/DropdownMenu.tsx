'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import Link from 'next/link'

interface DropdownMenuProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'left' | 'right'
}

interface DropdownMenuItemProps {
  onClick?: () => void
  href?: string
  children: ReactNode
  icon?: ReactNode
}

export function DropdownMenu({ trigger, children, align = 'right' }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`border-border bg-background absolute z-50 mt-2 w-56 rounded-md border shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="py-1" onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({ onClick, href, children, icon }: DropdownMenuItemProps) {
  const className =
    'flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors'

  const content = (
    <>
      {icon && <span className="h-4 w-4">{icon}</span>}
      {children}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  )
}

DropdownMenu.Item = DropdownMenuItem
