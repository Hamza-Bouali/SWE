import type { AuthUser } from "../services/AuthProvider";
import { useAuth } from "../services/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
    email: string
    role: string 
}

type Project = {
    id?: string
    Name: string;
    description: string
    owner?: AuthUser | null 
    members?: User[]
    create_at: Date
    status?: 'active' | 'planning' | 'completed' | 'on-hold'
}

type ProjectListProps = {
    projects: Project[]
}

function ProjectList({ projects }: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'badge-success'
      case 'planning': return 'badge-info'
      case 'completed': return 'badge-primary'
      case 'on-hold': return 'badge-warning'
      default: return 'badge-ghost'
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="form-control flex-1">
          <div className="input-group">
            <span className="bg-base-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select 
          className="select select-bordered w-full sm:w-48"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="planning">Planning</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-base-200 rounded-lg shadow-lg">
        <table className="table table-zebra">
          <thead className="bg-base-300">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project: Project, index: number) => (
              <tr key={project.id ?? index} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-lg w-10">
                        <span className="text-xs">{project.Name[0]}</span>
                      </div>
                    </div>
                    <div className="font-bold">{project.Name}</div>
                  </div>
                </td>
                <td>
                  <div className="text-sm opacity-70 max-w-xs truncate">
                    {project.description}
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStatusColor(project.status)}`}>
                    {project.status || 'active'}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span className="text-xs">{project.owner?.email?.[0].toUpperCase()}</span>
                      </div>
                    </div>
                    <span className="text-sm">{project.owner?.email}</span>
                  </div>
                </td>
                <td className="text-sm opacity-70">
                  {new Date(project.create_at).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button className="btn btn-ghost btn-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden grid gap-4">
        {filteredProjects.map((project: Project, index: number) => (
          <div key={project.id ?? index} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-lg w-12">
                      <span>{project.Name[0]}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="card-title text-lg">{project.Name}</h3>
                    <span className={`badge badge-sm ${getStatusColor(project.status)} mt-1`}>
                      {project.status || 'active'}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm opacity-70">{project.description}</p>
              
              <div className="flex items-center gap-2 text-sm mt-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-6">
                    <span className="text-xs">{project.owner?.email?.[0].toUpperCase()}</span>
                  </div>
                </div>
                <span className="opacity-70">{project.owner?.email}</span>
              </div>
              
              <div className="card-actions justify-between items-center mt-4">
                <span className="text-xs opacity-50">
                  {new Date(project.create_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-ghost">View</button>
                  <button className="btn btn-sm btn-primary">Edit</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold mb-2">No projects found</h3>
          <p className="text-base-content/60">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export function ProjectPage() {
  const { user } = useAuth()
  const Projects: Project[] = [
    { Name: 'E-Commerce Platform', description: 'Building a modern e-commerce solution with React and Node.js', owner: user, create_at: new Date(), status: 'active' },
    { Name: 'Mobile App Development', description: 'Cross-platform mobile application using React Native', owner: user, create_at: new Date(Date.now() - 86400000), status: 'planning' },
    { Name: 'Dashboard Analytics', description: 'Real-time analytics dashboard for business intelligence', owner: user, create_at: new Date(Date.now() - 172800000), status: 'active' },
    { Name: 'API Integration', description: 'REST API integration with third-party services', owner: user, create_at: new Date(Date.now() - 259200000), status: 'completed' },
    { Name: 'Design System', description: 'Company-wide design system and component library', owner: user, create_at: new Date(Date.now() - 345600000), status: 'on-hold' }
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-base-content/60 mt-1">Manage and track all your projects</p>
        </div>
        <button className="btn btn-primary gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Project
        </button>
      </div>

      <ProjectList projects={Projects} />
    </div>
  )
}