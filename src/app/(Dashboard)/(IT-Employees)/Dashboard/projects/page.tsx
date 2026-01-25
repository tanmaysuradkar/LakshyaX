'use client';

import { useState } from 'react';
import DashboardNav from '@/app/components/EmployeesDashboardNav';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'in-progress' | 'completed';
  dueDate: Date;
  team: string[];
  role: string;
  assignee: string;
  tags: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Redesigning the company website with modern UI/UX principles',
      status: 'active',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      team: ['JD', 'AS', '+2'],
      role: 'Frontend Developer',
      assignee: 'John Doe',
      tags: ['UI/UX', 'Web Development']
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Developing a new mobile application for customer engagement',
      status: 'in-progress',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
      team: ['RJ', 'MK'],
      role: 'Mobile Developer',
      assignee: 'Mike Smith',
      tags: ['Mobile', 'React Native']
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      description: 'Creating an analytics dashboard for business metrics',
      status: 'completed',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      team: ['LS', 'TP'],
      role: 'Data Analyst',
      assignee: 'Sarah Wilson',
      tags: ['Analytics', 'Dashboard']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'active' as Project['status'],
    dueDate: '',
    team: [] as string[],
    role: '',
    assignee: '',
    tags: [] as string[]
  });

  const [newTeamMember, setNewTeamMember] = useState('');
  const [newTag, setNewTag] = useState('');

  // Filter projects based on search query and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate project stats
  const projectStats = {
    active: projects.filter(p => p.status === 'active').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length
  };

  const handleAddTeamMember = () => {
    if (newTeamMember && !newProject.team.includes(newTeamMember)) {
      setNewProject({
        ...newProject,
        team: [...newProject.team, newTeamMember]
      });
      setNewTeamMember('');
    }
  };

  const handleRemoveTeamMember = (member: string) => {
    setNewProject({
      ...newProject,
      team: newProject.team.filter(m => m !== member)
    });
  };

  const handleAddTag = () => {
    if (newTag && !newProject.tags.includes(newTag)) {
      setNewProject({
        ...newProject,
        tags: [...newProject.tags, newTag]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewProject({
      ...newProject,
      tags: newProject.tags.filter(t => t !== tag)
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      status: newProject.status,
      dueDate: new Date(newProject.dueDate),
      team: newProject.team,
      role: newProject.role,
      assignee: newProject.assignee,
      tags: newProject.tags
    };
    setProjects([...projects, project]);
    setShowCreateModal(false);
    setNewProject({
      title: '',
      description: '',
      status: 'active',
      dueDate: '',
      team: [],
      role: '',
      assignee: '',
      tags: []
    });
  };

  const handleStatusChange = (projectId: number, newStatus: Project['status']) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
  };

  const handleDeleteProject = (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== projectId));
      setSelectedProject(null);
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return `Completed ${Math.abs(days)} days ago`;
    } else if (days === 0) {
      return 'Due today';
    } else if (days === 1) {
      return 'Due tomorrow';
    } else if (days < 7) {
      return `Due in ${days} days`;
    } else if (days < 30) {
      return `Due in ${Math.floor(days / 7)} weeks`;
    } else {
      return `Due in ${Math.floor(days / 30)} months`;
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar Navigation */}
      <DashboardNav/>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Projects Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Project
              </button>
            </div>
          </div>
        </header>

        {/* Main Projects Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Projects</p>
                  <h3 className="text-2xl font-bold text-gray-900">{projectStats.active}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <h3 className="text-2xl font-bold text-gray-900">{projectStats.inProgress}</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <h3 className="text-2xl font-bold text-gray-900">{projectStats.completed}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-white text-black rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">All Projects</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div 
                  key={project.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value as Project['status'])}
                      className={`px-3 py-1 rounded-full text-sm ${
                        project.status === 'active' ? 'bg-green-100 text-green-600' :
                        project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Role:</span>
                      <span className="text-gray-900">{project.role}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Assignee:</span>
                      <span className="text-gray-900">{project.assignee}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Team Members</div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <div key={index} className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-sm">{member}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">{formatDueDate(project.dueDate)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Create New Project</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={newProject.role}
                  onChange={(e) => setNewProject({ ...newProject, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Frontend Developer, Project Manager"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignee</label>
                <input
                  type="text"
                  value={newProject.assignee}
                  onChange={(e) => setNewProject({ ...newProject, assignee: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Team Members</label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={newTeamMember}
                    onChange={(e) => setNewTeamMember(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add team member"
                  />
                  <button
                    type="button"
                    onClick={handleAddTeamMember}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {newProject.team.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      <span>{member}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTeamMember(member)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {newProject.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project View Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedProject.title}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this project?')) {
                      handleDeleteProject(selectedProject.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete Project
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="mt-1 text-gray-900">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Role</h4>
                  <p className="mt-1 text-gray-900">{selectedProject.role}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Assignee</h4>
                  <p className="mt-1 text-gray-900">{selectedProject.assignee}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <select
                  value={selectedProject.status}
                  onChange={(e) => handleStatusChange(selectedProject.id, e.target.value as Project['status'])}
                  className={`mt-1 px-3 py-1 rounded-full text-sm ${
                    selectedProject.status === 'active' ? 'bg-green-100 text-green-600' :
                    selectedProject.status === 'in-progress' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}
                >
                  <option value="active">Active</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
                <p className="mt-1 text-gray-900">{formatDueDate(selectedProject.dueDate)}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Team Members</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full"
                    >
                      <span className="text-blue-600">{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full"
                    >
                      <span className="text-gray-600">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 