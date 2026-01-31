import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';
import { Trash2, Edit2, X, Plus } from 'lucide-react';

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    api.plans.getAll().then(setPlans);
  };

  const onSubmit = async (data) => {
    try {
      // Convert comma strings to array
      const formattedData = {
        ...data,
        benefits: typeof data.benefits === 'string' ? data.benefits.split(',').map((s) => s.trim()) : data.benefits,
        price: Number(data.price)
      };

      if (editingPlan) {
        await api.plans.update(editingPlan._id, formattedData);
      } else {
        await api.plans.create(formattedData);
      }
      closeForm();
      loadPlans();
    } catch (err) {
      alert("Failed to save plan: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await api.plans.delete(id);
      loadPlans();
    }
  };

  const openEdit = (plan) => {
    setEditingPlan(plan);
    setValue('operator', plan.operator);
    setValue('price', plan.price);
    setValue('validity', plan.validity);
    setValue('data', plan.data);
    setValue('benefits', plan.benefits.join(', '));
    setValue('offers', plan.offers || '');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingPlan(null);
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Plans</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Plan
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">{editingPlan ? 'Edit Plan' : 'New Plan'}</h2>
              <button onClick={closeForm}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <select {...register('operator', { required: true })} className="border p-2 rounded">
                  <option value="Jio">Jio</option>
                  <option value="Airtel">Airtel</option>
                  <option value="Vi">Vi</option>
                  <option value="BSNL">BSNL</option>
                </select>
                <input type="number" placeholder="Price" {...register('price', { required: true })} className="border p-2 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Validity (e.g. 28 days)" {...register('validity', { required: true })} className="border p-2 rounded" />
                <input placeholder="Data (e.g. 1.5GB/day)" {...register('data', { required: true })} className="border p-2 rounded" />
              </div>
              <input placeholder="Benefits (comma separated)" {...register('benefits', { required: true })} className="border p-2 rounded w-full" />
              <input placeholder="Offers (optional)" {...register('offers')} className="border p-2 rounded w-full" />
              <button type="submit" className="w-full bg-primary text-white py-2 rounded font-bold">Save</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Benefits</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map(p => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${p.operator === 'Jio' ? 'bg-blue-100 text-blue-800' :
                    p.operator === 'Airtel' ? 'bg-red-100 text-red-800' :
                      p.operator === 'Vi' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {p.operator}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">₹{p.price}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.data}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.validity}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{p.benefits.join(', ')}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEdit(p)} className="text-blue-600 hover:text-blue-800 p-1">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Total Plans: {plans.length}
      </div>
    </div>
  );
};

export default AdminPlans;