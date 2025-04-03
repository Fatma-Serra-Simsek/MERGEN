'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  PlusCircle, 
  RefreshCw, 
  Star, 
  Target, 
  TrendingUp, 
  User
} from 'lucide-react'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { StatsCards } from '@/components/dashboard/stats'

function TaskItem({ task }) {
  const [isChecked, setIsChecked] = useState(task.completed)

  return (
    <div className={`flex items-start space-x-4 py-3 ${isChecked ? 'opacity-70' : ''}`}>
      <Checkbox 
        checked={isChecked} 
        onCheckedChange={setIsChecked}
        className="mt-1"
      />
      <div className="flex-1">
        <p className={`text-sm font-medium ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{task.time}</span>
          {task.priority === 'high' && (
            <span className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-500">
              Yüksek
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function DashboardPage() {
  const today = new Date()
  const formattedDate = format(today, 'd MMMM yyyy, EEEE', { locale: tr })
  
  const tasks = [
    { id: 1, title: 'Haftalık planlama toplantısı', time: '09:00 - 10:00', completed: false, priority: 'high' },
    { id: 2, title: 'Sunumu tamamla', time: '11:00 - 12:30', completed: false },
    { id: 3, title: 'Öğle yemeği', time: '12:30 - 13:30', completed: true },
    { id: 4, title: 'E-postaları yanıtla', time: '14:00 - 15:00', completed: false },
    { id: 5, title: 'Koşu idmanı', time: '18:00 - 19:00', completed: false },
  ]

  const completedTasksCount = tasks.filter(task => task.completed).length
  const completionPercentage = Math.round((completedTasksCount / tasks.length) * 100)

  const timeSlots = [
    { time: '09:00', tasks: ['Haftalık planlama toplantısı'] },
    { time: '10:00', tasks: [] },
    { time: '11:00', tasks: ['Sunumu tamamla'] },
    { time: '12:00', tasks: ['Sunumu tamamla'] },
    { time: '13:00', tasks: ['Öğle yemeği'] },
    { time: '14:00', tasks: ['E-postaları yanıtla'] },
    { time: '15:00', tasks: [] },
    { time: '16:00', tasks: [] },
    { time: '17:00', tasks: [] },
    { time: '18:00', tasks: ['Koşu idmanı'] },
  ]

  const tips = [
    "Bugün için en önemli görevlerinizi belirleyin ve öncelik verin.",
    "Büyük görevleri daha küçük ve yönetilebilir parçalara bölün.",
    "Her 25 dakikalık çalışma sonrası 5 dakika mola verin.",
    "Gün boyunca yeterli su içmeye dikkat edin.",
    "Günün sonunda yarın için plan yapın."
  ]

  const [currentTip, setCurrentTip] = useState(0)
  
  const refreshTip = () => {
    const nextTip = (currentTip + 1) % tips.length
    setCurrentTip(nextTip)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/10">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">{formattedDate}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Günün özeti kartı */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl">Günün Özeti</CardTitle>
                  <div className="ml-auto flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-brand" />
                      <span className="text-xs text-muted-foreground">Tamamlanan</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Kalan</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pb-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        İlerleme
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {completedTasksCount} / {tasks.length} görev tamamlandı
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center rounded-full bg-muted p-1 text-2xl font-bold">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background">
                          <div className="text-brand">{completionPercentage}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex items-center justify-start gap-2">
                      <PlusCircle className="h-4 w-4 text-brand" />
                      Görev Ekle
                    </Button>
                    <Button variant="outline" className="flex items-center justify-start gap-2">
                      <Calendar className="h-4 w-4 text-brand" />
                      Takvime Git
                    </Button>
                    <Button variant="outline" className="flex items-center justify-start gap-2">
                      <Star className="h-4 w-4 text-brand" />
                      Hedef Belirle
                    </Button>
                    <Button variant="outline" className="flex items-center justify-start gap-2">
                      <TrendingUp className="h-4 w-4 text-brand" />
                      İstatistikler
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Günün planı kartı */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-brand" /> 
                    Günün Planı
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0 overflow-auto max-h-[400px] pr-2">
                    {timeSlots.map((slot, index) => (
                      <div key={index} className="flex">
                        <div className="w-20 py-4 text-sm text-muted-foreground">
                          {slot.time}
                        </div>
                        <div className="flex-1 border-l pl-4 py-4 relative">
                          {slot.tasks.length > 0 ? (
                            <div className="bg-muted rounded-md p-2 ml-2">
                              {slot.tasks.map((task, taskIndex) => (
                                <p key={taskIndex} className="text-sm">{task}</p>
                              ))}
                            </div>
                          ) : (
                            <div className="ml-2 text-sm text-muted-foreground italic">Boş</div>
                          )}
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />
                          <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-muted" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* İstatistikler */}
              <StatsCards />
            </div>

            <div className="space-y-6">
              {/* Görevler kartı */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-xl">Görevler</CardTitle>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <PlusCircle className="h-4 w-4 mr-1" /> Yeni
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0 border-t">
                    {tasks.map(task => (
                      <TaskItem key={task.id} task={task} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Tüm Görevleri Görüntüle
                  </Button>
                </CardFooter>
              </Card>

              {/* Yapay Zeka İpuçları kartı */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <User className="mr-2 h-5 w-5 text-brand" /> 
                    Yapay Zeka İpuçları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 text-sm">
                    <p>{tips[currentTip]}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full flex items-center gap-2"
                    onClick={refreshTip}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Yeni İpucu
                  </Button>
                </CardFooter>
              </Card>

              {/* Yaklaşan Hatırlatıcılar kartı */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-brand" /> 
                    Yaklaşan Hatırlatıcılar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Rapor Teslimi</p>
                          <p className="text-xs text-muted-foreground">Yarın, 17:00</p>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-500">
                          Önemli
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Toplantı</p>
                          <p className="text-xs text-muted-foreground">1 Mayıs, 10:30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage 