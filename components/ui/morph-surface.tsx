"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

type SpringConfig = {
  type: "spring"
  stiffness: number
  damping: number
  mass?: number
  delay?: number
}

const SPEED = 1
const FEEDBACK_WIDTH = 360
const FEEDBACK_HEIGHT = 200

// Props interfaces
interface TriggerProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

interface ContentProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormData) => void | Promise<void>
  className?: string
}

interface IndicatorProps {
  success: boolean
  isOpen: boolean
  className?: string
}

interface MorphSurfaceProps {
  // Dimensions
  collapsedWidth?: number | "auto"
  collapsedHeight?: number
  expandedWidth?: number | string
  expandedHeight?: number | string

  // Animation
  animationSpeed?: number
  springConfig?: SpringConfig

  // Content
  triggerLabel?: string
  triggerIcon?: React.ReactNode
  placeholder?: string
  submitLabel?: string

  // Callbacks
  onSubmit?: (data: FormData) => void | Promise<void>
  onOpen?: () => void
  onClose?: () => void
  onSuccess?: () => void

  // Controlled state
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void

  // Styles
  className?: string
  triggerClassName?: string
  contentClassName?: string

  // Render props
  renderTrigger?: (props: TriggerProps) => React.ReactNode
  renderContent?: (props: ContentProps) => React.ReactNode
  renderIndicator?: (props: IndicatorProps) => React.ReactNode
}

interface MorphSurfaceContextValue {
  showFeedback: boolean
  success: boolean
  openFeedback: () => void
  closeFeedback: () => void
  // Configurable props
  triggerLabel: string
  triggerIcon?: React.ReactNode
  placeholder: string
  submitLabel: string
  onSubmit?: (data: FormData) => void | Promise<void>
  onOpen?: () => void
  onClose?: () => void
  onSuccess?: () => void
  triggerClassName?: string
  contentClassName?: string
  renderTrigger?: (props: TriggerProps) => React.ReactNode
  renderContent?: (props: ContentProps) => React.ReactNode
  renderIndicator?: (props: IndicatorProps) => React.ReactNode
  animationSpeed: number
  springConfig?: SpringConfig
  expandedWidth: number | string
  expandedHeight: number | string
}

const MorphSurfaceContext = createContext<MorphSurfaceContextValue>(
  {} as MorphSurfaceContextValue
)

const useMorphSurface = () => useContext(MorphSurfaceContext)

