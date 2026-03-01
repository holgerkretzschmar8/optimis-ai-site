import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  LogOut,
  RefreshCw,
  Mail,
  Phone,
  Building,
  Calendar,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_7f9de4cc-23e2-4dee-b34f-6c95288f12e2/artifacts/5siww960_Screenshot%202026-02-17%20at%2022.30.43.png";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const handleLogout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  }, [navigate]);

  const fetchData = useCallback(async () => {
    const getAuthHeaders = () => {
      const token = localStorage.getItem("admin_token");
      return { Authorization: `Bearer ${token}` };
    };

    try {
      const [leadsRes, statsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/leads`, { headers: getAuthHeaders() }),
        axios.get(`${BACKEND_URL}/api/admin/stats`, { headers: getAuthHeaders() }),
      ]);
      setLeads(leadsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        handleLogout();
      } else {
        toast.error("Failed to fetch data");
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [navigate, fetchData]);

  const updateLeadStatus = async (leadId, status) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/api/admin/leads/${leadId}`,
        { status },
        { headers: getAuthHeaders() }
      );
      toast.success("Lead status updated");
      fetchData();
    } catch (error) {
      toast.error("Failed to update lead");
    }
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/leads/${leadId}`, {
        headers: getAuthHeaders(),
      });
      toast.success("Lead deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete lead");
    }
  };

  const filteredLeads = filter === "all" 
    ? leads 
    : leads.filter(lead => lead.status === filter);

  const statusColors = {
    new: "bg-cyan-500/20 text-cyan-400",
    contacted: "bg-yellow-500/20 text-yellow-400",
    qualified: "bg-purple-500/20 text-purple-400",
    converted: "bg-green-500/20 text-green-400",
  };

  const statCards = [
    { label: "Total Leads", value: stats.total_leads || 0, icon: Users, color: "cyan" },
    { label: "New Leads", value: stats.new_leads || 0, icon: TrendingUp, color: "blue" },
    { label: "This Week", value: stats.recent_leads || 0, icon: Clock, color: "purple" },
    { label: "Converted", value: stats.converted_leads || 0, icon: CheckCircle, color: "green" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <RefreshCw size={32} className="text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-[#020617]">
      {/* Header */}
      <header className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Optimis AI" className="h-8" />
            <span className="text-slate-400 text-sm">Admin Dashboard</span>
          </div>
          <button
            data-testid="logout-button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon size={20} className={`text-${stat.color}-400`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Leads Section */}
        <div className="glass-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Leads</h2>
            <div className="flex items-center gap-2">
              <select
                data-testid="status-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-dark text-sm py-2 px-4"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
              </select>
              <button
                data-testid="refresh-button"
                onClick={fetchData}
                className="btn-secondary py-2 px-4"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {/* Leads Table */}
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Name</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Contact</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 hidden md:table-cell">Company</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 hidden lg:table-cell">Source</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-400">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 hidden lg:table-cell">Date</th>
                    <th className="text-right py-4 px-4 text-sm font-medium text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      data-testid={`lead-row-${lead.id}`}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-white">{lead.name}</p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Mail size={14} />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Phone size={14} />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        {lead.company ? (
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Building size={14} />
                            {lead.company}
                          </div>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <span className="text-sm text-slate-500 capitalize">{lead.source?.replace("_", " ")}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            statusColors[lead.status] || statusColors.new
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar size={14} />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              data-testid={`lead-actions-${lead.id}`}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <MoreVertical size={18} className="text-slate-400" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-900 border-white/10">
                            <DropdownMenuItem
                              onClick={() => updateLeadStatus(lead.id, "new")}
                              className="text-slate-300 hover:text-white focus:text-white cursor-pointer"
                            >
                              Mark as New
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateLeadStatus(lead.id, "contacted")}
                              className="text-slate-300 hover:text-white focus:text-white cursor-pointer"
                            >
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateLeadStatus(lead.id, "qualified")}
                              className="text-slate-300 hover:text-white focus:text-white cursor-pointer"
                            >
                              Mark as Qualified
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateLeadStatus(lead.id, "converted")}
                              className="text-slate-300 hover:text-white focus:text-white cursor-pointer"
                            >
                              Mark as Converted
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteLead(lead.id)}
                              className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer"
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
