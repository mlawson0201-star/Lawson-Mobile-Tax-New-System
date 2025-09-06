
'use client'

import { IndustryLanding } from '@/components/industry-landing'
import { LiveChatWidget } from '@/components/live-chat-widget'
import { ExitIntentPopup, useExitIntent } from '@/components/exit-intent-popup'
import { UrgencyBanner } from '@/components/urgency-banner'

export default function BusinessPage() {
  const { showExitIntent, setShowExitIntent } = useExitIntent()

  return (
    <div>
      <UrgencyBanner />
      <IndustryLanding industryId="business" />
      <LiveChatWidget />
      <ExitIntentPopup 
        isVisible={showExitIntent} 
        onClose={() => setShowExitIntent(false)} 
      />
    </div>
  )
}
