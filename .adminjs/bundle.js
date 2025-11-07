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
    }, "M-Star Loyalty Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
    }, "Points Given"))), /*#__PURE__*/React__default.default.createElement("tbody", null, topShops.map((shop, index) => /*#__PURE__*/React__default.default.createElement("tr", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2Rhc2hib2FyZC5qc3giLCIuLi9kaXN0L2FkbWluL2FwcHJvdmUtcHJvZHVjdC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBIMSwgSDIsIFRleHQsIExvYWRlciB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0RGFzaGJvYXJkKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Rhc2hib2FyZCBBUEkgcmVzcG9uc2U6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXNoYm9hcmQgZGF0YTonLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnT3ZlcnZpZXc6JywgcmVzcG9uc2UuZGF0YT8ub3ZlcnZpZXcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHByb3ZhbCBTdGF0czonLCByZXNwb25zZS5kYXRhPy5hcHByb3ZhbFN0YXRzKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGFpbHkgU3RhdHM6JywgcmVzcG9uc2UuZGF0YT8uYXBwcm92YWxTdGF0cz8uZGFpbHlTdGF0cyk7XHJcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgZGF0YTonLCBlcnJvcik7XHJcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZmV0Y2hEYXRhKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBpZiAobG9hZGluZykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJveCBwYWRkaW5nPVwieHhsXCIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgPFRleHQgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMjBweCcgfX0+TG9hZGluZyBzdGF0aXN0aWNzLi4uPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWRhdGEgfHwgIWRhdGEub3ZlcnZpZXcpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxCb3ggcGFkZGluZz1cInh4bFwiPlxyXG4gICAgICAgIDxUZXh0Pk5vIHN0YXRpc3RpY3MgYXZhaWxhYmxlPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IG92ZXJ2aWV3LCB0b3BTaG9wcyA9IFtdLCBtb3N0UmVkZWVtZWRSZXdhcmRzID0gW10sIGFwcHJvdmFsU3RhdHMgfSA9IGRhdGE7XHJcblxyXG4gIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlcyBmb3IgdmlzdWFsaXphdGlvblxyXG4gIGNvbnN0IHRvdGFsQXBwcm92YWxzID1cclxuICAgIChhcHByb3ZhbFN0YXRzPy5zdW1tYXJ5Py50b3RhbFBlbmRpbmcgfHwgMCkgKyAoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxBcHByb3ZlZCB8fCAwKTtcclxuICBjb25zdCBwZW5kaW5nUGVyY2VudCA9XHJcbiAgICB0b3RhbEFwcHJvdmFscyA+IDBcclxuICAgICAgPyAoKGFwcHJvdmFsU3RhdHM/LnN1bW1hcnk/LnRvdGFsUGVuZGluZyB8fCAwKSAvIHRvdGFsQXBwcm92YWxzKSAqIDEwMFxyXG4gICAgICA6IDA7XHJcbiAgY29uc3QgYXBwcm92ZWRQZXJjZW50ID1cclxuICAgIHRvdGFsQXBwcm92YWxzID4gMFxyXG4gICAgICA/ICgoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxBcHByb3ZlZCB8fCAwKSAvIHRvdGFsQXBwcm92YWxzKSAqIDEwMFxyXG4gICAgICA6IDA7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lRGF0YSA9IGFwcHJvdmFsU3RhdHM/LmRhaWx5U3RhdHMgfHwgW107XHJcbiAgY29uc29sZS5sb2coJ1RpbWVsaW5lIGRhdGEgaW4gY29tcG9uZW50OicsIHRpbWVsaW5lRGF0YSk7XHJcbiAgY29uc29sZS5sb2coJ1RpbWVsaW5lIGRhdGEgbGVuZ3RoOicsIHRpbWVsaW5lRGF0YS5sZW5ndGgpO1xyXG4gIGNvbnNvbGUubG9nKCdGaXJzdCBpdGVtOicsIHRpbWVsaW5lRGF0YVswXSk7XHJcbiAgY29uc29sZS5sb2coJ0xhc3QgaXRlbSAoTm92IDUpOicsIHRpbWVsaW5lRGF0YVt0aW1lbGluZURhdGEubGVuZ3RoIC0gMV0pO1xyXG4gIGNvbnN0IGhhc0FueUFjdGl2aXR5ID0gdGltZWxpbmVEYXRhLnNvbWUoKGQpID0+IGQuYXBwcm92ZWQgPiAwIHx8IGQucGVuZGluZyA+IDApO1xyXG4gIGNvbnNvbGUubG9nKCdIYXMgYW55IGFjdGl2aXR5OicsIGhhc0FueUFjdGl2aXR5KTtcclxuICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KFxyXG4gICAgLi4udGltZWxpbmVEYXRhLm1hcCgoZCkgPT4gTWF0aC5tYXgoZC5hcHByb3ZlZCB8fCAwLCBkLnBlbmRpbmcgfHwgMCkpLFxyXG4gICAgMSxcclxuICApO1xyXG4gIGNvbnNvbGUubG9nKCdNYXggdmFsdWU6JywgbWF4VmFsdWUpO1xyXG5cclxuICAvLyBMb2cgaXRlbXMgd2l0aCBhY3Rpdml0eVxyXG4gIHRpbWVsaW5lRGF0YS5mb3JFYWNoKChpdGVtLCBpZHgpID0+IHtcclxuICAgIGlmIChpdGVtLmFwcHJvdmVkID4gMCB8fCBpdGVtLnBlbmRpbmcgPiAwKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBJdGVtICR7aWR4fSAoJHtpdGVtLmRhdGV9KTogYXBwcm92ZWQ9JHtpdGVtLmFwcHJvdmVkfSwgcGVuZGluZz0ke2l0ZW0ucGVuZGluZ31gKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggcGFkZGluZz1cInh4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjZjVmNWY1JywgbWluSGVpZ2h0OiAnMTAwdmgnIH19PlxyXG4gICAgICA8SDEgbWFyZ2luQm90dG9tPVwieHhsXCI+TS1TdGFyIExveWFsdHkgRGFzaGJvYXJkPC9IMT5cclxuXHJcbiAgICAgIHsvKiBPdmVyYWxsIFN0YXRpc3RpY3MgQ2FyZHMgKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxyXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKScsXHJcbiAgICAgICAgICBnYXA6ICcyMHB4JyxcclxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBmb250U2l6ZTogJzQycHgnLFxyXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICBjb2xvcjogJyMwMDdiZmYnLFxyXG4gICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtvdmVydmlldy50b3RhbFVzZXJzIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5Ub3RhbCBVc2VyczwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMjhhNzQ1JyxcclxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxTaG9wcyB8fCAwfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+VG90YWwgU2hvcHM8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzE3YTJiOCcsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVHJhbnNhY3Rpb25zIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5UcmFuc2FjdGlvbnM8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnI2ZmYzEwNycsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsQXBwcm92YWxSZXF1ZXN0cyB8fCAwfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+XHJcbiAgICAgICAgICAgIEFwcHJvdmFsIFJlcXVlc3RzXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzZmNDJjMScsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsUG9pbnRzVXNlZCB8fCAwfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+XHJcbiAgICAgICAgICAgIFRvdGFsIFBvaW50cyBVc2VkXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIEFwcHJvdmFsIFJlcXVlc3RzIFN1bW1hcnkgKi99XHJcbiAgICAgIHthcHByb3ZhbFN0YXRzICYmIChcclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tPVwibGdcIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEgyIG1hcmdpbkJvdHRvbT1cImxnXCI+QXBwcm92YWwgUmVxdWVzdHMgU3RhdHVzPC9IMj5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXHJcbiAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE1MHB4LCAxZnIpKScsXHJcbiAgICAgICAgICAgICAgZ2FwOiAnMTVweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwYWRkaW5nPVwibWRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZjNjZCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjZmZjMTA3JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjODU2NDA0JyB9fT5cclxuICAgICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLnN1bW1hcnkudG90YWxQZW5kaW5nfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM4NTY0MDQnLCBmb250U2l6ZTogJzEycHgnIH19PlBlbmRpbmc8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZDRlZGRhJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICMyOGE3NDUnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICczMnB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxNTU3MjQnIH19PlxyXG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbEFwcHJvdmVkfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyMxNTU3MjQnLCBmb250U2l6ZTogJzEycHgnIH19PkFwcHJvdmVkPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwYWRkaW5nPVwibWRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2QxZWNmMScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjMTdhMmI4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMGM1NDYwJyB9fT5cclxuICAgICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLnN1bW1hcnkubGFzdDdEYXlzfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyMwYzU0NjAnLCBmb250U2l6ZTogJzEycHgnIH19Pkxhc3QgNyBEYXlzPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwYWRkaW5nPVwibWRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2UyZTNlNScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjNmM3NTdkJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMzgzZDQxJyB9fT5cclxuICAgICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLnN1bW1hcnkubGFzdDMwRGF5c31cclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjMzgzZDQxJywgZm9udFNpemU6ICcxMnB4JyB9fT5MYXN0IDMwIERheXM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7LyogQ2hhcnRzIFNlY3Rpb24gKi99XHJcbiAgICAgIHthcHByb3ZhbFN0YXRzICYmIHRvdGFsQXBwcm92YWxzID4gMCAmJiAoXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxyXG4gICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoNDAwcHgsIDFmcikpJyxcclxuICAgICAgICAgICAgZ2FwOiAnMjBweCcsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7LyogQXBwcm92YWwgU3RhdHVzIEJhciBDaGFydCAqL31cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5BcHByb3ZhbCBTdGF0dXMgRGlzdHJpYnV0aW9uPC9IMj5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Ub3A6ICczMHB4JyB9fT5cclxuICAgICAgICAgICAgICB7LyogUGVuZGluZyBCYXIgKi99XHJcbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjODU2NDA0JyB9fT5QZW5kaW5nPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjODU2NDA0JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5LnRvdGFsUGVuZGluZ30gKHtwZW5kaW5nUGVyY2VudC50b0ZpeGVkKDEpfSUpXHJcbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmOGY5ZmEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtwZW5kaW5nUGVyY2VudH0lYCxcclxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgI2ZmYzEwNyAwJSwgI2ZmYjMwMCAxMDAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnd2lkdGggMXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICAgIHsvKiBBcHByb3ZlZCBCYXIgKi99XHJcbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjMTU1NzI0JyB9fT5BcHByb3ZlZDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiAnIzE1NTcyNCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbEFwcHJvdmVkfSAoe2FwcHJvdmVkUGVyY2VudC50b0ZpeGVkKDEpfSUpXHJcbiAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmOGY5ZmEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHthcHByb3ZlZFBlcmNlbnR9JWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMyOGE3NDUgMCUsICMyMGM5OTcgMTAwJSknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgICB7LyogU3VtbWFyeSAqL31cclxuICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICczMHB4JyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzE1cHgnLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzY2NicgfX0+VG90YWwgUmVxdWVzdHM8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzMzMycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHt0b3RhbEFwcHJvdmFsc31cclxuICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICB7LyogQWN0aXZpdHkgVGltZWxpbmUgQ2hhcnQgKi99XHJcbiAgICAgICAgICB7dGltZWxpbmVEYXRhLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPEgyIG1hcmdpbkJvdHRvbT1cIm1kXCI+UmVjZW50IEFjdGl2aXR5IFRyZW5kIChMYXN0IDE0IERheXMpPC9IMj5cclxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpblRvcDogJzMwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgeyFoYXNBbnlBY3Rpdml0eSA/IChcclxuICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNjBweCAyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzE2cHgnLCBjb2xvcjogJyM2NjYnLCBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIE5vIGFjdGl2aXR5IGluIHRoZSBsYXN0IDE0IGRheXNcclxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxNHB4JywgY29sb3I6ICcjOTk5JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmFsIHJlcXVlc3RzIGNyZWF0ZWQgaW4gdGhlIGxhc3QgMTQgZGF5cyB3aWxsIGFwcGVhciBoZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIExlZ2VuZCAqL31cclxuICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMjBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogJzVweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzNweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTJweCcsIGNvbG9yOiAnIzY2NicgfX0+QXBwcm92ZWQ8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnM3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZjMTA3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjY2JyB9fT5QZW5kaW5nPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKiBDaGFydCAqL31cclxuICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyMDBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGdhcDogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHt0aW1lbGluZURhdGEubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFwcHJvdmVkSGVpZ2h0ID0gKGl0ZW0uYXBwcm92ZWQgLyBtYXhWYWx1ZSkgKiAxODA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVuZGluZ0hlaWdodCA9IChpdGVtLnBlbmRpbmcgLyBtYXhWYWx1ZSkgKiAxODA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERlYnVnIGxvZyBmb3IgaXRlbXMgd2l0aCBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uYXBwcm92ZWQgPiAwIHx8IGl0ZW0ucGVuZGluZyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZW5kZXJpbmcgYmFyICR7aW5kZXh9ICgke2l0ZW0uZGF0ZX0pOiBhcHByb3ZlZCBoZWlnaHQ9JHthcHByb3ZlZEhlaWdodH1weCwgcGVuZGluZyBoZWlnaHQ9JHtwZW5kaW5nSGVpZ2h0fXB4YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJzVweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxODBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICczMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICcyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHthcHByb3ZlZEhlaWdodH1weGAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkhlaWdodDogYXBwcm92ZWRIZWlnaHQgPiAwID8gJzVweCcgOiAnMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyOGE3NDUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC41cyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICMxZTdlMzQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtgQXBwcm92ZWQ6ICR7aXRlbS5hcHByb3ZlZH1gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICczMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICcyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtwZW5kaW5nSGVpZ2h0fXB4YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBwZW5kaW5nSGVpZ2h0ID4gMCA/ICc1cHgnIDogJzBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZjMTA3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4IDRweCAwIDAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBhODAwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YFBlbmRpbmc6ICR7aXRlbS5wZW5kaW5nfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnOXB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoLTQ1ZGVnKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzEwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5kYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0JveD5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHsvKiBUYWJsZXMgR3JpZCBTZWN0aW9uICovfVxyXG4gICAgICA8Qm94XHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcclxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSknLFxyXG4gICAgICAgICAgZ2FwOiAnMjBweCcsXHJcbiAgICAgICAgICBtYXJnaW5Cb3R0b206ICczMHB4JyxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgey8qIFRvcCBQZXJmb3JtaW5nIFNob3BzICovfVxyXG4gICAgICAgIHt0b3BTaG9wcy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5Ub3AgUGVyZm9ybWluZyBTaG9wczwvSDI+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScgfX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLCBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScgfX0+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5SYW5rPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlNob3AgTmFtZTwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5Mb2NhdGlvbjwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIFRyYW5zYWN0aW9uc1xyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cclxuICAgICAgICAgICAgICAgICAgUG9pbnRzIEdpdmVuXHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7dG9wU2hvcHMubWFwKChzaG9wLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHRyXHJcbiAgICAgICAgICAgICAgICAgIGtleT17c2hvcC5zaG9wSWQgfHwgaW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiBpbmRleCA8IHRvcFNob3BzLmxlbmd0aCAtIDEgPyAnMXB4IHNvbGlkICNmMGYwZjAnIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9PT0gMCA/ICcjRkZENzAwJyA6IGluZGV4ID09PSAxID8gJyNDMEMwQzAnIDogJyNDRDdGMzInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpbmRleCArIDF9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT57c2hvcC5zaG9wTmFtZSB8fCAnTi9BJ308L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBjb2xvcjogJyM2NjYnIH19PntzaG9wLmxvY2F0aW9uIHx8ICdOL0EnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMxN2EyYjgnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7c2hvcC50b3RhbFRyYW5zYWN0aW9ucyB8fCAwfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNmY0MmMxJyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3AudG90YWxQb2ludHNVc2VkIHx8IDB9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHsvKiBNb3N0IFJlcXVlc3RlZCBQcm9kdWN0cyAqL31cclxuICAgICAgICB7YXBwcm92YWxTdGF0cz8ubW9zdFJlcXVlc3RlZFByb2R1Y3RzPy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5Nb3N0IFJlcXVlc3RlZCBQcm9kdWN0czwvSDI+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScgfX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLCBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScgfX0+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5SYW5rPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxyXG4gICAgICAgICAgICAgICAgICBQcm9kdWN0IE5hbWVcclxuICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIFJlcXVlc3QgQ291bnRcclxuICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLm1vc3RSZXF1ZXN0ZWRQcm9kdWN0cy5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHJcclxuICAgICAgICAgICAgICAgICAga2V5PXtwcm9kdWN0LnByb2R1Y3RJZCB8fCBpbmRleH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleCA8IGFwcHJvdmFsU3RhdHMubW9zdFJlcXVlc3RlZFByb2R1Y3RzLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnMXB4IHNvbGlkICNmMGYwZjAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyOGE3NDUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpbmRleCArIDF9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5wcm9kdWN0TmFtZSB8fCAnTi9BJ31cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzI4YTc0NScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnJlcXVlc3RDb3VudCB8fCAwfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICApfVxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIHsvKiBNb3N0IENvbGxlY3RlZCBHaWZ0cyBTZWN0aW9uICovfVxyXG4gICAgICB7bW9zdFJlZGVlbWVkUmV3YXJkcy5sZW5ndGggPiAwICYmIChcclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXHJcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSknLFxyXG4gICAgICAgICAgICBnYXA6ICcyMHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHsvKiBNb3N0IENvbGxlY3RlZCBHaWZ0cyBUYWJsZSAqL31cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5Nb3N0IENvbGxlY3RlZCBHaWZ0czwvSDI+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScgfX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLCBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScgfX0+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5SYW5rPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxyXG4gICAgICAgICAgICAgICAgICBSZXdhcmQgTmFtZVxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cclxuICAgICAgICAgICAgICAgICAgUmVkZW1wdGlvbnNcclxuICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIFRvdGFsIFBvaW50cyBTcGVudFxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAge21vc3RSZWRlZW1lZFJld2FyZHMubWFwKChyZXdhcmQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHJcclxuICAgICAgICAgICAgICAgICAga2V5PXtyZXdhcmQucmV3YXJkSWQgfHwgaW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgICAgICAgaW5kZXggPCBtb3N0UmVkZWVtZWRSZXdhcmRzLmxlbmd0aCAtIDEgPyAnMXB4IHNvbGlkICNmMGYwZjAnIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM2ZjQyYzEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpbmRleCArIDF9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnJld2FyZE5hbWUgfHwgJ04vQSd9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMxN2EyYjgnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnJlZGVtcHRpb25Db3VudCB8fCAwfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNmY0MmMxJyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3Jld2FyZC50b3RhbFBvaW50c1NwZW50IHx8IDB9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgIHsvKiBSZWRlbXB0aW9ucyBDaGFydCAqL31cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5SZWRlbXB0aW9uIERpc3RyaWJ1dGlvbjwvSDI+XHJcbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgbWFyZ2luVG9wOiAnMzBweCcgfX0+XHJcbiAgICAgICAgICAgICAge21vc3RSZWRlZW1lZFJld2FyZHMuc2xpY2UoMCwgNSkubWFwKChyZXdhcmQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhSZWRlbXB0aW9ucyA9IE1hdGgubWF4KFxyXG4gICAgICAgICAgICAgICAgICAuLi5tb3N0UmVkZWVtZWRSZXdhcmRzLnNsaWNlKDAsIDUpLm1hcCgocikgPT4gcGFyc2VJbnQoci5yZWRlbXB0aW9uQ291bnQpIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhcldpZHRoID1cclxuICAgICAgICAgICAgICAgICAgKChwYXJzZUludChyZXdhcmQucmVkZW1wdGlvbkNvdW50KSB8fCAwKSAvIG1heFJlZGVtcHRpb25zKSAqIDEwMDtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8Qm94IGtleT17cmV3YXJkLnJld2FyZElkIHx8IGluZGV4fSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzYwMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNDk1MDU3JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnNjAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17cmV3YXJkLnJld2FyZE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmV3YXJkTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyM2ZjQyYzEnLCBmb250U2l6ZTogJzE0cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnJlZGVtcHRpb25Db3VudH0gcmVkZW1wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICczMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmOGY5ZmEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2JhcldpZHRofSVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoOTBkZWcsICM2ZjQyYzEgMCUsICM5YjU5YjYgMTAwJSknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd3aWR0aCAxcyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcxMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICd3aGl0ZScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnRvdGFsUG9pbnRzU3BlbnR9IHB0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICB7LyogU3VtbWFyeSAqL31cclxuICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICczMHB4JyxcclxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzE1cHgnLFxyXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzY2NicgfX0+VG90YWwgUmVkZW1wdGlvbnM8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzZmNDJjMScgfX0+XHJcbiAgICAgICAgICAgICAgICAgIHttb3N0UmVkZWVtZWRSZXdhcmRzLnJlZHVjZShcclxuICAgICAgICAgICAgICAgICAgICAoc3VtLCByKSA9PiBzdW0gKyAocGFyc2VJbnQoci5yZWRlbXB0aW9uQ291bnQpIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICl9XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMYWJlbCwgSW5wdXQsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgdXNlTm90aWNlLCBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IEFwcHJvdmVQcm9kdWN0ID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuICBjb25zdCBbcG9pbnRWYWx1ZSwgc2V0UG9pbnRWYWx1ZV0gPSB1c2VTdGF0ZShyZWNvcmQucGFyYW1zLnBvaW50VmFsdWUgfHwgMTApO1xyXG4gIGNvbnN0IFtzaG9wSWQsIHNldFNob3BJZF0gPSB1c2VTdGF0ZShyZWNvcmQucGFyYW1zLnNob3BJZCB8fCAnJyk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmICghcG9pbnRWYWx1ZSB8fCBwb2ludFZhbHVlIDw9IDApIHtcclxuICAgICAgYWRkTm90aWNlKHtcclxuICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgcG9pbnQgdmFsdWUgZ3JlYXRlciB0aGFuIDAnLFxyXG4gICAgICAgIHR5cGU6ICdlcnJvcicsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZWNvcmRBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxyXG4gICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2FwcHJvdmUnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBvaW50VmFsdWU6IHBhcnNlSW50KHBvaW50VmFsdWUpLFxyXG4gICAgICAgICAgc2hvcElkOiBzaG9wSWQgfHwgbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLm5vdGljZSkge1xyXG4gICAgICAgIGFkZE5vdGljZShyZXNwb25zZS5kYXRhLm5vdGljZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlZGlyZWN0VXJsKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS5kYXRhLnJlZGlyZWN0VXJsO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgIG1lc3NhZ2U6IGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWAsXHJcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgfSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCBwYWRkaW5nPVwieHhsXCI+XHJcbiAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieGxcIj5cclxuICAgICAgICA8TWVzc2FnZUJveCBtZXNzYWdlPVwiU2V0IHRoZSBwb2ludCB2YWx1ZSBmb3IgdGhpcyBwcm9kdWN0IGFuZCBhcHByb3ZlIGl0LiBBbGwgdXNlcnMgd2hvIHJlcXVlc3RlZCB0aGlzIHByb2R1Y3Qgd2lsbCBiZSByZXdhcmRlZC5cIiB2YXJpYW50PVwiaW5mb1wiIC8+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxyXG4gICAgICAgIDxMYWJlbD5Qcm9kdWN0IE5hbWU8L0xhYmVsPlxyXG4gICAgICAgIDxJbnB1dCB2YWx1ZT17cmVjb3JkLnBhcmFtcy5uYW1lfSBkaXNhYmxlZCAvPlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieGxcIj5cclxuICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UG9pbnQgVmFsdWUgKjwvTGFiZWw+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgIHZhbHVlPXtwb2ludFZhbHVlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQb2ludFZhbHVlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcG9pbnQgdmFsdWVcIlxyXG4gICAgICAgICAgbWluPVwiMVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XHJcbiAgICAgICAgPExhYmVsPlNob3AgSUQgKG9wdGlvbmFsKTwvTGFiZWw+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICB2YWx1ZT17c2hvcElkfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTaG9wSWQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzaG9wIFVVSUQgb3IgbGVhdmUgZW1wdHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveD5cclxuICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBcHByb3ZlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2xvYWRpbmcgPyAnQXBwcm92aW5nLi4uJyA6ICdBcHByb3ZlIFByb2R1Y3QnfVxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5oaXN0b3J5LmJhY2soKX1cclxuICAgICAgICAgIG1sPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcHJvdmVQcm9kdWN0O1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vZGlzdC9hZG1pbi9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IEFwcHJvdmVQcm9kdWN0IGZyb20gJy4uL2Rpc3QvYWRtaW4vYXBwcm92ZS1wcm9kdWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BcHByb3ZlUHJvZHVjdCA9IEFwcHJvdmVQcm9kdWN0Il0sIm5hbWVzIjpbIkRhc2hib2FyZCIsImRhdGEiLCJzZXREYXRhIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInVzZUVmZmVjdCIsImZldGNoRGF0YSIsImFwaSIsIkFwaUNsaWVudCIsInJlc3BvbnNlIiwiZ2V0RGFzaGJvYXJkIiwiY29uc29sZSIsImxvZyIsIm92ZXJ2aWV3IiwiYXBwcm92YWxTdGF0cyIsImRhaWx5U3RhdHMiLCJlcnJvciIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsInBhZGRpbmciLCJzdHlsZSIsInRleHRBbGlnbiIsIkxvYWRlciIsIlRleHQiLCJtYXJnaW5Ub3AiLCJ0b3BTaG9wcyIsIm1vc3RSZWRlZW1lZFJld2FyZHMiLCJ0b3RhbEFwcHJvdmFscyIsInN1bW1hcnkiLCJ0b3RhbFBlbmRpbmciLCJ0b3RhbEFwcHJvdmVkIiwicGVuZGluZ1BlcmNlbnQiLCJhcHByb3ZlZFBlcmNlbnQiLCJ0aW1lbGluZURhdGEiLCJsZW5ndGgiLCJoYXNBbnlBY3Rpdml0eSIsInNvbWUiLCJkIiwiYXBwcm92ZWQiLCJwZW5kaW5nIiwibWF4VmFsdWUiLCJNYXRoIiwibWF4IiwibWFwIiwiZm9yRWFjaCIsIml0ZW0iLCJpZHgiLCJkYXRlIiwiYmFja2dyb3VuZCIsIm1pbkhlaWdodCIsIkgxIiwibWFyZ2luQm90dG9tIiwiZGlzcGxheSIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJnYXAiLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJib3hTaGFkb3ciLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsInRvdGFsVXNlcnMiLCJ0b3RhbFNob3BzIiwidG90YWxUcmFuc2FjdGlvbnMiLCJ0b3RhbEFwcHJvdmFsUmVxdWVzdHMiLCJ0b3RhbFBvaW50c1VzZWQiLCJIMiIsImJvcmRlckxlZnQiLCJsYXN0N0RheXMiLCJsYXN0MzBEYXlzIiwianVzdGlmeUNvbnRlbnQiLCJ0b0ZpeGVkIiwid2lkdGgiLCJoZWlnaHQiLCJvdmVyZmxvdyIsInBvc2l0aW9uIiwidHJhbnNpdGlvbiIsImFsaWduSXRlbXMiLCJGcmFnbWVudCIsImJvcmRlckJvdHRvbSIsImluZGV4IiwiYXBwcm92ZWRIZWlnaHQiLCJwZW5kaW5nSGVpZ2h0Iiwia2V5IiwiZmxleERpcmVjdGlvbiIsImZsZXgiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwidGl0bGUiLCJ0cmFuc2Zvcm0iLCJ3aGl0ZVNwYWNlIiwiYm9yZGVyQ29sbGFwc2UiLCJzaG9wIiwic2hvcElkIiwibGluZUhlaWdodCIsInNob3BOYW1lIiwibG9jYXRpb24iLCJtb3N0UmVxdWVzdGVkUHJvZHVjdHMiLCJwcm9kdWN0IiwicHJvZHVjdElkIiwicHJvZHVjdE5hbWUiLCJyZXF1ZXN0Q291bnQiLCJyZXdhcmQiLCJyZXdhcmRJZCIsInJld2FyZE5hbWUiLCJyZWRlbXB0aW9uQ291bnQiLCJ0b3RhbFBvaW50c1NwZW50Iiwic2xpY2UiLCJtYXhSZWRlbXB0aW9ucyIsInIiLCJwYXJzZUludCIsImJhcldpZHRoIiwidGV4dE92ZXJmbG93IiwicGFkZGluZ0xlZnQiLCJyZWR1Y2UiLCJzdW0iLCJBcHByb3ZlUHJvZHVjdCIsInByb3BzIiwicmVjb3JkIiwicmVzb3VyY2UiLCJwb2ludFZhbHVlIiwic2V0UG9pbnRWYWx1ZSIsInBhcmFtcyIsInNldFNob3BJZCIsImFkZE5vdGljZSIsInVzZU5vdGljZSIsImhhbmRsZUFwcHJvdmUiLCJtZXNzYWdlIiwidHlwZSIsInJlY29yZEFjdGlvbiIsInJlc291cmNlSWQiLCJpZCIsInJlY29yZElkIiwiYWN0aW9uTmFtZSIsIm5vdGljZSIsInJlZGlyZWN0VXJsIiwid2luZG93IiwiaHJlZiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50IiwiTGFiZWwiLCJJbnB1dCIsInZhbHVlIiwibmFtZSIsImRpc2FibGVkIiwicmVxdWlyZWQiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsIm1pbiIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJoaXN0b3J5IiwiYmFjayIsIm1sIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsU0FBUyxHQUFHQSxNQUFNO0lBQ3RCLE1BQU0sQ0FBQ0MsSUFBSSxFQUFFQyxPQUFPLENBQUMsR0FBR0MsY0FBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxNQUFNLENBQUNDLE9BQU8sRUFBRUMsVUFB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
