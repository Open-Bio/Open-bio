// pages/tools/ToolList.jsx
import React, { useState } from 'react';

const ToolList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = [
    {
      id: 'tool-pca',
      name: 'Principal Component Analysis',
      description: 'Perform dimensionality reduction using PCA',
      category: 'analysis',
      icon: '📊'
    },
    {
      id: 'tool-clustering',
      name: 'K-Means Clustering',
      description: 'Cluster data points using K-means algorithm',
      category: 'analysis',
      icon: '🎯'
    },
    {
      id: 'tool-visualization',
      name: 'Data Visualization',
      description: 'Create interactive plots and charts',
      category: 'visualization',
      icon: '📈'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'analysis', name: 'Analysis' },
    { id: 'visualization', name: 'Visualization' },
    { id: 'preprocessing', name: 'Preprocessing' }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Available Tools</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Request New Tool
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border rounded-md bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{tool.icon}</span>
              <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
            </div>
            <p className="text-gray-500 mb-4">{tool.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400 capitalize">{tool.category}</span>
              <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                Add to Workflow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolList;