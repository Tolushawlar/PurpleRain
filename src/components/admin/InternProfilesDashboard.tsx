'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { mockInterns } from '@/data/mockInterns';
import { Intern } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Search, Eye, ArrowLeft, FileText, Video, CheckCircle, XCircle, Clock, Download, Upload, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';

export function InternProfilesDashboard() {
  const [interns, setInterns] = useState<Intern[]>(mockInterns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);

  const filteredInterns = interns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || intern.onboardingStatus === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || intern.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(interns.map(intern => intern.department))];

  const getStageStatus = (intern: Intern, stage: string) => {
    switch (stage) {
      case 'docs': return intern.documents.resume && intern.documents.idProof && intern.documents.agreement ? 'Completed' : 'Pending';
      case 'slack': return intern.slackStatus === 'Joined' ? 'Completed' : intern.slackStatus === 'Sent' ? 'Pending' : 'Not Started';
      case 'letter': return intern.documents.agreement ? 'Completed' : 'Pending';
      default: return 'Pending';
    }
  };

  const handleExport = () => {
    const csvContent = filteredInterns.map(intern => 
      `${intern.name},${intern.email},${intern.department},${intern.onboardingStatus}`
    ).join('\n');
    const blob = new Blob([`Name,Email,Department,Status\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'intern-list.csv';
    a.click();
  };

  const toggleSlackStatus = (internId: string) => {
    setInterns(prev => prev.map(intern => 
      intern.id === internId 
        ? { ...intern, slackStatus: intern.slackStatus === 'Joined' ? 'Not Sent' : 'Joined' }
        : intern
    ));
  };

  const uploadJoiningLetter = (internId: string) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setInterns(prev => prev.map(intern => 
          intern.id === internId 
            ? { ...intern, documents: { ...intern.documents, agreement: URL.createObjectURL(file) } }
            : intern
        ));
      }
    };
    fileInput.click();
  };

  if (selectedIntern) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedIntern(null)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to List</span>
          </Button>
          <h1 className="text-2xl font-bold">{selectedIntern.name} - Profile Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-blue-800">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div><strong>Name:</strong> {selectedIntern.name}</div>
              <div><strong>Email:</strong> {selectedIntern.email}</div>
              <div><strong>Phone:</strong> {selectedIntern.phone}</div>
              <div><strong>Department:</strong> {selectedIntern.department}</div>
              <div><strong>Join Date:</strong> {formatDate(selectedIntern.joinDate)}</div>
              <div className="flex items-center space-x-2">
                <strong>Status:</strong> 
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedIntern.onboardingStatus === 'Completed' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : selectedIntern.onboardingStatus === 'In Progress' 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {selectedIntern.onboardingStatus}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-green-800">Stage Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span>Documents Complete</span>
                {getStageStatus(selectedIntern, 'docs') === 'Completed' ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
              <div className="flex items-center justify-between">
                <span>Slack Sent</span>
                {selectedIntern.slackStatus === 'Joined' ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  selectedIntern.slackStatus === 'Sent' ? 
                  <Clock className="h-5 w-5 text-yellow-600" /> :
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
              <div className="flex items-center justify-between">
                <span>Letter Generated</span>
                {selectedIntern.documents.agreement ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="text-purple-800">Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Government ID</span>
                </div>
                {selectedIntern.documents.idProof ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Resume</span>
                </div>
                {selectedIntern.documents.resume ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Agreement</span>
                </div>
                {selectedIntern.documents.agreement ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Joining Letter</span>
                </div>
                {selectedIntern.documents.agreement ? 
                  <CheckCircle className="h-5 w-5 text-green-600" /> : 
                  <XCircle className="h-5 w-5 text-red-600" />
                }
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="text-orange-800">Interview Recording</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {selectedIntern.interviewRecording ? (
                <div className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-blue-600" />
                  <a href={selectedIntern.interviewRecording} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:underline">
                    View Recording
                  </a>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Video className="h-5 w-5" />
                  <span>No recording available</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="text-indigo-800">Slack & Letter Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Slack Invite Status</span>
                <button
                  onClick={() => toggleSlackStatus(selectedIntern.id)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 cursor-pointer"
                >
                  {selectedIntern.slackStatus === 'Joined' ? (
                    <ToggleRight className="h-6 w-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-gray-400" />
                  )}
                  <span className={`font-medium ${
                    selectedIntern.slackStatus === 'Joined' 
                      ? 'text-green-600' 
                      : selectedIntern.slackStatus === 'Sent' 
                      ? 'text-yellow-600' 
                      : 'text-gray-500'
                  }`}>
                    {selectedIntern.slackStatus}
                  </span>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Joining Letter</span>
                <div className="flex items-center space-x-2">
                  {selectedIntern.documents.agreement ? (
                    <a href={selectedIntern.documents.agreement} target="_blank" rel="noopener noreferrer" 
                       className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300 hover:shadow-sm cursor-pointer">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">View PDF</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => uploadJoiningLetter(selectedIntern.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-300 hover:shadow-sm cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="font-medium">Upload PDF</span>
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="text-green-800">All Intern Profiles Dashboard</CardTitle>
          <p className="text-green-600">
            Comprehensive view of all intern progress and status
          </p>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <div className="flex space-x-2">
              <Button onClick={handleExport} variant="secondary" className="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer">
                <Download className="h-4 w-4" />
                <span className="font-medium">Export CSV</span>
              </Button>
              <Button onClick={() => alert('Job Tracker export would be implemented')} variant="secondary" className="flex items-center space-x-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 hover:border-orange-300 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer">
                <Download className="h-4 w-4" />
                <span className="font-medium">Export Jobs</span>
              </Button>
              <Button onClick={() => alert('Weekly Feedback export would be implemented')} variant="secondary" className="flex items-center space-x-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 hover:border-purple-300 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer">
                <Download className="h-4 w-4" />
                <span className="font-medium">Export Reports</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          Showing <span className="font-bold text-purple-600">{filteredInterns.length}</span> of <span className="font-bold">{interns.length}</span> interns
        </div>
      </div>

      {/* Intern Table */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left p-4 font-bold text-gray-700">Intern</th>
                  <th className="text-left p-4 font-bold text-gray-700">Department</th>
                  <th className="text-left p-4 font-bold text-gray-700">Status</th>
                  <th className="text-left p-4 font-bold text-gray-700">Documents</th>
                  <th className="text-left p-4 font-bold text-gray-700">Slack</th>
                  <th className="text-left p-4 font-bold text-gray-700">Join Date</th>
                  <th className="text-left p-4 font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInterns.map((intern, index) => (
                  <tr key={intern.id} className={`border-b border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-gray-800">{intern.name}</div>
                        <div className="text-sm text-gray-600">{intern.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        {intern.department}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={intern.onboardingStatus} />
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-1">
                        {intern.documents.resume && (
                          <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-sm" title="Resume uploaded" />
                        )}
                        {intern.documents.idProof && (
                          <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-sm" title="ID Proof uploaded" />
                        )}
                        {intern.documents.agreement && (
                          <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-sm" title="Agreement uploaded" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={intern.slackStatus} />
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">
                      {formatDate(intern.joinDate)}
                    </td>
                    <td className="p-4">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer"
                        onClick={() => setSelectedIntern(intern)}
                      >
                        <Eye className="h-4 w-4 " />
                        <span className="text-sm font-medium">View</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}