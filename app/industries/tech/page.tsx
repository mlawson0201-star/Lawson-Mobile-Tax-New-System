
'use client'

import { IndustryLanding } from '@/components/industry-landing'
import { LiveChatWidget } from '@/components/live-chat-widget'
import { ExitIntentPopup, useExitIntent } from '@/components/exit-intent-popup'
import { UrgencyBanner } from '@/components/urgency-banner'

export default function TechPage() {
  const { showExitIntent, setShowExitIntent } = useExitIntent()

  return (
    <div>
      <UrgencyBanner />
      <IndustryLanding industryId="tech" />
      <LiveChatWidget />
      <ExitIntentPopup 
        isVisible={showExitIntent} 
        onClose={() => setShowExitIntent(false)} 
      />
    </div>
  )
}
