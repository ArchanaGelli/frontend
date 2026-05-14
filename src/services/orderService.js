import { supabase, hasSupabaseConfig } from '../utils/supabase';

// Mock Orders Data (Used if Supabase is not configured)
let mockOrders = [
  { id: 'ORD-1056', customer_name: 'Riya Sharma', email: 'riya@example.com', total: 4500, status: 'Processing', created_at: new Date().toISOString() },
  { id: 'ORD-1055', customer_name: 'Anita Desai', email: 'anita@example.com', total: 12999, status: 'Shipped', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'ORD-1054', customer_name: 'Meera Patel', email: 'meera@example.com', total: 2450, status: 'Delivered', created_at: new Date(Date.now() - 172800000).toISOString() },
];

export const getOrders = async () => {
  if (!hasSupabaseConfig) {
    return { data: mockOrders, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Map data to expected format
    const formattedData = data.map(order => ({
      ...order,
      customer_name: order.profiles?.full_name || 'Unknown User',
      email: order.profiles?.email || 'N/A'
    }));
    
    return { data: formattedData, error: null };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { data: null, error };
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  if (!hasSupabaseConfig) {
    // Update mock data locally
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      mockOrders[orderIndex].status = newStatus;
      return { data: mockOrders[orderIndex], error: null };
    }
    return { data: null, error: new Error('Order not found') };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating order:', error);
    return { data: null, error };
  }
};
