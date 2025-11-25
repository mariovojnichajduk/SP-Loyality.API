(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  const Dashboard = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const api = new adminjs.ApiClient();
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
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Loader, null), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          marginTop: '20px'
        }
      }, "Loading statistics..."));
    }
    if (!data || !data.overview) {
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "No statistics available"));
    }
    const {
      overview,
      topShops = [],
      mostRedeemedRewards = [],
      approvalStats
    } = data;

    // Calculate percentages for visualization
    const totalApprovals = (approvalStats?.summary?.totalPending || 0) + (approvalStats?.summary?.totalApproved || 0);
    const pendingPercent = totalApprovals > 0 ? (approvalStats?.summary?.totalPending || 0) / totalApprovals * 100 : 0;
    const approvedPercent = totalApprovals > 0 ? (approvalStats?.summary?.totalApproved || 0) / totalApprovals * 100 : 0;
    const timelineData = approvalStats?.dailyStats || [];
    console.log('Timeline data in component:', timelineData);
    console.log('Timeline data length:', timelineData.length);
    console.log('First item:', timelineData[0]);
    console.log('Last item (Nov 5):', timelineData[timelineData.length - 1]);
    const hasAnyActivity = timelineData.some(d => d.approved > 0 || d.pending > 0);
    console.log('Has any activity:', hasAnyActivity);
    const maxValue = Math.max(...timelineData.map(d => Math.max(d.approved || 0, d.pending || 0)), 1);
    console.log('Max value:', maxValue);

    // Log items with activity
    timelineData.forEach((item, idx) => {
      if (item.approved > 0 || item.pending > 0) {
        console.log(`Item ${idx} (${item.date}): approved=${item.approved}, pending=${item.pending}`);
      }
    });
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "xxl",
      style: {
        background: '#f5f5f5',
        minHeight: '100vh'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H1, {
      marginBottom: "xxl"
    }, "SP Loyalty Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#007bff',
        marginBottom: '8px'
      }
    }, overview.totalUsers || 0), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#666',
        fontSize: '14px',
        fontWeight: '500'
      }
    }, "Total Users")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: '8px'
      }
    }, overview.totalShops || 0), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#666',
        fontSize: '14px',
        fontWeight: '500'
      }
    }, "Total Shops")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#17a2b8',
        marginBottom: '8px'
      }
    }, overview.totalTransactions || 0), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#666',
        fontSize: '14px',
        fontWeight: '500'
      }
    }, "Transactions")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#ffc107',
        marginBottom: '8px'
      }
    }, overview.totalApprovalRequests || 0), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#666',
        fontSize: '14px',
        fontWeight: '500'
      }
    }, "Approval Requests")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#6f42c1',
        marginBottom: '8px'
      }
    }, overview.totalPointsUsed || 0), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#666',
        fontSize: '14px',
        fontWeight: '500'
      }
    }, "Total Points Used"))), approvalStats && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      marginBottom: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "lg"
    }, "Approval Requests Status"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "md",
      style: {
        background: '#fff3cd',
        borderRadius: '6px',
        borderLeft: '4px solid #ffc107',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#856404'
      }
    }, approvalStats.summary.totalPending), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#856404',
        fontSize: '12px'
      }
    }, "Pending")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "md",
      style: {
        background: '#d4edda',
        borderRadius: '6px',
        borderLeft: '4px solid #28a745',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#155724'
      }
    }, approvalStats.summary.totalApproved), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#155724',
        fontSize: '12px'
      }
    }, "Approved")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "md",
      style: {
        background: '#d1ecf1',
        borderRadius: '6px',
        borderLeft: '4px solid #17a2b8',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#0c5460'
      }
    }, approvalStats.summary.last7Days), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#0c5460',
        fontSize: '12px'
      }
    }, "Last 7 Days")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "md",
      style: {
        background: '#e2e3e5',
        borderRadius: '6px',
        borderLeft: '4px solid #6c757d',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#383d41'
      }
    }, approvalStats.summary.last30Days), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#383d41',
        fontSize: '12px'
      }
    }, "Last 30 Days")))), approvalStats && totalApprovals > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "md"
    }, "Approval Status Distribution"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginTop: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontWeight: '600',
        color: '#856404'
      }
    }, "Pending"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontWeight: '600',
        color: '#856404'
      }
    }, approvalStats.summary.totalPending, " (", pendingPercent.toFixed(1), "%)")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        width: '100%',
        height: '40px',
        background: '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        width: `${pendingPercent}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #ffc107 0%, #ffb300 100%)',
        transition: 'width 1s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontWeight: '600',
        color: '#155724'
      }
    }, "Approved"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontWeight: '600',
        color: '#155724'
      }
    }, approvalStats.summary.totalApproved, " (", approvedPercent.toFixed(1), "%)")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        width: '100%',
        height: '40px',
        background: '#f8f9fa',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        width: `${approvedPercent}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #28a745 0%, #20c997 100%)',
        transition: 'width 1s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginTop: '30px',
        padding: '15px',
        background: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '14px',
        color: '#666'
      }
    }, "Total Requests"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333'
      }
    }, totalApprovals)))), timelineData.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "md"
    }, "Recent Activity Trend (Last 14 Days)"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginTop: '30px'
      }
    }, !hasAnyActivity ? /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        padding: '60px 20px',
        textAlign: 'center',
        background: '#f8f9fa',
        borderRadius: '8px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '10px'
      }
    }, "No activity in the last 14 days"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '14px',
        color: '#999'
      }
    }, "Approval requests created in the last 14 days will appear here")) : /*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        width: '20px',
        height: '3px',
        background: '#28a745',
        borderRadius: '2px'
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '12px',
        color: '#666'
      }
    }, "Approved")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        width: '20px',
        height: '3px',
        background: '#ffc107',
        borderRadius: '2px'
      }
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '12px',
        color: '#666'
      }
    }, "Pending"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '200px',
        padding: '10px 0',
        borderBottom: '2px solid #dee2e6',
        gap: '2px'
      }
    }, timelineData.map((item, index) => {
      const approvedHeight = item.approved / maxValue * 180;
      const pendingHeight = item.pending / maxValue * 180;

      // Debug log for items with data
      if (item.approved > 0 || item.pending > 0) {
        console.log(`Rendering bar ${index} (${item.date}): approved height=${approvedHeight}px, pending height=${pendingHeight}px`);
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: index,
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          gap: '5px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          height: '180px',
          justifyContent: 'flex-end'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: '100%',
          maxWidth: '30px',
          minWidth: '20px',
          height: `${approvedHeight}px`,
          minHeight: approvedHeight > 0 ? '5px' : '0px',
          background: '#28a745',
          borderRadius: '4px 4px 0 0',
          transition: 'height 0.5s ease',
          border: '1px solid #1e7e34'
        },
        title: `Approved: ${item.approved}`
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: '100%',
          maxWidth: '30px',
          minWidth: '20px',
          height: `${pendingHeight}px`,
          minHeight: pendingHeight > 0 ? '5px' : '0px',
          background: '#ffc107',
          borderRadius: '4px 4px 0 0',
          transition: 'height 0.5s ease',
          border: '1px solid #e0a800'
        },
        title: `Pending: ${item.pending}`
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontSize: '9px',
          color: '#999',
          transform: 'rotate(-45deg)',
          whiteSpace: 'nowrap',
          marginTop: '10px'
        }
      }, item.date));
    })))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }
    }, topShops.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "lg"
    }, "Top Performing Shops"), /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #dee2e6',
        background: '#f8f9fa'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Rank"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Shop Name"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Location"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'right',
        color: '#495057'
      }
    }, "Transactions"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'right',
        color: '#495057'
      }
    }, "Points Used"))), /*#__PURE__*/React__default.default.createElement("tbody", null, topShops.map((shop, index) => /*#__PURE__*/React__default.default.createElement("tr", {
      key: shop.shopId || index,
      style: {
        borderBottom: index < topShops.length - 1 ? '1px solid #f0f0f0' : 'none',
        background: index % 2 === 0 ? 'white' : '#f8f9fa'
      }
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        display: 'inline-block',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
        color: 'white',
        textAlign: 'center',
        lineHeight: '28px',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    }, index + 1)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        fontWeight: '500'
      }
    }, shop.shopName || 'N/A'), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        color: '#666'
      }
    }, shop.location || 'N/A'), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#17a2b8'
      }
    }, shop.totalTransactions || 0), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#6f42c1'
      }
    }, shop.totalPointsUsed || 0)))))), approvalStats?.mostRequestedProducts?.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "lg"
    }, "Most Requested Products"), /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #dee2e6',
        background: '#f8f9fa'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Rank"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Product Name"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'right',
        color: '#495057'
      }
    }, "Request Count"))), /*#__PURE__*/React__default.default.createElement("tbody", null, approvalStats.mostRequestedProducts.map((product, index) => /*#__PURE__*/React__default.default.createElement("tr", {
      key: product.productId || index,
      style: {
        borderBottom: index < approvalStats.mostRequestedProducts.length - 1 ? '1px solid #f0f0f0' : 'none',
        background: index % 2 === 0 ? 'white' : '#f8f9fa'
      }
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        display: 'inline-block',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#28a745',
        color: 'white',
        textAlign: 'center',
        lineHeight: '28px',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    }, index + 1)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        fontWeight: '500'
      }
    }, product.productName || 'N/A'), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#28a745'
      }
    }, product.requestCount || 0))))))), mostRedeemedRewards.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "lg"
    }, "Most Collected Gifts"), /*#__PURE__*/React__default.default.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React__default.default.createElement("thead", null, /*#__PURE__*/React__default.default.createElement("tr", {
      style: {
        borderBottom: '2px solid #dee2e6',
        background: '#f8f9fa'
      }
    }, /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Rank"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'left',
        color: '#495057'
      }
    }, "Reward Name"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'right',
        color: '#495057'
      }
    }, "Redemptions"), /*#__PURE__*/React__default.default.createElement("th", {
      style: {
        padding: '12px',
        textAlign: 'right',
        color: '#495057'
      }
    }, "Total Points Spent"))), /*#__PURE__*/React__default.default.createElement("tbody", null, mostRedeemedRewards.map((reward, index) => /*#__PURE__*/React__default.default.createElement("tr", {
      key: reward.rewardId || index,
      style: {
        borderBottom: index < mostRedeemedRewards.length - 1 ? '1px solid #f0f0f0' : 'none',
        background: index % 2 === 0 ? 'white' : '#f8f9fa'
      }
    }, /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px'
      }
    }, /*#__PURE__*/React__default.default.createElement("span", {
      style: {
        display: 'inline-block',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: '#6f42c1',
        color: 'white',
        textAlign: 'center',
        lineHeight: '28px',
        fontSize: '14px',
        fontWeight: 'bold'
      }
    }, index + 1)), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        fontWeight: '500'
      }
    }, reward.rewardName || 'N/A'), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#17a2b8'
      }
    }, reward.redemptionCount || 0), /*#__PURE__*/React__default.default.createElement("td", {
      style: {
        padding: '12px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#6f42c1'
      }
    }, reward.totalPointsSpent || 0)))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "lg",
      style: {
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
      marginBottom: "md"
    }, "Redemption Distribution"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginTop: '30px'
      }
    }, mostRedeemedRewards.slice(0, 5).map((reward, index) => {
      const maxRedemptions = Math.max(...mostRedeemedRewards.slice(0, 5).map(r => parseInt(r.redemptionCount) || 0), 1);
      const barWidth = (parseInt(reward.redemptionCount) || 0) / maxRedemptions * 100;
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: reward.rewardId || index,
        style: {
          marginBottom: '20px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontWeight: '600',
          color: '#495057',
          fontSize: '14px',
          maxWidth: '60%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        title: reward.rewardName
      }, reward.rewardName), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          fontWeight: '600',
          color: '#6f42c1',
          fontSize: '14px'
        }
      }, reward.redemptionCount, " redemptions")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: '100%',
          height: '30px',
          background: '#f8f9fa',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: `${barWidth}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #6f42c1 0%, #9b59b6 100%)',
          transition: 'width 1s ease',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        style: {
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }
      }, reward.totalPointsSpent, " pts"))));
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      style: {
        marginTop: '30px',
        padding: '15px',
        background: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '14px',
        color: '#666'
      }
    }, "Total Redemptions"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#6f42c1'
      }
    }, mostRedeemedRewards.reduce((sum, r) => sum + (parseInt(r.redemptionCount) || 0), 0)))))));
  };

  const ApproveProduct = props => {
    const {
      record,
      resource
    } = props;
    const [pointValue, setPointValue] = React.useState(record.params.pointValue || 10);
    const [shopId, setShopId] = React.useState(record.params.shopId || '');
    const [loading, setLoading] = React.useState(false);
    const addNotice = adminjs.useNotice();
    const api = new adminjs.ApiClient();
    const handleApprove = async () => {
      if (!pointValue || pointValue <= 0) {
        addNotice({
          message: 'Please enter a valid point value greater than 0',
          type: 'error'
        });
        return;
      }
      setLoading(true);
      try {
        const response = await api.recordAction({
          resourceId: resource.id,
          recordId: record.id,
          actionName: 'approve',
          data: {
            pointValue: parseInt(pointValue),
            shopId: shopId || null
          }
        });
        if (response.data.notice) {
          addNotice(response.data.notice);
        }
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        }
      } catch (error) {
        addNotice({
          message: `Error: ${error.message}`,
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      padding: "xxl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
      message: "Set the point value for this product and approve it. All users who requested this product will be rewarded.",
      variant: "info"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Product Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: record.params.name,
      disabled: true
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Point Value *"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      type: "number",
      value: pointValue,
      onChange: e => setPointValue(e.target.value),
      placeholder: "Enter point value",
      min: "1"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      marginBottom: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Shop ID (optional)"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      value: shopId,
      onChange: e => setShopId(e.target.value),
      placeholder: "Enter shop UUID or leave empty"
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "primary",
      onClick: handleApprove,
      disabled: loading
    }, loading ? 'Approving...' : 'Approve Product'), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "text",
      onClick: () => window.history.back(),
      ml: "default"
    }, "Cancel")));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Dashboard = Dashboard;
  AdminJS.UserComponents.ApproveProduct = ApproveProduct;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2Rhc2hib2FyZC5qc3giLCIuLi9kaXN0L2FkbWluL2FwcHJvdmUtcHJvZHVjdC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDEsIEgyLCBUZXh0LCBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0RGFzaGJvYXJkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXNoYm9hcmQgQVBJIHJlc3BvbnNlOicsIHJlc3BvbnNlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rhc2hib2FyZCBkYXRhOicsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnT3ZlcnZpZXc6JywgcmVzcG9uc2UuZGF0YT8ub3ZlcnZpZXcpO1xuICAgICAgICBjb25zb2xlLmxvZygnQXBwcm92YWwgU3RhdHM6JywgcmVzcG9uc2UuZGF0YT8uYXBwcm92YWxTdGF0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEYWlseSBTdGF0czonLCByZXNwb25zZS5kYXRhPy5hcHByb3ZhbFN0YXRzPy5kYWlseVN0YXRzKTtcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgZGF0YTonLCBlcnJvcik7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggcGFkZGluZz1cInh4bFwiIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgPFRleHQgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMjBweCcgfX0+TG9hZGluZyBzdGF0aXN0aWNzLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghZGF0YSB8fCAhZGF0YS5vdmVydmlldykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIj5cbiAgICAgICAgPFRleHQ+Tm8gc3RhdGlzdGljcyBhdmFpbGFibGU8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgeyBvdmVydmlldywgdG9wU2hvcHMgPSBbXSwgbW9zdFJlZGVlbWVkUmV3YXJkcyA9IFtdLCBhcHByb3ZhbFN0YXRzIH0gPSBkYXRhO1xuXG4gIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlcyBmb3IgdmlzdWFsaXphdGlvblxuICBjb25zdCB0b3RhbEFwcHJvdmFscyA9XG4gICAgKGFwcHJvdmFsU3RhdHM/LnN1bW1hcnk/LnRvdGFsUGVuZGluZyB8fCAwKSArIChhcHByb3ZhbFN0YXRzPy5zdW1tYXJ5Py50b3RhbEFwcHJvdmVkIHx8IDApO1xuICBjb25zdCBwZW5kaW5nUGVyY2VudCA9XG4gICAgdG90YWxBcHByb3ZhbHMgPiAwXG4gICAgICA/ICgoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxQZW5kaW5nIHx8IDApIC8gdG90YWxBcHByb3ZhbHMpICogMTAwXG4gICAgICA6IDA7XG4gIGNvbnN0IGFwcHJvdmVkUGVyY2VudCA9XG4gICAgdG90YWxBcHByb3ZhbHMgPiAwXG4gICAgICA/ICgoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxBcHByb3ZlZCB8fCAwKSAvIHRvdGFsQXBwcm92YWxzKSAqIDEwMFxuICAgICAgOiAwO1xuXG4gIGNvbnN0IHRpbWVsaW5lRGF0YSA9IGFwcHJvdmFsU3RhdHM/LmRhaWx5U3RhdHMgfHwgW107XG4gIGNvbnNvbGUubG9nKCdUaW1lbGluZSBkYXRhIGluIGNvbXBvbmVudDonLCB0aW1lbGluZURhdGEpO1xuICBjb25zb2xlLmxvZygnVGltZWxpbmUgZGF0YSBsZW5ndGg6JywgdGltZWxpbmVEYXRhLmxlbmd0aCk7XG4gIGNvbnNvbGUubG9nKCdGaXJzdCBpdGVtOicsIHRpbWVsaW5lRGF0YVswXSk7XG4gIGNvbnNvbGUubG9nKCdMYXN0IGl0ZW0gKE5vdiA1KTonLCB0aW1lbGluZURhdGFbdGltZWxpbmVEYXRhLmxlbmd0aCAtIDFdKTtcbiAgY29uc3QgaGFzQW55QWN0aXZpdHkgPSB0aW1lbGluZURhdGEuc29tZSgoZCkgPT4gZC5hcHByb3ZlZCA+IDAgfHwgZC5wZW5kaW5nID4gMCk7XG4gIGNvbnNvbGUubG9nKCdIYXMgYW55IGFjdGl2aXR5OicsIGhhc0FueUFjdGl2aXR5KTtcbiAgY29uc3QgbWF4VmFsdWUgPSBNYXRoLm1heChcbiAgICAuLi50aW1lbGluZURhdGEubWFwKChkKSA9PiBNYXRoLm1heChkLmFwcHJvdmVkIHx8IDAsIGQucGVuZGluZyB8fCAwKSksXG4gICAgMSxcbiAgKTtcbiAgY29uc29sZS5sb2coJ01heCB2YWx1ZTonLCBtYXhWYWx1ZSk7XG5cbiAgLy8gTG9nIGl0ZW1zIHdpdGggYWN0aXZpdHlcbiAgdGltZWxpbmVEYXRhLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xuICAgIGlmIChpdGVtLmFwcHJvdmVkID4gMCB8fCBpdGVtLnBlbmRpbmcgPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhgSXRlbSAke2lkeH0gKCR7aXRlbS5kYXRlfSk6IGFwcHJvdmVkPSR7aXRlbS5hcHByb3ZlZH0sIHBlbmRpbmc9JHtpdGVtLnBlbmRpbmd9YCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggcGFkZGluZz1cInh4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjZjVmNWY1JywgbWluSGVpZ2h0OiAnMTAwdmgnIH19PlxuICAgICAgPEgxIG1hcmdpbkJvdHRvbT1cInh4bFwiPlNQIExveWFsdHkgRGFzaGJvYXJkPC9IMT5cblxuICAgICAgey8qIE92ZXJhbGwgU3RhdGlzdGljcyBDYXJkcyAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKScsXG4gICAgICAgICAgZ2FwOiAnMjBweCcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMDA3YmZmJyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVXNlcnMgfHwgMH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+VG90YWwgVXNlcnM8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMjhhNzQ1JyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsU2hvcHMgfHwgMH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+VG90YWwgU2hvcHM8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMTdhMmI4JyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVHJhbnNhY3Rpb25zIHx8IDB9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzY2NicsIGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlRyYW5zYWN0aW9uczwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICBjb2xvcjogJyNmZmMxMDcnLFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxBcHByb3ZhbFJlcXVlc3RzIHx8IDB9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzY2NicsIGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlxuICAgICAgICAgICAgQXBwcm92YWwgUmVxdWVzdHNcbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjNmY0MmMxJyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsUG9pbnRzVXNlZCB8fCAwfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cbiAgICAgICAgICAgIFRvdGFsIFBvaW50cyBVc2VkXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQXBwcm92YWwgUmVxdWVzdHMgU3VtbWFyeSAqL31cbiAgICAgIHthcHByb3ZhbFN0YXRzICYmIChcbiAgICAgICAgPEJveFxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgbWFyZ2luQm90dG9tPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5BcHByb3ZhbCBSZXF1ZXN0cyBTdGF0dXM8L0gyPlxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE1MHB4LCAxZnIpKScsXG4gICAgICAgICAgICAgIGdhcDogJzE1cHgnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmYzY2QnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjZmZjMTA3JyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzg1NjQwNCcgfX0+XG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbFBlbmRpbmd9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjODU2NDA0JywgZm9udFNpemU6ICcxMnB4JyB9fT5QZW5kaW5nPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgcGFkZGluZz1cIm1kXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Q0ZWRkYScsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICMyOGE3NDUnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMTU1NzI0JyB9fT5cbiAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5LnRvdGFsQXBwcm92ZWR9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjMTU1NzI0JywgZm9udFNpemU6ICcxMnB4JyB9fT5BcHByb3ZlZDwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNkMWVjZjEnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjMTdhMmI4JyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzBjNTQ2MCcgfX0+XG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS5sYXN0N0RheXN9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjMGM1NDYwJywgZm9udFNpemU6ICcxMnB4JyB9fT5MYXN0IDcgRGF5czwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNlMmUzZTUnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjNmM3NTdkJyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzM4M2Q0MScgfX0+XG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS5sYXN0MzBEYXlzfVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzM4M2Q0MScsIGZvbnRTaXplOiAnMTJweCcgfX0+TGFzdCAzMCBEYXlzPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgey8qIENoYXJ0cyBTZWN0aW9uICovfVxuICAgICAge2FwcHJvdmFsU3RhdHMgJiYgdG90YWxBcHByb3ZhbHMgPiAwICYmIChcbiAgICAgICAgPEJveFxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoNDAwcHgsIDFmcikpJyxcbiAgICAgICAgICAgIGdhcDogJzIwcHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHsvKiBBcHByb3ZhbCBTdGF0dXMgQmFyIENoYXJ0ICovfVxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5BcHByb3ZhbCBTdGF0dXMgRGlzdHJpYnV0aW9uPC9IMj5cbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgbWFyZ2luVG9wOiAnMzBweCcgfX0+XG4gICAgICAgICAgICAgIHsvKiBQZW5kaW5nIEJhciAqL31cbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyM4NTY0MDQnIH19PlBlbmRpbmc8L1RleHQ+XG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjODU2NDA0JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbFBlbmRpbmd9ICh7cGVuZGluZ1BlcmNlbnQudG9GaXhlZCgxKX0lKVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7cGVuZGluZ1BlcmNlbnR9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgI2ZmYzEwNyAwJSwgI2ZmYjMwMCAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICB7LyogQXBwcm92ZWQgQmFyICovfVxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiAnIzE1NTcyNCcgfX0+QXBwcm92ZWQ8L1RleHQ+XG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjMTU1NzI0JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbEFwcHJvdmVkfSAoe2FwcHJvdmVkUGVyY2VudC50b0ZpeGVkKDEpfSUpXG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHthcHByb3ZlZFBlcmNlbnR9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgIzI4YTc0NSAwJSwgIzIwYzk5NyAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICB7LyogU3VtbWFyeSAqL31cbiAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICczMHB4JyxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNXB4JyxcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzE0cHgnLCBjb2xvcjogJyM2NjYnIH19PlRvdGFsIFJlcXVlc3RzPC9UZXh0PlxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgICAgICAgICAgIHt0b3RhbEFwcHJvdmFsc31cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICB7LyogQWN0aXZpdHkgVGltZWxpbmUgQ2hhcnQgKi99XG4gICAgICAgICAge3RpbWVsaW5lRGF0YS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5SZWNlbnQgQWN0aXZpdHkgVHJlbmQgKExhc3QgMTQgRGF5cyk8L0gyPlxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpblRvcDogJzMwcHgnIH19PlxuICAgICAgICAgICAgICAgIHshaGFzQW55QWN0aXZpdHkgPyAoXG4gICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzYwcHggMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxNnB4JywgY29sb3I6ICcjNjY2JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gYWN0aXZpdHkgaW4gdGhlIGxhc3QgMTQgZGF5c1xuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzk5OScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgQXBwcm92YWwgcmVxdWVzdHMgY3JlYXRlZCBpbiB0aGUgbGFzdCAxNCBkYXlzIHdpbGwgYXBwZWFyIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBMZWdlbmQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM2NjYnIH19PkFwcHJvdmVkPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzNweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmMxMDcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjY2JyB9fT5QZW5kaW5nPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICAgICAgICB7LyogQ2hhcnQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAwJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLFxuICAgICAgICAgICAgICAgICAgICBnYXA6ICcycHgnLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7dGltZWxpbmVEYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBwcm92ZWRIZWlnaHQgPSAoaXRlbS5hcHByb3ZlZCAvIG1heFZhbHVlKSAqIDE4MDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVuZGluZ0hlaWdodCA9IChpdGVtLnBlbmRpbmcgLyBtYXhWYWx1ZSkgKiAxODA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRGVidWcgbG9nIGZvciBpdGVtcyB3aXRoIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uYXBwcm92ZWQgPiAwIHx8IGl0ZW0ucGVuZGluZyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVuZGVyaW5nIGJhciAke2luZGV4fSAoJHtpdGVtLmRhdGV9KTogYXBwcm92ZWQgaGVpZ2h0PSR7YXBwcm92ZWRIZWlnaHR9cHgsIHBlbmRpbmcgaGVpZ2h0PSR7cGVuZGluZ0hlaWdodH1weGApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJzVweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxODBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHthcHByb3ZlZEhlaWdodH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IGFwcHJvdmVkSGVpZ2h0ID4gMCA/ICc1cHgnIDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNXMgZWFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgIzFlN2UzNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YEFwcHJvdmVkOiAke2l0ZW0uYXBwcm92ZWR9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICczMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3BlbmRpbmdIZWlnaHR9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBwZW5kaW5nSGVpZ2h0ID4gMCA/ICc1cHgnIDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmYzEwNycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNXMgZWFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwYTgwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YFBlbmRpbmc6ICR7aXRlbS5wZW5kaW5nfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICc5cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5kYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgey8qIFRhYmxlcyBHcmlkIFNlY3Rpb24gKi99XG4gICAgICA8Qm94XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSknLFxuICAgICAgICAgIGdhcDogJzIwcHgnLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7LyogVG9wIFBlcmZvcm1pbmcgU2hvcHMgKi99XG4gICAgICAgIHt0b3BTaG9wcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEgyIG1hcmdpbkJvdHRvbT1cImxnXCI+VG9wIFBlcmZvcm1pbmcgU2hvcHM8L0gyPlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyB9fT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZGVlMmU2JywgYmFja2dyb3VuZDogJyNmOGY5ZmEnIH19PlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlJhbms8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlNob3AgTmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+TG9jYXRpb248L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cbiAgICAgICAgICAgICAgICAgIFRyYW5zYWN0aW9uc1xuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgUG9pbnRzIFVzZWRcbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3RvcFNob3BzLm1hcCgoc2hvcCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICAgIGtleT17c2hvcC5zaG9wSWQgfHwgaW5kZXh9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206IGluZGV4IDwgdG9wU2hvcHMubGVuZ3RoIC0gMSA/ICcxcHggc29saWQgI2YwZjBmMCcgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID09PSAwID8gJyNGRkQ3MDAnIDogaW5kZXggPT09IDEgPyAnI0MwQzBDMCcgOiAnI0NEN0YzMicsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7aW5kZXggKyAxfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+e3Nob3Auc2hvcE5hbWUgfHwgJ04vQSd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGNvbG9yOiAnIzY2NicgfX0+e3Nob3AubG9jYXRpb24gfHwgJ04vQSd9PC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzE3YTJiOCcsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtzaG9wLnRvdGFsVHJhbnNhY3Rpb25zIHx8IDB9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNmY0MmMxJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Nob3AudG90YWxQb2ludHNVc2VkIHx8IDB9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBNb3N0IFJlcXVlc3RlZCBQcm9kdWN0cyAqL31cbiAgICAgICAge2FwcHJvdmFsU3RhdHM/Lm1vc3RSZXF1ZXN0ZWRQcm9kdWN0cz8ubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJsZ1wiPk1vc3QgUmVxdWVzdGVkIFByb2R1Y3RzPC9IMj5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScgfX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsIGJhY2tncm91bmQ6ICcjZjhmOWZhJyB9fT5cbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5SYW5rPC90aD5cbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cbiAgICAgICAgICAgICAgICAgIFByb2R1Y3QgTmFtZVxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgUmVxdWVzdCBDb3VudFxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5tb3N0UmVxdWVzdGVkUHJvZHVjdHMubWFwKChwcm9kdWN0LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAga2V5PXtwcm9kdWN0LnByb2R1Y3RJZCB8fCBpbmRleH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTpcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleCA8IGFwcHJvdmFsU3RhdHMubW9zdFJlcXVlc3RlZFByb2R1Y3RzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJzFweCBzb2xpZCAjZjBmMGYwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjhhNzQ1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtpbmRleCArIDF9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cbiAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3QucHJvZHVjdE5hbWUgfHwgJ04vQSd9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMjhhNzQ1JyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3QucmVxdWVzdENvdW50IHx8IDB9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICApfVxuICAgICAgPC9Cb3g+XG5cbiAgICAgIHsvKiBNb3N0IENvbGxlY3RlZCBHaWZ0cyBTZWN0aW9uICovfVxuICAgICAge21vc3RSZWRlZW1lZFJld2FyZHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDQwMHB4LCAxZnIpKScsXG4gICAgICAgICAgICBnYXA6ICcyMHB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7LyogTW9zdCBDb2xsZWN0ZWQgR2lmdHMgVGFibGUgKi99XG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJsZ1wiPk1vc3QgQ29sbGVjdGVkIEdpZnRzPC9IMj5cbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScgfX0+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsIGJhY2tncm91bmQ6ICcjZjhmOWZhJyB9fT5cbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5SYW5rPC90aD5cbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cbiAgICAgICAgICAgICAgICAgIFJld2FyZCBOYW1lXG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XG4gICAgICAgICAgICAgICAgICBSZWRlbXB0aW9uc1xuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgVG90YWwgUG9pbnRzIFNwZW50XG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHttb3N0UmVkZWVtZWRSZXdhcmRzLm1hcCgocmV3YXJkLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAga2V5PXtyZXdhcmQucmV3YXJkSWQgfHwgaW5kZXh9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206XG4gICAgICAgICAgICAgICAgICAgICAgaW5kZXggPCBtb3N0UmVkZWVtZWRSZXdhcmRzLmxlbmd0aCAtIDEgPyAnMXB4IHNvbGlkICNmMGYwZjAnIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNmOGY5ZmEnLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzZmNDJjMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7aW5kZXggKyAxfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmV3YXJkTmFtZSB8fCAnTi9BJ31cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMxN2EyYjgnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnJlZGVtcHRpb25Db3VudCB8fCAwfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZmNDJjMScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtyZXdhcmQudG90YWxQb2ludHNTcGVudCB8fCAwfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgIHsvKiBSZWRlbXB0aW9ucyBDaGFydCAqL31cbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEgyIG1hcmdpbkJvdHRvbT1cIm1kXCI+UmVkZW1wdGlvbiBEaXN0cmlidXRpb248L0gyPlxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Ub3A6ICczMHB4JyB9fT5cbiAgICAgICAgICAgICAge21vc3RSZWRlZW1lZFJld2FyZHMuc2xpY2UoMCwgNSkubWFwKChyZXdhcmQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4UmVkZW1wdGlvbnMgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgIC4uLm1vc3RSZWRlZW1lZFJld2FyZHMuc2xpY2UoMCwgNSkubWFwKChyKSA9PiBwYXJzZUludChyLnJlZGVtcHRpb25Db3VudCkgfHwgMCksXG4gICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFyV2lkdGggPVxuICAgICAgICAgICAgICAgICAgKChwYXJzZUludChyZXdhcmQucmVkZW1wdGlvbkNvdW50KSB8fCAwKSAvIG1heFJlZGVtcHRpb25zKSAqIDEwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8Qm94IGtleT17cmV3YXJkLnJld2FyZElkIHx8IGluZGV4fSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc2MDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0OTUwNTcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzYwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17cmV3YXJkLnJld2FyZE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Jld2FyZC5yZXdhcmROYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjNmY0MmMxJywgZm9udFNpemU6ICcxNHB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmVkZW1wdGlvbkNvdW50fSByZWRlbXB0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzMwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmOGY5ZmEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7YmFyV2lkdGh9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjNmY0MmMxIDAlLCAjOWI1OWI2IDEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJ3doaXRlJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogJ2JvbGQnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnRvdGFsUG9pbnRzU3BlbnR9IHB0c1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuXG4gICAgICAgICAgICAgIHsvKiBTdW1tYXJ5ICovfVxuICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzMwcHgnLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzE1cHgnLFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmOGY5ZmEnLFxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzY2NicgfX0+VG90YWwgUmVkZW1wdGlvbnM8L1RleHQ+XG4gICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICczMnB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyM2ZjQyYzEnIH19PlxuICAgICAgICAgICAgICAgICAge21vc3RSZWRlZW1lZFJld2FyZHMucmVkdWNlKFxuICAgICAgICAgICAgICAgICAgICAoc3VtLCByKSA9PiBzdW0gKyAocGFyc2VJbnQoci5yZWRlbXB0aW9uQ291bnQpIHx8IDApLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMYWJlbCwgSW5wdXQsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZU5vdGljZSwgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEFwcHJvdmVQcm9kdWN0ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVjb3JkLCByZXNvdXJjZSB9ID0gcHJvcHM7XG4gIGNvbnN0IFtwb2ludFZhbHVlLCBzZXRQb2ludFZhbHVlXSA9IHVzZVN0YXRlKHJlY29yZC5wYXJhbXMucG9pbnRWYWx1ZSB8fCAxMCk7XG4gIGNvbnN0IFtzaG9wSWQsIHNldFNob3BJZF0gPSB1c2VTdGF0ZShyZWNvcmQucGFyYW1zLnNob3BJZCB8fCAnJyk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcblxuICBjb25zdCBoYW5kbGVBcHByb3ZlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghcG9pbnRWYWx1ZSB8fCBwb2ludFZhbHVlIDw9IDApIHtcbiAgICAgIGFkZE5vdGljZSh7XG4gICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwb2ludCB2YWx1ZSBncmVhdGVyIHRoYW4gMCcsXG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlY29yZEFjdGlvbih7XG4gICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxuICAgICAgICByZWNvcmRJZDogcmVjb3JkLmlkLFxuICAgICAgICBhY3Rpb25OYW1lOiAnYXBwcm92ZScsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBwb2ludFZhbHVlOiBwYXJzZUludChwb2ludFZhbHVlKSxcbiAgICAgICAgICBzaG9wSWQ6IHNob3BJZCB8fCBudWxsLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLm5vdGljZSkge1xuICAgICAgICBhZGROb3RpY2UocmVzcG9uc2UuZGF0YS5ub3RpY2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YS5yZWRpcmVjdFVybCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmw7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGFkZE5vdGljZSh7XG4gICAgICAgIG1lc3NhZ2U6IGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBwYWRkaW5nPVwieHhsXCI+XG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XG4gICAgICAgIDxNZXNzYWdlQm94IG1lc3NhZ2U9XCJTZXQgdGhlIHBvaW50IHZhbHVlIGZvciB0aGlzIHByb2R1Y3QgYW5kIGFwcHJvdmUgaXQuIEFsbCB1c2VycyB3aG8gcmVxdWVzdGVkIHRoaXMgcHJvZHVjdCB3aWxsIGJlIHJld2FyZGVkLlwiIHZhcmlhbnQ9XCJpbmZvXCIgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XG4gICAgICAgIDxMYWJlbD5Qcm9kdWN0IE5hbWU8L0xhYmVsPlxuICAgICAgICA8SW5wdXQgdmFsdWU9e3JlY29yZC5wYXJhbXMubmFtZX0gZGlzYWJsZWQgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XG4gICAgICAgIDxMYWJlbCByZXF1aXJlZD5Qb2ludCBWYWx1ZSAqPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgdmFsdWU9e3BvaW50VmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQb2ludFZhbHVlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHBvaW50IHZhbHVlXCJcbiAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgLz5cbiAgICAgIDwvQm94PlxuXG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XG4gICAgICAgIDxMYWJlbD5TaG9wIElEIChvcHRpb25hbCk8L0xhYmVsPlxuICAgICAgICA8SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2hvcElkfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2hvcElkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHNob3AgVVVJRCBvciBsZWF2ZSBlbXB0eVwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveD5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBcHByb3ZlfVxuICAgICAgICAgIGRpc2FibGVkPXtsb2FkaW5nfVxuICAgICAgICA+XG4gICAgICAgICAge2xvYWRpbmcgPyAnQXBwcm92aW5nLi4uJyA6ICdBcHByb3ZlIFByb2R1Y3QnfVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB3aW5kb3cuaGlzdG9yeS5iYWNrKCl9XG4gICAgICAgICAgbWw9XCJkZWZhdWx0XCJcbiAgICAgICAgPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQm94PlxuICAgIDwvQm94PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwcm92ZVByb2R1Y3Q7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vZGlzdC9hZG1pbi9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IEFwcHJvdmVQcm9kdWN0IGZyb20gJy4uL2Rpc3QvYWRtaW4vYXBwcm92ZS1wcm9kdWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BcHByb3ZlUHJvZHVjdCA9IEFwcHJvdmVQcm9kdWN0Il0sIm5hbWVzIjpbIkRhc2hib2FyZCIsImRhdGEiLCJzZXREYXRhIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInVzZUVmZmVjdCIsImZldGNoRGF0YSIsImFwaSIsIkFwaUNsaWVudCIsInJlc3BvbnNlIiwiZ2V0RGFzaGJvYXJkIiwiY29uc29sZSIsImxvZyIsIm92ZXJ2aWV3IiwiYXBwcm92YWxTdGF0cyIsImRhaWx5U3RhdHMiLCJlcnJvciIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsInBhZGRpbmciLCJzdHlsZSIsInRleHRBbGlnbiIsIkxvYWRlciIsIlRleHQiLCJtYXJnaW5Ub3AiLCJ0b3BTaG9wcyIsIm1vc3RSZWRlZW1lZFJld2FyZHMiLCJ0b3RhbEFwcHJvdmFscyIsInN1bW1hcnkiLCJ0b3RhbFBlbmRpbmciLCJ0b3RhbEFwcHJvdmVkIiwicGVuZGluZ1BlcmNlbnQiLCJhcHByb3ZlZFBlcmNlbnQiLCJ0aW1lbGluZURhdGEiLCJsZW5ndGgiLCJoYXNBbnlBY3Rpdml0eSIsInNvbWUiLCJkIiwiYXBwcm92ZWQiLCJwZW5kaW5nIiwibWF4VmFsdWUiLCJNYXRoIiwibWF4IiwibWFwIiwiZm9yRWFjaCIsIml0ZW0iLCJpZHgiLCJkYXRlIiwiYmFja2dyb3VuZCIsIm1pbkhlaWdodCIsIkgxIiwibWFyZ2luQm90dG9tIiwiZGlzcGxheSIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJnYXAiLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJib3hTaGFkb3ciLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsInRvdGFsVXNlcnMiLCJ0b3RhbFNob3BzIiwidG90YWxUcmFuc2FjdGlvbnMiLCJ0b3RhbEFwcHJvdmFsUmVxdWVzdHMiLCJ0b3RhbFBvaW50c1VzZWQiLCJIMiIsImJvcmRlckxlZnQiLCJsYXN0N0RheXMiLCJsYXN0MzBEYXlzIiwianVzdGlmeUNvbnRlbnQiLCJ0b0ZpeGVkIiwid2lkdGgiLCJoZWlnaHQiLCJvdmVyZmxvdyIsInBvc2l0aW9uIiwidHJhbnNpdGlvbiIsImFsaWduSXRlbXMiLCJGcmFnbWVudCIsImJvcmRlckJvdHRvbSIsImluZGV4IiwiYXBwcm92ZWRIZWlnaHQiLCJwZW5kaW5nSGVpZ2h0Iiwia2V5IiwiZmxleERpcmVjdGlvbiIsImZsZXgiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwidGl0bGUiLCJ0cmFuc2Zvcm0iLCJ3aGl0ZVNwYWNlIiwiYm9yZGVyQ29sbGFwc2UiLCJzaG9wIiwic2hvcElkIiwibGluZUhlaWdodCIsInNob3BOYW1lIiwibG9jYXRpb24iLCJtb3N0UmVxdWVzdGVkUHJvZHVjdHMiLCJwcm9kdWN0IiwicHJvZHVjdElkIiwicHJvZHVjdE5hbWUiLCJyZXF1ZXN0Q291bnQiLCJyZXdhcmQiLCJyZXdhcmRJZCIsInJld2FyZE5hbWUiLCJyZWRlbXB0aW9uQ291bnQiLCJ0b3RhbFBvaW50c1NwZW50Iiwic2xpY2UiLCJtYXhSZWRlbXB0aW9ucyIsInIiLCJwYXJzZUludCIsImJhcldpZHRoIiwidGV4dE92ZXJmbG93IiwicGFkZGluZ0xlZnQiLCJyZWR1Y2UiLCJzdW0iLCJBcHByb3ZlUHJvZHVjdCIsInByb3BzIiwicmVjb3JkIiwicmVzb3VyY2UiLCJwb2ludFZhbHVlIiwic2V0UG9pbnRWYWx1ZSIsInBhcmFtcyIsInNldFNob3BJZCIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsImhhbmRsZUFwcHJvdmUiLCJtZXNzYWdlIiwidHlwZSIsInJlY29yZEFjdGlvbiIsInJlc291cmNlSWQiLCJpZCIsInJlY29yZElkIiwiYWN0aW9uTmFtZSIsIm5vdGljZSIsInJlZGlyZWN0VXJsIiwid2luZG93IiwiaHJlZiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50IiwiTGFiZWwiLCJJbnB1dCIsInZhbHVlIiwibmFtZSIsImRpc2FibGVkIiwicmVxdWlyZWQiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsIm1pbiIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJoaXN0b3J5IiwiYmFjayIsIm1sIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsU0FBUyxHQUFHQSxNQUFNO0lBQ3RCLE1BQU0sQ0FBQ0MsSUFBSSxFQUFFQyxPQUFPLENBQUMsR0FBR0MsY0FBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxNQUFNLENBQUNDLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdGLGNBQVEsQ0FBQyxJQUFJLENBQUM7RUFFNUNHLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0VBQ2QsSUFBQSxNQUFNQyxTQUFTLEdBQUcsWUFBWTtRQUM1QixJQUFJO0VBQ0YsUUFBQSxNQUFNQyxHQUFHLEdBQUcsSUFBSUMsaUJBQVMsRUFBRTtFQUMzQixRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNRixHQUFHLENBQUNHLFlBQVksRUFBRTtFQUN6Q0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMseUJBQXlCLEVBQUVILFFBQVEsQ0FBQztVQUNoREUsT0FBTyxDQUFDQyxHQUFH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
