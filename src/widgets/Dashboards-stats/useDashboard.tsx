import { useState, useEffect } from 'react'
import { supabase } from '@/src/shared/utils/supabase'
import { DashboardTypes } from '../../shared/types/types'

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardTypes>({
    myCards: 0,
    doneCards: 0,
    activeCards: 0,
    progress: 0
  })
  const [kpi, setKpi] = useState({ revenue: 0, activeCount: 0, avgTicket: 0 })
  const [funnel, setFunnel] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

useEffect(()=>{
const fetchData= async()=>{
  const {data:deals}= await supabase
.from('deals')
.select('*')
if(!deals)return
const wonDeals=deals.filter(d=>d.stage=='closed_won')
const revenueDeals=wonDeals.reduce((sum,d)=>sum +d.amount,0)
const activeDeals=deals.filter(d =>!['closed_won','closed_lost'].includes(d.stage))

setKpi({
  revenue:revenueDeals,
  activeCount:activeDeals.length,
  avgTicket: wonDeals.length >0?revenueDeals/ wonDeals.length :0
})
const stagesOrder = ['lead', 'negotiation', 'proposal', 'closed_won']
const funnelDate=stagesOrder.map(stage=>({
  name:stage,
  value:deals.filter(d=>d.stage===stage).length,
  amount:deals.filter(d=>d.stage===stage).reduce((sum,d)=>sum+d.amount,0)
}))
setFunnel(funnelDate)
  setLoading(false)

}
fetchData()


},[])















  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) return

        const { data: leads, error } = await supabase
          .from('leads')
          .select('status')
          .eq('user_id', user.id)

        if (error) throw error

        const total = leads?.length || 0
        const done = leads?.filter(l => l.status?.toLowerCase() === 'done').length || 0
        const active = total - done

        setMetrics({
          myCards: total,
          doneCards: done,
          activeCards: active,
          progress: total > 0 ? Math.round((done / total) * 100) : 0
        })
      } catch (err) {
        console.error('Dashboard Hook Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  return { metrics, loading ,kpi, funnel,}
}