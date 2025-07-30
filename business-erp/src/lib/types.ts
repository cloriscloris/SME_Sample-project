export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  date: Date
  category?: string
  source?: "wise" | "manual" | "gmail"
  wiseTransactionId?: string
  invoiceId?: string
}

export interface WiseAccount {
  id: string
  name: string
  currency: string
  balance: number
  type: string
}

export interface WiseTransaction {
  id: string
  amount: number
  currency: string
  date: string
  description: string
  type: string
  runningBalance: number
}

export interface Invoice {
  id: string
  from: string
  to: string
  amount: number
  currency: string
  date: Date
  dueDate?: Date
  items: InvoiceItem[]
  status: "draft" | "sent" | "paid" | "overdue"
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface GmailInvoice {
  messageId: string
  subject: string
  from: string
  date: Date
  attachments: string[]
  extractedData?: {
    amount?: number
    currency?: string
    vendor?: string
    invoiceNumber?: string
  }
}