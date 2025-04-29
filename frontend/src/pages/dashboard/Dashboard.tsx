// pages/dashboard/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${color}`}>
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">
            {title}
          </dt>
          <dd className="text-lg font-semibold text-gray-900">{value}</dd>
        </dl>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const recentWorkflows = [
    {
      id: 1,
      name: "RNA Sequence Analysis",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Protein Structure Prediction",
      status: "running",
      date: "2024-01-14",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Workflows"
          value="5"
          icon="🔄"
          color="border-blue-500"
        />
        <StatCard
          title="Available Tools"
          value="12"
          icon="🛠"
          color="border-green-500"
        />
        <StatCard
          title="Storage Used"
          value="2.4 GB"
          icon="💾"
          color="border-yellow-500"
        />
        <StatCard
          title="Team Members"
          value="8"
          icon="👥"
          color="border-purple-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Workflows
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {recentWorkflows.map((workflow) => (
              <li key={workflow.id}>
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-blue-600 truncate">
                      {workflow.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Last updated on {workflow.date}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        workflow.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {workflow.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/workflows/new"
              className="text-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <span className="block text-2xl mb-2">📝</span>
              New Workflow
            </Link>
            <Link
              to="/tools"
              className="text-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <span className="block text-2xl mb-2">🔍</span>
              Browse Tools
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">CPU Usage</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Memory</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
