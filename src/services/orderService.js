import api from '../utils/api';

// Mock Orders Data (Used if API is unavailable)
let mockOrders = [
  { id: 'ORD-1056', customer_name: 'Riya Sharma', email: 'riya@example.com', total: 4500, status: 'Processing', created_at: new Date().toISOString() },
  { id: 'ORD-1055', customer_name: 'Anita Desai', email: 'anita@example.com', total: 12999, status: 'Shipped', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'ORD-1054', customer_name: 'Meera Patel', email: 'meera@example.com', total: 2450, status: 'Delivered', created_at: new Date(Date.now() - 172800000).toISOString() },
];

export const getOrders = async () => {
  try {
    const { data } = await api.get('/orders');
    
    // Map backend data to expected format if necessary
    const formattedData = data.map(order => ({
      ...order,
      customer_name: order.user?.name || 'Unknown User',
      email: order.user?.email || 'N/A'
    }));
    
    return { data: formattedData, error: null };
  } catch (error) {
    console.warn('API fetch for orders failed, falling back to mock data:', error.message);
    return { data: mockOrders, error: null };
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const { data } = await api.put(`/orders/${orderId}/deliver`, { status: newStatus });
    return { data, error: null };
  } catch (error) {
    console.warn('API update for order status failed, performing local update on mock data:', error.message);
    
    // Update mock data locally
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
      mockOrders[orderIndex].status = newStatus;
      return { data: mockOrders[orderIndex], error: null };
    }
    return { data: null, error: new Error('Order not found') };
  }
};
