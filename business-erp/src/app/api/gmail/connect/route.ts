import { NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"

export async function GET() {
  try {
    if (!config.gmail.clientId) {
      return NextResponse.json({ 
        error: "Gmail client ID not configured" 
      }, { status: 500 })
    }

    // 构建 OAuth 授权 URL
    const scope = "https://www.googleapis.com/auth/gmail.readonly"
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${config.gmail.clientId}&` +
      `redirect_uri=${encodeURIComponent(config.gmail.redirectUri!)}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`

    return NextResponse.json({ authUrl })
    
  } catch (error) {
    console.error("Gmail OAuth URL generation error:", error)
    return NextResponse.json({ 
      error: "Failed to generate authorization URL" 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 })
    }

    // 交换授权码获取访问令牌
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: config.gmail.clientId!,
        client_secret: config.gmail.clientSecret!,
        code,
        grant_type: "authorization_code",
        redirect_uri: config.gmail.redirectUri!
      })
    })

    if (!tokenResponse.ok) {
      return NextResponse.json({ 
        error: "Failed to exchange authorization code" 
      }, { status: 400 })
    }

    const tokens = await tokenResponse.json()
    
    // 这里应该将tokens安全保存到数据库
    // 现在只是返回成功状态
    
    return NextResponse.json({ 
      success: true,
      message: "Gmail 账户连接成功" 
    })
    
  } catch (error) {
    console.error("Gmail OAuth error:", error)
    return NextResponse.json({ 
      error: "Authentication failed" 
    }, { status: 500 })
  }
}