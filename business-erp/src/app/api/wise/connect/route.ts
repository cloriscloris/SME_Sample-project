import { NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json({ error: "API token is required" }, { status: 400 })
    }

    // 测试 Wise API 连接
    const response = await fetch(`${config.wise.apiUrl}/v1/profiles`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      return NextResponse.json({ 
        error: "Invalid Wise API token or connection failed" 
      }, { status: 401 })
    }

    const profiles = await response.json()
    
    // 这里应该将token保存到安全的地方（数据库或加密存储）
    // 现在只是简单返回成功状态
    
    return NextResponse.json({ 
      success: true, 
      profiles,
      message: "Wise 账户连接成功" 
    })
    
  } catch (error) {
    console.error("Wise connection error:", error)
    return NextResponse.json({ 
      error: "Connection failed" 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // 检查是否已经连接
    // 这里应该从数据库或存储中检查token状态
    const isConnected = !!config.wise.token
    
    return NextResponse.json({ 
      connected: isConnected,
      status: isConnected ? "已连接" : "未连接"
    })
    
  } catch (error) {
    console.error("Check Wise connection error:", error)
    return NextResponse.json({ 
      error: "Failed to check connection status" 
    }, { status: 500 })
  }
}