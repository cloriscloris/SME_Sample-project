import { WiseConnect } from "@/components/wise-connect"
import { GmailConnect } from "@/components/gmail-connect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 顶部导航 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-blue-900 flex items-center">
                <SettingsIcon className="w-6 h-6 mr-2" />
                系统设置
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 页面标题 */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-blue-900">账户集成设置</h2>
            <p className="text-blue-600">
              连接您的 Wise 和 Gmail 账户以实现自动化财务管理
            </p>
          </div>

          {/* 连接状态概览 */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">集成状态概览</CardTitle>
              <CardDescription className="text-blue-600">
                查看当前已连接的服务状态
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="font-medium">Wise 银行账户</span>
                  </div>
                  <span className="text-sm text-gray-500">未连接</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="font-medium">Gmail 邮箱</span>
                  </div>
                  <span className="text-sm text-gray-500">未连接</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 连接组件 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WiseConnect />
            <GmailConnect />
          </div>

          {/* 其他设置 */}
          <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">其他设置</CardTitle>
              <CardDescription className="text-blue-600">
                系统配置和偏好设置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50/50">
                <div>
                  <h4 className="font-medium text-gray-900">默认货币</h4>
                  <p className="text-sm text-gray-500">设置系统默认显示货币</p>
                </div>
                <select className="px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="USD">美元 (USD)</option>
                  <option value="EUR">欧元 (EUR)</option>
                  <option value="GBP">英镑 (GBP)</option>
                  <option value="CNY">人民币 (CNY)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50/50">
                <div>
                  <h4 className="font-medium text-gray-900">自动分类</h4>
                  <p className="text-sm text-gray-500">是否启用交易自动分类功能</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50/50">
                <div>
                  <h4 className="font-medium text-gray-900">邮件通知</h4>
                  <p className="text-sm text-gray-500">接收重要财务事件的邮件通知</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}