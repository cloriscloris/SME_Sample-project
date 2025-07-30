"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

interface GmailConnectProps {
  onConnectionChange?: (connected: boolean) => void
}

export function GmailConnect({ onConnectionChange }: GmailConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleConnect = async () => {
    setIsConnecting(true)
    setError("")
    setMessage("")

    try {
      // 获取授权 URL
      const response = await fetch("/api/gmail/connect")
      const data = await response.json()

      if (response.ok) {
        // 在新窗口中打开 Google OAuth
        window.open(data.authUrl, "gmail-auth", "width=500,height=600")
        
        // 监听消息（在实际应用中，需要处理回调）
        setMessage("请在弹出窗口中完成 Gmail 授权")
      } else {
        setError(data.error || "获取授权链接失败")
      }
    } catch (err) {
      setError("网络错误，请稍后重试")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-900">
          <Mail className="w-5 h-5" />
          <span>连接 Gmail 账户</span>
        </CardTitle>
        <CardDescription className="text-blue-600">
          连接您的 Gmail 账户以自动检测发票邮件
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">已成功连接 Gmail 账户</span>
          </div>
        ) : (
          <Button 
            onClick={handleConnect} 
            disabled={isConnecting}
            className="w-full"
            variant="outline"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {isConnecting ? "连接中..." : "连接 Gmail 账户"}
          </Button>
        )}

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}

        {message && !error && (
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 text-sm">{message}</span>
          </div>
        )}

        <div className="pt-4 border-t border-blue-100">
          <h4 className="font-medium text-gray-900 mb-2">Gmail 集成功能:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 自动扫描发票邮件</li>
            <li>• 提取发票金额和日期</li>
            <li>• 与银行交易自动匹配</li>
            <li>• 安全的只读权限</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}