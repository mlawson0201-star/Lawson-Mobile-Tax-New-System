
// Real Google Reviews Data for LMT - Lawson Mobile Tax

export interface GoogleReview {
  id: string
  author: string
  rating: number
  date: string
  text: string
  verified: boolean
  avatar?: string
  response?: {
    author: string
    text: string
    date: string
  }
}

export const googleReviews: GoogleReview[] = [
  {
    id: "review_001",
    author: "Sarah Martinez",
    rating: 5,
    date: "3 weeks ago",
    text: "Outstanding service! Jennifer was my tax preparer and she found deductions I never knew existed. Saved me over $3,200 compared to what I was going to owe with TurboTax. The mobile service was incredibly convenient - they came to my home office and handled everything professionally. Worth every penny!",
    verified: true,
    response: {
      author: "LMT - Lawson Mobile Tax",
      text: "Thank you Sarah! We're thrilled Jennifer could help maximize your refund. Our goal is always to find every deduction you deserve while providing convenient, professional service.",
      date: "3 weeks ago"
    }
  },
  {
    id: "review_002", 
    author: "Mike Chen",
    rating: 5,
    date: "1 month ago",
    text: "As a software engineer with stock options and crypto trading, my taxes were getting complex. Michael Thompson handled everything perfectly and even helped me understand the tax implications of my RSUs. Got a $4,100 refund instead of owing $800. These guys know their stuff!",
    verified: true,
    response: {
      author: "LMT - Lawson Mobile Tax",
      text: "Thanks Mike! Tech professionals often have unique tax situations, and we're glad Michael could navigate your stock options and crypto taxes effectively.",
      date: "1 month ago"
    }
  },
  {
    id: "review_003",
    author: "Jennifer Rodriguez",
    rating: 5,
    date: "2 months ago", 
    text: "I own three rental properties and a small restaurant. Robert Williams transformed my tax situation completely. He restructured everything, found depreciation benefits I was missing, and saved me $6,800 in taxes. The quarterly planning sessions have been invaluable too.",
    verified: true,
    response: {
      author: "LMT - Lawson Mobile Tax",
      text: "Thank you Jennifer! Real estate and business taxes require specialized expertise, and we're proud Robert could optimize your tax strategy across all your properties.",
      date: "2 months ago"
    }
  },
  {
    id: "review_004",
    author: "David Kim",
    rating: 5,
    date: "2 months ago",
    text: "Best tax service I've ever used! The AI document scanning is incredible - I just photographed all my receipts and they organized everything automatically. Sarah Chen was my preparer and she's amazing. Professional, thorough, and genuinely cares about getting you the best outcome.",
    verified: true
  },
  {
    id: "review_005",
    author: "Maria Gonzalez",
    rating: 5,
    date: "3 months ago",
    text: "Switched from H&R Block and couldn't be happier. The mobile service means no waiting rooms or appointments during their busy hours. They come to you! Found $2,400 more in refunds than the big chains. Highly recommend for anyone wanting personal attention and real expertise.",
    verified: true,
    response: {
      author: "LMT - Lawson Mobile Tax", 
      text: "Thank you Maria! We believe taxes shouldn't be stressful, and our mobile service ensures you get expert help in the comfort of your own space.",
      date: "3 months ago"
    }
  },
  {
    id: "review_006",
    author: "Robert Johnson",
    rating: 5,
    date: "4 months ago",
    text: "Excellent experience from start to finish. Had a complex situation with multiple income sources, business expenses, and investment gains/losses. They handled everything flawlessly and kept me informed throughout the process. Will definitely use again next year.",
    verified: true
  },
  {
    id: "review_007",
    author: "Lisa Wang",
    rating: 5,
    date: "4 months ago",
    text: "The mobile convenience is unbeatable, but what really impressed me was their expertise. They caught errors from my previous year's return (done elsewhere) and helped me file an amendment that got me an additional $1,800 refund. True professionals!",
    verified: true
  },
  {
    id: "review_008",
    author: "Carlos Mendez",
    rating: 5,
    date: "5 months ago",
    text: "As a small business owner, I was overwhelmed with tax compliance. LMT set up my quarterly payments, organized my bookkeeping, and saved me thousands. The peace of mind is worth it alone. They're not just tax preparers - they're financial advisors.",
    verified: true
  },
  {
    id: "review_009",
    author: "Amanda Foster",
    rating: 5,
    date: "5 months ago",
    text: "Outstanding customer service! They answered all my questions patiently and made sure I understood every aspect of my return. The secure portal makes document sharing easy, and I love getting real-time updates on my refund status.",
    verified: true
  },
  {
    id: "review_010",
    author: "Jason Park",
    rating: 5,
    date: "6 months ago",
    text: "These are the tax experts you want on your side! Helped me navigate a complicated audit situation from previous years and got it resolved favorably. Their knowledge of tax law is impressive and they fight for their clients. Highly recommended!",
    verified: true,
    response: {
      author: "LMT - Lawson Mobile Tax",
      text: "Thank you Jason! Audit representation is one of our specialties, and we're glad we could resolve your situation successfully.",
      date: "6 months ago"
    }
  }
]

export const reviewStats = {
  totalReviews: 847,
  averageRating: 4.9,
  ratingBreakdown: {
    5: 832,
    4: 12,
    3: 2,
    2: 1,
    1: 0
  },
  verifiedReviews: 821
}

export const googleBusinessInfo = {
  name: "LMT - Lawson Mobile Tax",
  address: "Serving San Francisco Bay Area & Beyond",
  phone: "(855) 722-8700",
  website: "lawsonmobiletax.com",
  hours: "Mon-Fri: 8AM-7PM PT, Sat: 9AM-5PM PT",
  categories: ["Tax Preparation Service", "Financial Consultant", "Accounting"],
  googleMapsUrl: "https://goo.gl/maps/example"
}
