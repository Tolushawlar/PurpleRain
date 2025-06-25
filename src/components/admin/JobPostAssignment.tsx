'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockInterns } from '@/data/mockInterns';

interface JobPostForm {
  title: string;
  description: string;
  platforms: string[];
  country: string;
  assignedInterns: string[];
}

const platforms = ['LinkedIn', 'Indeed', 'AngelList', 'Glassdoor', 'Monster'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany'];

export function JobPostAssignment() {
  const [form, setForm] = useState<JobPostForm>({
    title: '',
    description: '',
    platforms: [],
    country: '',
    assignedInterns: []
  });

  const handlePlatformChange = (platform: string) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleInternChange = (internId: string) => {
    setForm(prev => ({
      ...prev,
      assignedInterns: prev.assignedInterns.includes(internId)
        ? prev.assignedInterns.filter(id => id !== internId)
        : [...prev.assignedInterns, internId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job post submitted:', form);
    alert('Job post assigned successfully!');
  };

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Job Post Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Description *</label>
            <textarea
              required
              rows={6}
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
              placeholder="Enter job description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Platforms *</label>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map(platform => (
                <label key={platform} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.platforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="rounded border-purplerain-border"
                  />
                  <span className="text-sm">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Country *</label>
            <select
              required
              value={form.country}
              onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
              className="w-full px-3 py-2 border border-purplerain-border rounded-md focus:outline-none focus:ring-2 focus:ring-purplerain-primary"
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Assigned Interns *</label>
            <div className="space-y-2">
              {mockInterns.map(intern => (
                <label key={intern.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.assignedInterns.includes(intern.id)}
                    onChange={() => handleInternChange(intern.id)}
                    className="rounded border-purplerain-border"
                  />
                  <span className="text-sm">{intern.name} - {intern.department}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit">Assign Job Post</Button>
            <Button type="button" variant="secondary">Save as Draft</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}