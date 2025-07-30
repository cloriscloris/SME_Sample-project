"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react"

interface WiseConnectProps {
  onConnectionChange?: (connected: boolean) => void
}

export function WiseConnect({ onConnectionChange }: WiseConnectProps) {
  const [token, setToken] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleConnect = async () => {
    if (!token.trim()) {
      setError("请输入 Wise API Token")
      return
    }

    setIsConnecting(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/wise/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsConnected(true)
        setMessage(data.message)
        setToken("")
        onConnectionChange?.(true)
      } else {
        setError(data.error || "连接失败")
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
          <CreditCard className="w-5 h-5" />
          <span>连接 Wise 账户</span>
        </CardTitle>
        <CardDescription className="text-blue-600">
          连接您的 Wise 账户以自动同步交易记录
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">已成功连接 Wise 账户</span>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label htmlFor="wise-token" className="text-sm font-medium text-gray-700">
                Wise API Token
              </label>
              <input
                id="wise-token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="输入您的 Wise API Token"
                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500">
                您可以在 Wise 开发者控制台中获取 API Token
              </p>
            </div>

            <Button 
              onClick={handleConnect} 
              disabled={isConnecting || !token.trim()}
              className="w-full"
            >
              {isConnecting ? "连接中..." : "连接 Wise 账户"}
            </Button>
          </>
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
          <h4 className="font-medium text-gray-900 mb-2">如何获取 Wise API Token:</h4>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. 登录 Wise 开发者控制台</li>
            <li>2. 创建新的应用程序</li>
            <li>3. 生成 API Token</li>
            <li>4. 将 Token 粘贴到上方输入框</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}