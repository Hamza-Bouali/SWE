import { Link } from 'react-router-dom'
import { useAuth } from '../services/useAuth'

export default function Dashboard() {
  const { user } = useAuth()

  const stats = [
    { title: 'Total Projects', value: '5', icon: '📁', color: 'bg-primary', change: '+12%' },
    { title: 'Active Tasks', value: '23', icon: '✅', color: 'bg-secondary', change: '+8%' },
    { title: 'Team Members', value: '12', icon: '👥', color: 'bg-accent', change: '+3%' },
    { title: 'Completed', value: '48', icon: '🎯', color: 'bg-success', change: '+15%' },
  ]

  const recentProjects = [
    { name: 'Project Alpha', status: 'In Progress', progress: 75, color: 'progress-primary' },
    { name: 'Project Beta', status: 'Planning', progress: 30, color: 'progress-secondary' },
    { name: 'Project Gamma', status: 'Review', progress: 90, color: 'progress-accent' },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-base-content/60 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <Link to="/projects" className="btn btn-primary gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Project
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={stat.title} 
            className="stats shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="stat">
              <div className="stat-figure text-4xl">{stat.icon}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-desc text-success">{stat.change} from last month</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Recent Projects</h2>
              <div className="space-y-4 mt-4">
                {recentProjects.map((project, index) => (
                  <div key={project.name} className="p-4 bg-base-100 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className="badge badge-outline">{project.status}</span>
                    </div>
                    <progress 
                      className={`progress ${project.color} w-full`} 
                      value={project.progress} 
                      max="100"
                    ></progress>
                    <p className="text-sm text-base-content/60 mt-1">{project.progress}% complete</p>
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <Link to="/projects" className="btn btn-ghost btn-sm">
                  View All Projects →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Quick Actions</h2>
              <div className="space-y-2 mt-4">
                <button className="btn btn-block justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Create Task
                </button>
                <button className="btn btn-block justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <line x1="19" y1="8" x2="19" y2="14"></line>
                    <line x1="22" y1="11" x2="16" y2="11"></line>
                  </svg>
                  Invite Member
                </button>
                <button className="btn btn-block justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">🎉 Upgrade to Pro</h2>
              <p className="text-sm opacity-90">Get unlimited projects and advanced features.</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm bg-base-100 text-primary hover:bg-base-200">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}