// Internal hook logic
function useMorphSurfaceLogic({
  isOpen: controlledIsOpen,
  onOpenChange,
  expandedWidth = FEEDBACK_WIDTH,
  expandedHeight = FEEDBACK_HEIGHT,
  collapsedHeight = 44,
  animationSpeed = SPEED,
}: {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  expandedWidth?: number | string
  expandedHeight?: number | string
  collapsedHeight?: number
  animationSpeed?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const showFeedback = isOpen

  function closeFeedback() {
    if (controlledIsOpen !== undefined) {
      onOpenChange?.(false)
    } else {
      setInternalIsOpen(false)
    }
    inputRef.current?.blur()
  }

  function openFeedback() {
    if (controlledIsOpen !== undefined) {
      onOpenChange?.(true)
    } else {
      setInternalIsOpen((prev) => !prev)
    }
    if (!showFeedback) {
      setTimeout(() => {
        inputRef.current?.focus()
      })
    }
  }

  function setSuccessState(value: boolean) {
    setSuccess(value)
  }

  useClickOutside(containerRef, closeFeedback)

  return {
    containerRef,
    inputRef,
    showFeedback,
    success,
    openFeedback,
    closeFeedback,
    setSuccess: setSuccessState,
    expandedWidth,
    expandedHeight,
    collapsedHeight,
    animationSpeed,
  }
}

// Root component
export function MorphSurface({
  collapsedWidth = FEEDBACK_WIDTH,
  collapsedHeight = 44,
  expandedWidth = FEEDBACK_WIDTH,
  expandedHeight = FEEDBACK_HEIGHT,
  animationSpeed = SPEED,
  springConfig,
  triggerLabel = "Feedback",
  triggerIcon,
  placeholder = "What's on your mind?",
  submitLabel,
  onSubmit,
  onOpen,
  onClose,
  onSuccess,
  isOpen: controlledIsOpen,
  onOpenChange,
  className,
  triggerClassName,
  contentClassName,
  renderTrigger,
  renderContent,
  renderIndicator,
}: MorphSurfaceProps = {}) {
  const hookLogic = useMorphSurfaceLogic({
    isOpen: controlledIsOpen,
    onOpenChange,
    expandedWidth,
    expandedHeight,
    collapsedHeight,
    animationSpeed,
  })

  const {
    containerRef,
    inputRef,
    showFeedback,
    success,
    openFeedback,
    closeFeedback,
    setSuccess,
    expandedWidth: hookExpandedWidth,
    expandedHeight: hookExpandedHeight,
    collapsedHeight: hookCollapsedHeight,
  } = hookLogic

  function onFeedbackSuccess() {
    closeFeedback()
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, 1500)
    onSuccess?.()
  }

  const context = useMemo(
    () => ({
      showFeedback,
      success,
      openFeedback: () => {
        openFeedback()
        onOpen?.()
      },
      closeFeedback: () => {
        closeFeedback()
        onClose?.()
      },
      triggerLabel,
      triggerIcon,
      placeholder,
      submitLabel: submitLabel || "⌘ Enter",
      onSubmit,
      onOpen,
      onClose,
      onSuccess,
      triggerClassName,
      contentClassName,
      renderTrigger,
      renderContent,
      renderIndicator,
      animationSpeed,
      springConfig,
      expandedWidth: hookExpandedWidth,
      expandedHeight: hookExpandedHeight,
    }),
    [
      showFeedback,
      success,
      openFeedback,
      closeFeedback,
      triggerLabel,
      triggerIcon,
      placeholder,
      submitLabel,
      onSubmit,
      onOpen,
      onClose,
      onSuccess,
      triggerClassName,
      contentClassName,
      renderTrigger,
      renderContent,
      renderIndicator,
      animationSpeed,
      springConfig,
      hookExpandedWidth,
      hookExpandedHeight,
    ]
  )

  return (
    <div
      className={cn("flex justify-center items-end", className)}
    >
      <motion.div
        ref={containerRef}
        onClick={() => {
          if (!showFeedback) {
            openFeedback()
          }
        }}
        className={cn(
          "relative flex flex-col items-center z-10 overflow-hidden",
          "bg-white",
          "shadow-xl",
          !showFeedback &&
            "cursor-pointer hover:brightness-105 transition-[filter] duration-200"
        )}
        initial={false}
        animate={{
          width: showFeedback ? hookExpandedWidth : collapsedWidth,
          height: showFeedback ? hookExpandedHeight : hookCollapsedHeight,
          borderRadius: showFeedback ? 24 : 50, // Updated radius
        }}
        transition={
          springConfig || {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }
        }
      >
        <MorphSurfaceContext.Provider value={context}>
          <MorphSurfaceDock />
          <MorphSurfaceFeedback ref={inputRef} onSuccess={onFeedbackSuccess} />
        </MorphSurfaceContext.Provider>
      </motion.div>
    </div>
  )
}

