import React, { useState, useEffect } from 'react';
import { Box, H1, H2, Text, Loader } from '@adminjs/design-system';
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
        console.log('Approval Stats:', response.data?.approvalStats);
        console.log('Daily Stats:', response.data?.approvalStats?.dailyStats);
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

  const { overview, topShops = [], mostRedeemedRewards = [], approvalStats } = data;

  // Calculate percentages for visualization
  const totalApprovals =
    (approvalStats?.summary?.totalPending || 0) + (approvalStats?.summary?.totalApproved || 0);
  const pendingPercent =
    totalApprovals > 0
      ? ((approvalStats?.summary?.totalPending || 0) / totalApprovals) * 100
      : 0;
  const approvedPercent =
    totalApprovals > 0
      ? ((approvalStats?.summary?.totalApproved || 0) / totalApprovals) * 100
      : 0;

  const timelineData = approvalStats?.dailyStats || [];
  console.log('Timeline data in component:', timelineData);
  console.log('Timeline data length:', timelineData.length);
  console.log('First item:', timelineData[0]);
  console.log('Last item (Nov 5):', timelineData[timelineData.length - 1]);
  const hasAnyActivity = timelineData.some((d) => d.approved > 0 || d.pending > 0);
  console.log('Has any activity:', hasAnyActivity);
  const maxValue = Math.max(
    ...timelineData.map((d) => Math.max(d.approved || 0, d.pending || 0)),
    1,
  );
  console.log('Max value:', maxValue);

  // Log items with activity
  timelineData.forEach((item, idx) => {
    if (item.approved > 0 || item.pending > 0) {
      console.log(`Item ${idx} (${item.date}): approved=${item.approved}, pending=${item.pending}`);
    }
  });

  return (
    <Box padding="xxl" style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <H1 marginBottom="xxl">M-Star Loyalty Dashboard</H1>

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

      {/* Charts Section */}
      {approvalStats && totalApprovals > 0 && (
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          {/* Approval Status Bar Chart */}
          <Box
            padding="lg"
            style={{
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <H2 marginBottom="md">Approval Status Distribution</H2>
            <Box style={{ marginTop: '30px' }}>
              {/* Pending Bar */}
              <Box style={{ marginBottom: '20px' }}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <Text style={{ fontWeight: '600', color: '#856404' }}>Pending</Text>
                  <Text style={{ fontWeight: '600', color: '#856404' }}>
                    {approvalStats.summary.totalPending} ({pendingPercent.toFixed(1)}%)
                  </Text>
                </Box>
                <Box
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box
                    style={{
                      width: `${pendingPercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ffc107 0%, #ffb300 100%)',
                      transition: 'width 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </Box>
              </Box>

              {/* Approved Bar */}
              <Box style={{ marginBottom: '20px' }}>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <Text style={{ fontWeight: '600', color: '#155724' }}>Approved</Text>
                  <Text style={{ fontWeight: '600', color: '#155724' }}>
                    {approvalStats.summary.totalApproved} ({approvedPercent.toFixed(1)}%)
                  </Text>
                </Box>
                <Box
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Box
                    style={{
                      width: `${approvedPercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
                      transition: 'width 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </Box>
              </Box>

              {/* Summary */}
              <Box
                style={{
                  marginTop: '30px',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <Text style={{ fontSize: '14px', color: '#666' }}>Total Requests</Text>
                <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                  {totalApprovals}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Activity Timeline Chart */}
          {timelineData.length > 0 && (
            <Box
              padding="lg"
              style={{
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <H2 marginBottom="md">Recent Activity Trend (Last 14 Days)</H2>
              <Box style={{ marginTop: '30px' }}>
                {!hasAnyActivity ? (
                  <Box
                    style={{
                      padding: '60px 20px',
                      textAlign: 'center',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                    }}
                  >
                    <Text style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
                      No activity in the last 14 days
                    </Text>
                    <Text style={{ fontSize: '14px', color: '#999' }}>
                      Approval requests created in the last 14 days will appear here
                    </Text>
                  </Box>
                ) : (
                  <>
                    {/* Legend */}
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        marginBottom: '20px',
                      }}
                    >
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Box
                          style={{
                            width: '20px',
                            height: '3px',
                            background: '#28a745',
                            borderRadius: '2px',
                          }}
                        />
                        <Text style={{ fontSize: '12px', color: '#666' }}>Approved</Text>
                      </Box>
                      <Box style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Box
                          style={{
                            width: '20px',
                            height: '3px',
                            background: '#ffc107',
                            borderRadius: '2px',
                          }}
                        />
                        <Text style={{ fontSize: '12px', color: '#666' }}>Pending</Text>
                      </Box>
                    </Box>

                    {/* Chart */}
                    <Box
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    height: '200px',
                    padding: '10px 0',
                    borderBottom: '2px solid #dee2e6',
                    gap: '2px',
                  }}
                >
                  {timelineData.map((item, index) => {
                    const approvedHeight = (item.approved / maxValue) * 180;
                    const pendingHeight = (item.pending / maxValue) * 180;

                    // Debug log for items with data
                    if (item.approved > 0 || item.pending > 0) {
                      console.log(`Rendering bar ${index} (${item.date}): approved height=${approvedHeight}px, pending height=${pendingHeight}px`);
                    }

                    return (
                      <Box
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          flex: 1,
                          gap: '5px',
                        }}
                      >
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px',
                            height: '180px',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <Box
                            style={{
                              width: '100%',
                              maxWidth: '30px',
                              minWidth: '20px',
                              height: `${approvedHeight}px`,
                              minHeight: approvedHeight > 0 ? '5px' : '0px',
                              background: '#28a745',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.5s ease',
                              border: '1px solid #1e7e34',
                            }}
                            title={`Approved: ${item.approved}`}
                          />
                          <Box
                            style={{
                              width: '100%',
                              maxWidth: '30px',
                              minWidth: '20px',
                              height: `${pendingHeight}px`,
                              minHeight: pendingHeight > 0 ? '5px' : '0px',
                              background: '#ffc107',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.5s ease',
                              border: '1px solid #e0a800',
                            }}
                            title={`Pending: ${item.pending}`}
                          />
                        </Box>
                        <Text
                          style={{
                            fontSize: '9px',
                            color: '#999',
                            transform: 'rotate(-45deg)',
                            whiteSpace: 'nowrap',
                            marginTop: '10px',
                          }}
                        >
                          {item.date}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Tables Grid Section */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        {/* Top Performing Shops */}
        {topShops.length > 0 && (
          <Box
            padding="lg"
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

      {/* Most Collected Gifts Section */}
      {mostRedeemedRewards.length > 0 && (
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          {/* Most Collected Gifts Table */}
          <Box
            padding="lg"
            style={{
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <H2 marginBottom="lg">Most Collected Gifts</H2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #dee2e6', background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>Rank</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#495057' }}>
                  Reward Name
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>
                  Redemptions
                </th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#495057' }}>
                  Total Points Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {mostRedeemedRewards.map((reward, index) => (
                <tr
                  key={reward.rewardId || index}
                  style={{
                    borderBottom:
                      index < mostRedeemedRewards.length - 1 ? '1px solid #f0f0f0' : 'none',
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
                        background: '#6f42c1',
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
                    {reward.rewardName || 'N/A'}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: '#17a2b8',
                    }}
                  >
                    {reward.redemptionCount || 0}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: '#6f42c1',
                    }}
                  >
                    {reward.totalPointsSpent || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </Box>

          {/* Redemptions Chart */}
          <Box
            padding="lg"
            style={{
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <H2 marginBottom="md">Redemption Distribution</H2>
            <Box style={{ marginTop: '30px' }}>
              {mostRedeemedRewards.slice(0, 5).map((reward, index) => {
                const maxRedemptions = Math.max(
                  ...mostRedeemedRewards.slice(0, 5).map((r) => parseInt(r.redemptionCount) || 0),
                  1,
                );
                const barWidth =
                  ((parseInt(reward.redemptionCount) || 0) / maxRedemptions) * 100;

                return (
                  <Box key={reward.rewardId || index} style={{ marginBottom: '20px' }}>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: '600',
                          color: '#495057',
                          fontSize: '14px',
                          maxWidth: '60%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={reward.rewardName}
                      >
                        {reward.rewardName}
                      </Text>
                      <Text style={{ fontWeight: '600', color: '#6f42c1', fontSize: '14px' }}>
                        {reward.redemptionCount} redemptions
                      </Text>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        height: '30px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Box
                        style={{
                          width: `${barWidth}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #6f42c1 0%, #9b59b6 100%)',
                          transition: 'width 1s ease',
                          display: 'flex',
                          alignItems: 'center',
                          paddingLeft: '10px',
                        }}
                      >
                        <Text style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                          {reward.totalPointsSpent} pts
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })}

              {/* Summary */}
              <Box
                style={{
                  marginTop: '30px',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <Text style={{ fontSize: '14px', color: '#666' }}>Total Redemptions</Text>
                <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#6f42c1' }}>
                  {mostRedeemedRewards.reduce(
                    (sum, r) => sum + (parseInt(r.redemptionCount) || 0),
                    0,
                  )}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
