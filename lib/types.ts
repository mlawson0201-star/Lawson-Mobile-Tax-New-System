
import { User, Organization, Lead, Client, TaxReturn, Document, Task, Appointment } from '@prisma/client'

export interface ExtendedUser extends User {
  organization: Organization
}

export interface LeadWithRelations extends Lead {
  assignee?: User
  createdBy: User
  organization: Organization
  client?: Client
  tasks: Task[]
}

export interface ClientWithRelations extends Client {
  organization: Organization
  taxReturns: TaxReturn[]
  documents: Document[]
  appointments: Appointment[]
}

export interface TaxReturnWithRelations extends TaxReturn {
  client: Client
  preparer?: User
  documents: Document[]
  tasks: Task[]
}

export interface DashboardStats {
  totalLeads: number
  convertedLeads: number
  activeTaxReturns: number
  completedReturns: number
  totalRevenue: number
  monthlyGrowth: number
}

export interface OrganizationSettings {
  branding: {
    logo?: string
    primaryColor: string
    secondaryColor: string
  }
  features: {
    aiEnabled: boolean
    automationEnabled: boolean
    customFields: boolean
  }
  integrations: {
    stripe?: {
      enabled: boolean
      publicKey?: string
    }
    email?: {
      provider: string
      apiKey?: string
    }
  }
}
