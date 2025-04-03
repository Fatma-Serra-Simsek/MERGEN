'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Pasta grafik için veri
const pieData = [
  { name: 'Tamamlanan', value: 15, color: '#10b981' },
  { name: 'Bekleyen', value: 8, color: '#6b7280' },
  { name: 'Ertelenen', value: 3, color: '#f59e0b' },
]

// Çizgi grafik için veri
const barData = [
  { gün: 'Pts', tamamlanan: 6, hedef: 10 },
  { gün: 'Sal', tamamlanan: 8, hedef: 10 },
  { gün: 'Çar', tamamlanan: 9, hedef: 10 },
  { gün: 'Per', tamamlanan: 7, hedef: 10 },
  { gün: 'Cum', tamamlanan: 5, hedef: 10 },
  { gün: 'Cmt', tamamlanan: 3, hedef: 5 },
  { gün: 'Paz', tamamlanan: 2, hedef: 5 },
]

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Görev Dağılımı</CardTitle>
          <CardDescription>Görevlerin durumuna göre dağılımı</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]} 
                  labelFormatter={() => ''} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Haftalık İlerleme</CardTitle>
          <CardDescription>Haftanın her günü için tamamlanan görevler</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gün" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tamamlanan" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hedef" fill="#d1d5db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { StatsCards } 