import React, { useState, useEffect } from 'react';
import { Box, H1, H2, Text, Loader, Badge } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new ApiClient();
        const response = await api.getDashboard();
        console.log('Dashboard API response:', response);
        console.log('Dashboard data:', response.data);
        console.log('Overview:', response.data?.overview);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box padding="xxl" style={{ textAlign: 'center' }}>
        <Loader />
        <Text style={{ marginTop: '20px' }}>Loading statistics...</Text>
      </Box>
    );
  }

  if (!data || !data.overview) {
    return (
      <Box padding="xxl">
        <Text>No statistics available</Text>
      </Box>
    );
  }

  const { overview, topShops = [], approvalStats } = data;

  return (
    <Box padding="xxl" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <H1 marginBottom="xxl">SP Loyalty Dashboard</H1>

      {/* Overall Statistics Cards */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <Box
          padding="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Text
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#007bff',
              marginBottom: '8px',
            }}
          >
            {overview.totalUsers || 0}
          </Text>
          <Text style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>Total Users</Text>
        </Box>

        <Box
          padding="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Text
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#28a745',
              marginBottom: '8px',
            }}
          >
            {overview.totalShops || 0}
          </Text>
          <Text style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>Total Shops</Text>
        </Box>

        <Box
          padding="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Text
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#17a2b8',
              marginBottom: '8px',
            }}
          >
            {overview.totalTransactions || 0}
          </Text>
          <Text style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>Transactions</Text>
        </Box>

        <Box
          padding="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Text
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#ffc107',
              marginBottom: '8px',
            }}
          >
            {overview.totalApprovalRequests || 0}
          </Text>
          <Text style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>
            Approval Requests
          </Text>
        </Box>

        <Box
          padding="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <Text
            style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#6f42c1',
              marginBottom: '8px',
            }}
          >
            {overview.totalPointsUsed || 0}
          </Text>
          <Text style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>
            Total Points Used
          </Text>
        </Box>
      </Box>

      {/* Approval Requests Summary */}
      {approvalStats && (
        <Box
          padding="lg"
          marginBottom="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <H2 marginBottom="lg">Approval Requests Status</H2>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px',
            }}
          >
            <Box
              padding="md"
              style={{
                background: '#fff3cd',
                borderRadius: '6px',
                borderLeft: '4px solid #ffc107',
                textAlign: 'center',
              }}
            >
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#856404' }}>
                {approvalStats.summary.totalPending}
              </Text>
              <Text style={{ color: '#856404', fontSize: '12px' }}>Pending</Text>
            </Box>

            <Box
              padding="md"
              style={{
                background: '#d4edda',
                borderRadius: '6px',
                borderLeft: '4px solid #28a745',
                textAlign: 'center',
              }}
            >
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#155724' }}>
                {approvalStats.summary.totalApproved}
              </Text>
              <Text style={{ color: '#155724', fontSize: '12px' }}>Approved</Text>
            </Box>

            <Box
              padding="md"
              style={{
                background: '#f8d7da',
                borderRadius: '6px',
                borderLeft: '4px solid #dc3545',
                textAlign: 'center',
              }}
            >
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#721c24' }}>
                {approvalStats.summary.totalRejected}
              </Text>
              <Text style={{ color: '#721c24', fontSize: '12px' }}>Rejected</Text>
            </Box>

            <Box
              padding="md"
              style={{
                background: '#d1ecf1',
                borderRadius: '6px',
                borderLeft: '4px solid #17a2b8',
                textAlign: 'center',
              }}
            >
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#0c5460' }}>
                {approvalStats.summary.last7Days}
              </Text>
              <Text style={{ color: '#0c5460', fontSize: '12px' }}>Last 7 Days</Text>
            </Box>

            <Box
              padding="md"
              style={{
                background: '#e2e3e5',
                borderRadius: '6px',
                borderLeft: '4px solid #6c757d',
                textAlign: 'center',
              }}
            >
              <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#383d41' }}>
                {approvalStats.summary.last30Days}
              </Text>
              <Text style={{ color: '#383d41', fontSize: '12px' }}>Last 30 Days</Text>
            </Box>
          </Box>
        </Box>
      )}

      {/* Top Performing Shops */}
      {topShops.length > 0 && (
        <Box
          padding="lg"
          marginBottom="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <H2 marginBottom="lg">Top Performing Shops</H2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6', background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>Rank</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>Shop Name</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>Location</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>
                  Transactions
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>
                  Points Used
                </th>
              </tr>
            </thead>
            <tbody>
              {topShops.map((shop, index) => (
                <tr
                  key={shop.shopId || index}
                  style={{
                    borderBottom: index < topShops.length - 1 ? '1px solid #f0f0f0' : 'none',
                    background: index % 2 === 0 ? 'white' : '#f8f9fa',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background:
                          index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '28px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{shop.shopName || 'N/A'}</td>
                  <td style={{ padding: '12px', color: '#666' }}>{shop.location || 'N/A'}</td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: '#17a2b8',
                    }}
                  >
                    {shop.totalTransactions || 0}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: '#6f42c1',
                    }}
                  >
                    {shop.totalPointsUsed || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      {/* Most Requested Products */}
      {approvalStats?.mostRequestedProducts?.length > 0 && (
        <Box
          padding="lg"
          style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <H2 marginBottom="lg">Most Requested Products</H2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6', background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>Rank</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>
                  Product Name
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>
                  Request Count
                </th>
              </tr>
            </thead>
            <tbody>
              {approvalStats.mostRequestedProducts.map((product, index) => (
                <tr
                  key={product.productId || index}
                  style={{
                    borderBottom:
                      index < approvalStats.mostRequestedProducts.length - 1
                        ? '1px solid #f0f0f0'
                        : 'none',
                    background: index % 2 === 0 ? 'white' : '#f8f9fa',
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: '#28a745',
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '28px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>
                    {product.productName || 'N/A'}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: '#28a745',
                    }}
                  >
                    {product.requestCount || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
