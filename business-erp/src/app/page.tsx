import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import { 
  CreditCard, 
  DollarSign, 
  Mail, 
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Settings
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  // 模拟数据
  const transactions = [
    { id: 1, description: "客户付款 - 项目 A", amount: 5000, type: "income", date: new Date(2024, 0, 15) },
    { id: 2, description: "办公用品采购", amount: -250, type: "expense", date: new Date(2024, 0, 14) },
    { id: 3, description: "服务费收入", amount: 1200, type: "income", date: new Date(2024, 0, 13) },
    { id: 4, description: "软件订阅", amount: -99, type: "expense", date: new Date(2024, 0, 12) },
  ]

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))
  const balance = totalIncome - totalExpense

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">商务管理</h1>
              <div className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-blue-700">
                  概览
                </Button>
                <Button variant="ghost" className="text-blue-700">
                  交易
                </Button>
                <Button variant="ghost" className="text-blue-700">
                  发票
                </Button>
                <Button variant="ghost" className="text-blue-700">
                  报告
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                同步邮箱
              </Button>
              <Button size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                新建交易
              </Button>
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                总余额
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {formatCurrency(balance)}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% 本月
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                总收入
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {formatCurrency(totalIncome)}
              </div>
              <p className="text-xs text-green-600 mt-1">
                +8% 本月
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                总支出
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">
                {formatCurrency(totalExpense)}
              </div>
              <p className="text-xs text-red-600 mt-1">
                -5% 本月
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 最近交易 */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">最近交易</CardTitle>
              <CardDescription className="text-blue-600">
                您最近的收支记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.type === "income" ? "bg-green-500" : "bg-red-500"
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}{formatCurrency(Math.abs(transaction.amount))}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                查看所有交易
              </Button>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">快速操作</CardTitle>
              <CardDescription className="text-blue-600">
                常用功能入口
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <CreditCard className="w-6 h-6" />
                  <span className="text-sm">连接 Wise</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Mail className="w-6 h-6" />
                  <span className="text-sm">同步 Gmail</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <PlusCircle className="w-6 h-6" />
                  <span className="text-sm">手动记账</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-sm">查看报告</span>
                </Button>
              </div>

              {/* 状态指示器 */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium">Wise 账户</span>
                  </div>
                  <span className="text-xs text-gray-500">未连接</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium">Gmail 同步</span>
                  </div>
                  <span className="text-xs text-gray-500">未连接</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