// Dock component
function MorphSurfaceDock() {
  const {
    success,
    showFeedback,
    openFeedback,
    triggerLabel,
    triggerIcon,
    triggerClassName,
    renderTrigger,
    renderIndicator,
    animationSpeed,
    springConfig,
  } = useMorphSurface()

  const logoSpring = springConfig || {
    type: "spring" as const,
    stiffness: 350 / animationSpeed,
    damping: 35,
  }

  const checkSpring = {
    type: "spring" as const,
    stiffness: 500 / animationSpeed,
    damping: 22,
  }

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    openFeedback()
  }

  const defaultIndicator = (
    <>
      {showFeedback ? (
        <div className="w-5 h-5" style={{ opacity: 0 }} />
      ) : (
        <motion.div
          className="w-5 h-5 bg-primary rounded-full"
          layoutId={`morph-surface-dot-${triggerLabel}`}
          transition={logoSpring}
        >
          <AnimatePresence>
            {success && (
              <motion.div
                key="check"
                exit={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{
                  ...checkSpring,
                  delay: success ? 0.3 : 0,
                }}
                className="m-[2px]"
              >
                <IconCheck />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  )

  const defaultTrigger = (
    <button
      type="button"
      className={cn(
        "m-[-8px] flex justify-end rounded-full p-2 flex-1 gap-1",
        "text-muted-foreground hover:text-foreground",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        triggerClassName
      )}
      onClick={handleTriggerClick}
    >
      {triggerIcon && <span className="flex items-center">{triggerIcon}</span>}
      <span className="ml-1 max-w-[20ch] truncate">{triggerLabel}</span>
    </button>
  )

  const indicatorElement = renderIndicator
    ? renderIndicator({
        success,
        isOpen: showFeedback,
      })
    : defaultIndicator

  const triggerElement = renderTrigger
    ? renderTrigger({
        isOpen: showFeedback,
        onClick: () => openFeedback(),
        className: triggerClassName,
      })
    : defaultTrigger

  return (
    <div className={cn(
        "flex items-center justify-center select-none whitespace-nowrap mt-auto w-full",
        showFeedback ? "h-0 opacity-0 overflow-hidden" : "h-full opacity-100"
    )}>
      {triggerElement}
    </div>
  )
}

// Feedback component
const MorphSurfaceFeedback = React.forwardRef<
  HTMLTextAreaElement,
  { onSuccess: () => void }
>(({ onSuccess }, ref) => {
  const {
    closeFeedback,
    showFeedback,
    placeholder,
    onSubmit,
    contentClassName,
    renderContent,
    expandedWidth,
    expandedHeight,
    animationSpeed,
    triggerLabel,
  } = useMorphSurface()
  const submitRef = React.useRef<HTMLButtonElement>(null)

  const contentSpring = {
    type: "spring" as const,
    stiffness: 550 / animationSpeed,
    damping: 45,
    mass: 0.7,
  }

  const logoSpring = {
    type: "spring" as const,
    stiffness: 350 / animationSpeed,
    damping: 35,
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (onSubmit) {
      try {
        await onSubmit(formData)
        onSuccess()
      } catch (error) {
        console.error("Form submission error:", error)
      }
    } else {
      onSuccess()
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Escape") {
      closeFeedback()
    }
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault()
      submitRef.current?.click()
    }
  }

  const defaultContent = (
    <>
      <div className="flex justify-between py-1">
        <p className="flex gap-[6px] text-sm items-center text-muted-foreground select-none z-[2] ml-[25px]">
          Feedback
        </p>
        <button
          type="submit"
          ref={submitRef}
          className={cn(
            "mt-1 flex items-center justify-center gap-1 text-sm -translate-y-[3px]",
            "text-muted-foreground right-4 text-center bg-transparent select-none",
            "rounded-xl cursor-pointer pr-1",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <Kbd>⌘</Kbd>
          <Kbd className="w-fit">Enter</Kbd>
        </button>
      </div>
      <textarea
        ref={ref}
        placeholder={placeholder}
        name="message"
        className={cn(
          "resize-none w-full h-full scroll-py-2 text-base outline-none p-4",
          "bg-muted dark:bg-accent rounded-xl",
          "caret-primary",
          "placeholder:text-muted-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"
        )}
        required
        onKeyDown={onKeyDown}
        spellCheck={false}
      />
    </>
  )

  const handleContentSubmit = async (data: FormData) => {
    if (onSubmit) {
      try {
        await onSubmit(data)
        onSuccess()
      } catch (error) {
        console.error("Form submission error:", error)
      }
    } else {
      onSuccess()
    }
  }

  const contentElement = renderContent
    ? renderContent({
        isOpen: showFeedback,
        onClose: closeFeedback,
        onSubmit: handleContentSubmit,
        className: contentClassName,
      })
    : defaultContent

  const isHeightAuto = expandedHeight === "auto"

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        isHeightAuto ? "relative w-full" : "absolute inset-0 overflow-hidden",
        contentClassName
      )}
      style={{
        pointerEvents: showFeedback ? "all" : "none",
        height: isHeightAuto ? "auto" : "100%",
      }}
    >
      <AnimatePresence mode="wait">
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {contentElement}
          </motion.div>
        )}
      </AnimatePresence>
      {showFeedback && !renderContent && (
        <motion.div
          layoutId={`morph-surface-dot-${triggerLabel}`}
          className="w-2 h-2 bg-primary rounded-full absolute top-[18.5px] left-4"
          transition={logoSpring}
        />
      )}
    </form>
  )
})

MorphSurfaceFeedback.displayName = "MorphSurfaceFeedback"

// Utility components
function IconCheck() {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="white"
    >
      <title>Icon Check</title>
      <path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Kbd({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <kbd
      className={cn(
        "w-6 h-6 bg-muted text-muted-foreground rounded flex items-center justify-center font-sans px-[6px] text-xs",
        className
      )}
    >
      {children}
    </kbd>
  )
}

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
