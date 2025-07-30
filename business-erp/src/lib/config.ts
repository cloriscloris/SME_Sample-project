export const config = {
  wise: {
    apiUrl: process.env.WISE_API_URL || "https://api.sandbox.transferwise.tech",
    token: process.env.WISE_API_TOKEN,
  },
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URI || "http://localhost:3000/api/auth/gmail/callback",
  },
  app: {
    name: "商务管理系统",
    version: "1.0.0",
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
}

export const transactionCategories = [
  { id: "income", name: "收入", color: "green" },
  { id: "salary", name: "工资", color: "blue" },
  { id: "freelance", name: "自由职业", color: "purple" },
  { id: "office", name: "办公用品", color: "orange" },
  { id: "software", name: "软件订阅", color: "red" },
  { id: "travel", name: "差旅费", color: "yellow" },
  { id: "marketing", name: "营销费用", color: "pink" },
  { id: "other", name: "其他", color: "gray" },
]