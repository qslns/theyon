'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'

interface SlotDebugContextType {
  isDebugMode: boolean
  hoveredSlotId: string | null
  setHoveredSlotId: (id: string | null) => void
}

const SlotDebugContext = createContext<SlotDebugContextType>({
  isDebugMode: false,
  hoveredSlotId: null,
  setHoveredSlotId: () => {},
})

export function SlotDebugProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const [isDebugMode, setIsDebugMode] = useState(false)
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null)

  useEffect(() => {
    // Check for ?debug=slots in URL
    const debugParam = searchParams.get('debug')
    setIsDebugMode(debugParam === 'slots')
  }, [searchParams])

  return (
    <SlotDebugContext.Provider value={{ isDebugMode, hoveredSlotId, setHoveredSlotId }}>
      {children}

      {/* Debug Mode Global Indicator */}
      {isDebugMode && (
        <div
          style={{
            position: 'fixed',
            top: '50px',
            right: '16px',
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.9)',
            color: '#00ff00',
            padding: '8px 16px',
            fontFamily: 'monospace',
            fontSize: '11px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ff00',
            animation: 'pulse 1.5s infinite',
          }} />
          SLOT DEBUG MODE
          <style jsx global>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}</style>
        </div>
      )}

      {/* Hovered slot info panel */}
      {isDebugMode && hoveredSlotId && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            zIndex: 99999,
            background: 'rgba(0, 0, 0, 0.95)',
            color: '#fff',
            padding: '16px 20px',
            fontFamily: 'monospace',
            fontSize: '12px',
            borderRadius: '8px',
            minWidth: '280px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ color: '#00ff00', marginBottom: '8px', fontSize: '10px', letterSpacing: '0.1em' }}>
            SELECTED SLOT
          </div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
            {hoveredSlotId}
          </div>
          <div style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '10px',
          }}>
            Use this ID in Sanity Studio to upload an image
          </div>
        </div>
      )}
    </SlotDebugContext.Provider>
  )
}

export function useSlotDebug() {
  return useContext(SlotDebugContext)
}
