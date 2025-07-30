import { NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"
import { WiseTransaction } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get("profileId")
    const accountId = searchParams.get("accountId")
    
    if (!config.wise.token) {
      return NextResponse.json({ 
        error: "Wise API token not configured" 
      }, { status: 401 })
    }

    if (!profileId || !accountId) {
      return NextResponse.json({ 
        error: "Profile ID and Account ID are required" 
      }, { status: 400 })
    }

    // 获取交易记录
    const response = await fetch(
      `${config.wise.apiUrl}/v1/profiles/${profileId}/balances/${accountId}/statement?range=2024-01-01T00:00:00.000Z,2024-12-31T23:59:59.999Z`,
      {
        headers: {
          "Authorization": `Bearer ${config.wise.token}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (!response.ok) {
      return NextResponse.json({ 
        error: "Failed to fetch transactions from Wise" 
      }, { status: response.status })
    }

    const data = await response.json()
    
    // 转换为我们的格式
    const transactions: WiseTransaction[] = data.transactions?.map((t: any) => ({
      id: t.referenceNumber,
      amount: t.amount.value,
      currency: t.amount.currency,
      date: t.date,
      description: t.description,
      type: t.amount.value > 0 ? "credit" : "debit",
      runningBalance: t.runningBalance.value
    })) || []

    return NextResponse.json({ 
      transactions,
      account: {
        currency: data.accountHolder?.currency,
        name: data.accountHolder?.name
      }
    })
    
  } catch (error) {
    console.error("Wise transactions error:", error)
    return NextResponse.json({ 
      error: "Failed to fetch transactions" 
    }, { status: 500 })
  }
}