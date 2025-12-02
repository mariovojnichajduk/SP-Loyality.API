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
    }, "Loyality Program Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2Rhc2hib2FyZC5qc3giLCIuLi9kaXN0L2FkbWluL2FwcHJvdmUtcHJvZHVjdC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDEsIEgyLCBUZXh0LCBMb2FkZXIgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0RGFzaGJvYXJkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXNoYm9hcmQgQVBJIHJlc3BvbnNlOicsIHJlc3BvbnNlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0Rhc2hib2FyZCBkYXRhOicsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnT3ZlcnZpZXc6JywgcmVzcG9uc2UuZGF0YT8ub3ZlcnZpZXcpO1xuICAgICAgICBjb25zb2xlLmxvZygnQXBwcm92YWwgU3RhdHM6JywgcmVzcG9uc2UuZGF0YT8uYXBwcm92YWxTdGF0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEYWlseSBTdGF0czonLCByZXNwb25zZS5kYXRhPy5hcHByb3ZhbFN0YXRzPy5kYWlseVN0YXRzKTtcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgZGF0YTonLCBlcnJvcik7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIGlmIChsb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCb3ggcGFkZGluZz1cInh4bFwiIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxMb2FkZXIgLz5cbiAgICAgICAgPFRleHQgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMjBweCcgfX0+TG9hZGluZyBzdGF0aXN0aWNzLi4uPC9UZXh0PlxuICAgICAgPC9Cb3g+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghZGF0YSB8fCAhZGF0YS5vdmVydmlldykge1xuICAgIHJldHVybiAoXG4gICAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIj5cbiAgICAgICAgPFRleHQ+Tm8gc3RhdGlzdGljcyBhdmFpbGFibGU8L1RleHQ+XG4gICAgICA8L0JveD5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgeyBvdmVydmlldywgdG9wU2hvcHMgPSBbXSwgbW9zdFJlZGVlbWVkUmV3YXJkcyA9IFtdLCBhcHByb3ZhbFN0YXRzIH0gPSBkYXRhO1xuXG4gIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlcyBmb3IgdmlzdWFsaXphdGlvblxuICBjb25zdCB0b3RhbEFwcHJvdmFscyA9XG4gICAgKGFwcHJvdmFsU3RhdHM/LnN1bW1hcnk/LnRvdGFsUGVuZGluZyB8fCAwKSArIChhcHByb3ZhbFN0YXRzPy5zdW1tYXJ5Py50b3RhbEFwcHJvdmVkIHx8IDApO1xuICBjb25zdCBwZW5kaW5nUGVyY2VudCA9XG4gICAgdG90YWxBcHByb3ZhbHMgPiAwXG4gICAgICA/ICgoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxQZW5kaW5nIHx8IDApIC8gdG90YWxBcHByb3ZhbHMpICogMTAwXG4gICAgICA6IDA7XG4gIGNvbnN0IGFwcHJvdmVkUGVyY2VudCA9XG4gICAgdG90YWxBcHByb3ZhbHMgPiAwXG4gICAgICA/ICgoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxBcHByb3ZlZCB8fCAwKSAvIHRvdGFsQXBwcm92YWxzKSAqIDEwMFxuICAgICAgOiAwO1xuXG4gIGNvbnN0IHRpbWVsaW5lRGF0YSA9IGFwcHJvdmFsU3RhdHM/LmRhaWx5U3RhdHMgfHwgW107XG4gIGNvbnNvbGUubG9nKCdUaW1lbGluZSBkYXRhIGluIGNvbXBvbmVudDonLCB0aW1lbGluZURhdGEpO1xuICBjb25zb2xlLmxvZygnVGltZWxpbmUgZGF0YSBsZW5ndGg6JywgdGltZWxpbmVEYXRhLmxlbmd0aCk7XG4gIGNvbnNvbGUubG9nKCdGaXJzdCBpdGVtOicsIHRpbWVsaW5lRGF0YVswXSk7XG4gIGNvbnNvbGUubG9nKCdMYXN0IGl0ZW0gKE5vdiA1KTonLCB0aW1lbGluZURhdGFbdGltZWxpbmVEYXRhLmxlbmd0aCAtIDFdKTtcbiAgY29uc3QgaGFzQW55QWN0aXZpdHkgPSB0aW1lbGluZURhdGEuc29tZSgoZCkgPT4gZC5hcHByb3ZlZCA+IDAgfHwgZC5wZW5kaW5nID4gMCk7XG4gIGNvbnNvbGUubG9nKCdIYXMgYW55IGFjdGl2aXR5OicsIGhhc0FueUFjdGl2aXR5KTtcbiAgY29uc3QgbWF4VmFsdWUgPSBNYXRoLm1heChcbiAgICAuLi50aW1lbGluZURhdGEubWFwKChkKSA9PiBNYXRoLm1heChkLmFwcHJvdmVkIHx8IDAsIGQucGVuZGluZyB8fCAwKSksXG4gICAgMSxcbiAgKTtcbiAgY29uc29sZS5sb2coJ01heCB2YWx1ZTonLCBtYXhWYWx1ZSk7XG5cbiAgLy8gTG9nIGl0ZW1zIHdpdGggYWN0aXZpdHlcbiAgdGltZWxpbmVEYXRhLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xuICAgIGlmIChpdGVtLmFwcHJvdmVkID4gMCB8fCBpdGVtLnBlbmRpbmcgPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhgSXRlbSAke2lkeH0gKCR7aXRlbS5kYXRlfSk6IGFwcHJvdmVkPSR7aXRlbS5hcHByb3ZlZH0sIHBlbmRpbmc9JHtpdGVtLnBlbmRpbmd9YCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggcGFkZGluZz1cInh4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjZjVmNWY1JywgbWluSGVpZ2h0OiAnMTAwdmgnIH19PlxuICAgICAgPEgxIG1hcmdpbkJvdHRvbT1cInh4bFwiPkxveWFsaXR5IFByb2dyYW0gRGFzaGJvYXJkPC9IMT5cblxuICAgICAgey8qIE92ZXJhbGwgU3RhdGlzdGljcyBDYXJkcyAqL31cbiAgICAgIDxCb3hcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKScsXG4gICAgICAgICAgZ2FwOiAnMjBweCcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMDA3YmZmJyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVXNlcnMgfHwgMH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+VG90YWwgVXNlcnM8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMjhhNzQ1JyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsU2hvcHMgfHwgMH1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+VG90YWwgU2hvcHM8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjMTdhMmI4JyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVHJhbnNhY3Rpb25zIHx8IDB9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzY2NicsIGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlRyYW5zYWN0aW9uczwvVGV4dD5cbiAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgPEJveFxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8VGV4dFxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICBjb2xvcjogJyNmZmMxMDcnLFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxBcHByb3ZhbFJlcXVlc3RzIHx8IDB9XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzY2NicsIGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlxuICAgICAgICAgICAgQXBwcm92YWwgUmVxdWVzdHNcbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgIDwvQm94PlxuXG4gICAgICAgIDxCb3hcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFRleHRcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjNmY0MmMxJyxcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsUG9pbnRzVXNlZCB8fCAwfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cbiAgICAgICAgICAgIFRvdGFsIFBvaW50cyBVc2VkXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogQXBwcm92YWwgUmVxdWVzdHMgU3VtbWFyeSAqL31cbiAgICAgIHthcHByb3ZhbFN0YXRzICYmIChcbiAgICAgICAgPEJveFxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgbWFyZ2luQm90dG9tPVwibGdcIlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5BcHByb3ZhbCBSZXF1ZXN0cyBTdGF0dXM8L0gyPlxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE1MHB4LCAxZnIpKScsXG4gICAgICAgICAgICAgIGdhcDogJzE1cHgnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmYzY2QnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjZmZjMTA3JyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzg1NjQwNCcgfX0+XG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbFBlbmRpbmd9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjODU2NDA0JywgZm9udFNpemU6ICcxMnB4JyB9fT5QZW5kaW5nPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgcGFkZGluZz1cIm1kXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Q0ZWRkYScsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICMyOGE3NDUnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMTU1NzI0JyB9fT5cbiAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5LnRvdGFsQXBwcm92ZWR9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjMTU1NzI0JywgZm9udFNpemU6ICcxMnB4JyB9fT5BcHByb3ZlZDwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNkMWVjZjEnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjMTdhMmI4JyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzBjNTQ2MCcgfX0+XG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS5sYXN0N0RheXN9XG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjMGM1NDYwJywgZm9udFNpemU6ICcxMnB4JyB9fT5MYXN0IDcgRGF5czwvVGV4dD5cbiAgICAgICAgICAgIDwvQm94PlxuXG4gICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNlMmUzZTUnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjNmM3NTdkJyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzM4M2Q0MScgfX0+XG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS5sYXN0MzBEYXlzfVxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzM4M2Q0MScsIGZvbnRTaXplOiAnMTJweCcgfX0+TGFzdCAzMCBEYXlzPC9UZXh0PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgey8qIENoYXJ0cyBTZWN0aW9uICovfVxuICAgICAge2FwcHJvdmFsU3RhdHMgJiYgdG90YWxBcHByb3ZhbHMgPiAwICYmIChcbiAgICAgICAgPEJveFxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoNDAwcHgsIDFmcikpJyxcbiAgICAgICAgICAgIGdhcDogJzIwcHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIHsvKiBBcHByb3ZhbCBTdGF0dXMgQmFyIENoYXJ0ICovfVxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5BcHByb3ZhbCBTdGF0dXMgRGlzdHJpYnV0aW9uPC9IMj5cbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgbWFyZ2luVG9wOiAnMzBweCcgfX0+XG4gICAgICAgICAgICAgIHsvKiBQZW5kaW5nIEJhciAqL31cbiAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcyMHB4JyB9fT5cbiAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyM4NTY0MDQnIH19PlBlbmRpbmc8L1RleHQ+XG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjODU2NDA0JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbFBlbmRpbmd9ICh7cGVuZGluZ1BlcmNlbnQudG9GaXhlZCgxKX0lKVxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7cGVuZGluZ1BlcmNlbnR9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgI2ZmYzEwNyAwJSwgI2ZmYjMwMCAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICB7LyogQXBwcm92ZWQgQmFyICovfVxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxuICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiAnIzE1NTcyNCcgfX0+QXBwcm92ZWQ8L1RleHQ+XG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjMTU1NzI0JyB9fT5cbiAgICAgICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbEFwcHJvdmVkfSAoe2FwcHJvdmVkUGVyY2VudC50b0ZpeGVkKDEpfSUpXG4gICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHthcHByb3ZlZFBlcmNlbnR9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgIzI4YTc0NSAwJSwgIzIwYzk5NyAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICB7LyogU3VtbWFyeSAqL31cbiAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICczMHB4JyxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNXB4JyxcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzE0cHgnLCBjb2xvcjogJyM2NjYnIH19PlRvdGFsIFJlcXVlc3RzPC9UZXh0PlxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMzMzJyB9fT5cbiAgICAgICAgICAgICAgICAgIHt0b3RhbEFwcHJvdmFsc31cbiAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICB7LyogQWN0aXZpdHkgVGltZWxpbmUgQ2hhcnQgKi99XG4gICAgICAgICAge3RpbWVsaW5lRGF0YS5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5SZWNlbnQgQWN0aXZpdHkgVHJlbmQgKExhc3QgMTQgRGF5cyk8L0gyPlxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpblRvcDogJzMwcHgnIH19PlxuICAgICAgICAgICAgICAgIHshaGFzQW55QWN0aXZpdHkgPyAoXG4gICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzYwcHggMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxNnB4JywgY29sb3I6ICcjNjY2JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgTm8gYWN0aXZpdHkgaW4gdGhlIGxhc3QgMTQgZGF5c1xuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTRweCcsIGNvbG9yOiAnIzk5OScgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgQXBwcm92YWwgcmVxdWVzdHMgY3JlYXRlZCBpbiB0aGUgbGFzdCAxNCBkYXlzIHdpbGwgYXBwZWFyIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBMZWdlbmQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc1cHgnIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM2NjYnIH19PkFwcHJvdmVkPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzNweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmMxMDcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjY2JyB9fT5QZW5kaW5nPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cblxuICAgICAgICAgICAgICAgICAgICB7LyogQ2hhcnQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjAwcHgnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAwJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLFxuICAgICAgICAgICAgICAgICAgICBnYXA6ICcycHgnLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7dGltZWxpbmVEYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBwcm92ZWRIZWlnaHQgPSAoaXRlbS5hcHByb3ZlZCAvIG1heFZhbHVlKSAqIDE4MDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVuZGluZ0hlaWdodCA9IChpdGVtLnBlbmRpbmcgLyBtYXhWYWx1ZSkgKiAxODA7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRGVidWcgbG9nIGZvciBpdGVtcyB3aXRoIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uYXBwcm92ZWQgPiAwIHx8IGl0ZW0ucGVuZGluZyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVuZGVyaW5nIGJhciAke2luZGV4fSAoJHtpdGVtLmRhdGV9KTogYXBwcm92ZWQgaGVpZ2h0PSR7YXBwcm92ZWRIZWlnaHR9cHgsIHBlbmRpbmcgaGVpZ2h0PSR7cGVuZGluZ0hlaWdodH1weGApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJzVweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxODBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHthcHByb3ZlZEhlaWdodH1weGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IGFwcHJvdmVkSGVpZ2h0ID4gMCA/ICc1cHgnIDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNXMgZWFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgIzFlN2UzNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YEFwcHJvdmVkOiAke2l0ZW0uYXBwcm92ZWR9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICczMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3BlbmRpbmdIZWlnaHR9cHhgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBwZW5kaW5nSGVpZ2h0ID4gMCA/ICc1cHgnIDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmYzEwNycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnaGVpZ2h0IDAuNXMgZWFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwYTgwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YFBlbmRpbmc6ICR7aXRlbS5wZW5kaW5nfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICc5cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzk5OScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAncm90YXRlKC00NWRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5kYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQm94PlxuICAgICAgKX1cblxuICAgICAgey8qIFRhYmxlcyBHcmlkIFNlY3Rpb24gKi99XG4gICAgICA8Qm94XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSknLFxuICAgICAgICAgIGdhcDogJzIwcHgnLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7LyogVG9wIFBlcmZvcm1pbmcgU2hvcHMgKi99XG4gICAgICAgIHt0b3BTaG9wcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8Qm94XG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEgyIG1hcmdpbkJvdHRvbT1cImxnXCI+VG9wIFBlcmZvcm1pbmcgU2hvcHM8L0gyPlxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyB9fT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyIHN0eWxlPXt7IGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZGVlMmU2JywgYmFja2dyb3VuZDogJyNmOGY5ZmEnIH19PlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlJhbms8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlNob3AgTmFtZTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+TG9jYXRpb248L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cbiAgICAgICAgICAgICAgICAgIFRyYW5zYWN0aW9uc1xuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgUG9pbnRzIEdpdmVuXG4gICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHt0b3BTaG9wcy5tYXAoKHNob3AsIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgPHRyXG4gICAgICAgICAgICAgICAgICBrZXk9e3Nob3Auc2hvcElkIHx8IGluZGV4fVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiBpbmRleCA8IHRvcFNob3BzLmxlbmd0aCAtIDEgPyAnMXB4IHNvbGlkICNmMGYwZjAnIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNmOGY5ZmEnLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9PT0gMCA/ICcjRkZENzAwJyA6IGluZGV4ID09PSAxID8gJyNDMEMwQzAnIDogJyNDRDdGMzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2luZGV4ICsgMX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PntzaG9wLnNob3BOYW1lIHx8ICdOL0EnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBjb2xvcjogJyM2NjYnIH19PntzaG9wLmxvY2F0aW9uIHx8ICdOL0EnfTwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMxN2EyYjgnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2hvcC50b3RhbFRyYW5zYWN0aW9ucyB8fCAwfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZmNDJjMScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtzaG9wLnRvdGFsUG9pbnRzVXNlZCB8fCAwfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogTW9zdCBSZXF1ZXN0ZWQgUHJvZHVjdHMgKi99XG4gICAgICAgIHthcHByb3ZhbFN0YXRzPy5tb3N0UmVxdWVzdGVkUHJvZHVjdHM/Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5Nb3N0IFJlcXVlc3RlZCBQcm9kdWN0czwvSDI+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnIH19PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLCBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScgfX0+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+UmFuazwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XG4gICAgICAgICAgICAgICAgICBQcm9kdWN0IE5hbWVcbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cbiAgICAgICAgICAgICAgICAgIFJlcXVlc3QgQ291bnRcbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMubW9zdFJlcXVlc3RlZFByb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICAgIGtleT17cHJvZHVjdC5wcm9kdWN0SWQgfHwgaW5kZXh9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206XG4gICAgICAgICAgICAgICAgICAgICAgaW5kZXggPCBhcHByb3ZhbFN0YXRzLm1vc3RSZXF1ZXN0ZWRQcm9kdWN0cy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICcxcHggc29saWQgI2YwZjBmMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNmOGY5ZmEnLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7aW5kZXggKyAxfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnByb2R1Y3ROYW1lIHx8ICdOL0EnfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnJlcXVlc3RDb3VudCB8fCAwfVxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgKX1cbiAgICAgIDwvQm94PlxuXG4gICAgICB7LyogTW9zdCBDb2xsZWN0ZWQgR2lmdHMgU2VjdGlvbiAqL31cbiAgICAgIHttb3N0UmVkZWVtZWRSZXdhcmRzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICA8Qm94XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSknLFxuICAgICAgICAgICAgZ2FwOiAnMjBweCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICczMHB4JyxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgey8qIE1vc3QgQ29sbGVjdGVkIEdpZnRzIFRhYmxlICovfVxuICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5Nb3N0IENvbGxlY3RlZCBHaWZ0czwvSDI+XG4gICAgICAgICAgPHRhYmxlIHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnIH19PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLCBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScgfX0+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+UmFuazwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XG4gICAgICAgICAgICAgICAgICBSZXdhcmQgTmFtZVxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgICAgUmVkZW1wdGlvbnNcbiAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cbiAgICAgICAgICAgICAgICAgIFRvdGFsIFBvaW50cyBTcGVudFxuICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICB7bW9zdFJlZGVlbWVkUmV3YXJkcy5tYXAoKHJld2FyZCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8dHJcbiAgICAgICAgICAgICAgICAgIGtleT17cmV3YXJkLnJld2FyZElkIHx8IGluZGV4fVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOlxuICAgICAgICAgICAgICAgICAgICAgIGluZGV4IDwgbW9zdFJlZGVlbWVkUmV3YXJkcy5sZW5ndGggLSAxID8gJzFweCBzb2xpZCAjZjBmMGYwJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyM2ZjQyYzEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2luZGV4ICsgMX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnJld2FyZE5hbWUgfHwgJ04vQSd9XG4gICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMTdhMmI4JyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Jld2FyZC5yZWRlbXB0aW9uQ291bnQgfHwgMH1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2ZjQyYzEnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnRvdGFsUG9pbnRzU3BlbnQgfHwgMH1cbiAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICB7LyogUmVkZW1wdGlvbnMgQ2hhcnQgKi99XG4gICAgICAgICAgPEJveFxuICAgICAgICAgICAgcGFkZGluZz1cImxnXCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJtZFwiPlJlZGVtcHRpb24gRGlzdHJpYnV0aW9uPC9IMj5cbiAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgbWFyZ2luVG9wOiAnMzBweCcgfX0+XG4gICAgICAgICAgICAgIHttb3N0UmVkZWVtZWRSZXdhcmRzLnNsaWNlKDAsIDUpLm1hcCgocmV3YXJkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heFJlZGVtcHRpb25zID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAuLi5tb3N0UmVkZWVtZWRSZXdhcmRzLnNsaWNlKDAsIDUpLm1hcCgocikgPT4gcGFyc2VJbnQoci5yZWRlbXB0aW9uQ291bnQpIHx8IDApLFxuICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhcldpZHRoID1cbiAgICAgICAgICAgICAgICAgICgocGFyc2VJbnQocmV3YXJkLnJlZGVtcHRpb25Db3VudCkgfHwgMCkgLyBtYXhSZWRlbXB0aW9ucykgKiAxMDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPEJveCBrZXk9e3Jld2FyZC5yZXdhcmRJZCB8fCBpbmRleH0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMjBweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxCb3hcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNjAwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNDk1MDU3JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICc2MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3Jld2FyZC5yZXdhcmROYW1lfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmV3YXJkTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiAnIzZmNDJjMScsIGZvbnRTaXplOiAnMTRweCcgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnJlZGVtcHRpb25Db3VudH0gcmVkZW1wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgICAgICAgICAgICA8Qm94XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICczMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2JhcldpZHRofSVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgIzZmNDJjMSAwJSwgIzliNTliNiAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd3aWR0aCAxcyBlYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICd3aGl0ZScsIGZvbnRTaXplOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3Jld2FyZC50b3RhbFBvaW50c1NwZW50fSBwdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAgICB7LyogU3VtbWFyeSAqL31cbiAgICAgICAgICAgICAgPEJveFxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICczMHB4JyxcbiAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNXB4JyxcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXG4gICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzE0cHgnLCBjb2xvcjogJyM2NjYnIH19PlRvdGFsIFJlZGVtcHRpb25zPC9UZXh0PlxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjNmY0MmMxJyB9fT5cbiAgICAgICAgICAgICAgICAgIHttb3N0UmVkZWVtZWRSZXdhcmRzLnJlZHVjZShcbiAgICAgICAgICAgICAgICAgICAgKHN1bSwgcikgPT4gc3VtICsgKHBhcnNlSW50KHIucmVkZW1wdGlvbkNvdW50KSB8fCAwKSxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgIDwvQm94PlxuICAgICAgICAgIDwvQm94PlxuICAgICAgICA8L0JveD5cbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgTGFiZWwsIElucHV0LCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyB1c2VOb3RpY2UsIEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBBcHByb3ZlUHJvZHVjdCA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzO1xuICBjb25zdCBbcG9pbnRWYWx1ZSwgc2V0UG9pbnRWYWx1ZV0gPSB1c2VTdGF0ZShyZWNvcmQucGFyYW1zLnBvaW50VmFsdWUgfHwgMTApO1xuICBjb25zdCBbc2hvcElkLCBzZXRTaG9wSWRdID0gdXNlU3RhdGUocmVjb3JkLnBhcmFtcy5zaG9wSWQgfHwgJycpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xuICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXBvaW50VmFsdWUgfHwgcG9pbnRWYWx1ZSA8PSAwKSB7XG4gICAgICBhZGROb3RpY2Uoe1xuICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgcG9pbnQgdmFsdWUgZ3JlYXRlciB0aGFuIDAnLFxuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZWNvcmRBY3Rpb24oe1xuICAgICAgICByZXNvdXJjZUlkOiByZXNvdXJjZS5pZCxcbiAgICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcbiAgICAgICAgYWN0aW9uTmFtZTogJ2FwcHJvdmUnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgcG9pbnRWYWx1ZTogcGFyc2VJbnQocG9pbnRWYWx1ZSksXG4gICAgICAgICAgc2hvcElkOiBzaG9wSWQgfHwgbnVsbCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2UuZGF0YS5ub3RpY2UpIHtcbiAgICAgICAgYWRkTm90aWNlKHJlc3BvbnNlLmRhdGEubm90aWNlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmwpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS5kYXRhLnJlZGlyZWN0VXJsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhZGROb3RpY2Uoe1xuICAgICAgICBtZXNzYWdlOiBgRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxCb3ggcGFkZGluZz1cInh4bFwiPlxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxuICAgICAgICA8TWVzc2FnZUJveCBtZXNzYWdlPVwiU2V0IHRoZSBwb2ludCB2YWx1ZSBmb3IgdGhpcyBwcm9kdWN0IGFuZCBhcHByb3ZlIGl0LiBBbGwgdXNlcnMgd2hvIHJlcXVlc3RlZCB0aGlzIHByb2R1Y3Qgd2lsbCBiZSByZXdhcmRlZC5cIiB2YXJpYW50PVwiaW5mb1wiIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxuICAgICAgICA8TGFiZWw+UHJvZHVjdCBOYW1lPC9MYWJlbD5cbiAgICAgICAgPElucHV0IHZhbHVlPXtyZWNvcmQucGFyYW1zLm5hbWV9IGRpc2FibGVkIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxuICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UG9pbnQgVmFsdWUgKjwvTGFiZWw+XG4gICAgICAgIDxJbnB1dFxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgIHZhbHVlPXtwb2ludFZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UG9pbnRWYWx1ZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwb2ludCB2YWx1ZVwiXG4gICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgIC8+XG4gICAgICA8L0JveD5cblxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxuICAgICAgICA8TGFiZWw+U2hvcCBJRCAob3B0aW9uYWwpPC9MYWJlbD5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgdmFsdWU9e3Nob3BJZH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNob3BJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzaG9wIFVVSUQgb3IgbGVhdmUgZW1wdHlcIlxuICAgICAgICAvPlxuICAgICAgPC9Cb3g+XG5cbiAgICAgIDxCb3g+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlQXBwcm92ZX1cbiAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgPlxuICAgICAgICAgIHtsb2FkaW5nID8gJ0FwcHJvdmluZy4uLicgOiAnQXBwcm92ZSBQcm9kdWN0J31cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICB2YXJpYW50PVwidGV4dFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93Lmhpc3RvcnkuYmFjaygpfVxuICAgICAgICAgIG1sPVwiZGVmYXVsdFwiXG4gICAgICAgID5cbiAgICAgICAgICBDYW5jZWxcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0JveD5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFwcHJvdmVQcm9kdWN0O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4uL2Rpc3QvYWRtaW4vZGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmQgPSBEYXNoYm9hcmRcbmltcG9ydCBBcHByb3ZlUHJvZHVjdCBmcm9tICcuLi9kaXN0L2FkbWluL2FwcHJvdmUtcHJvZHVjdCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQXBwcm92ZVByb2R1Y3QgPSBBcHByb3ZlUHJvZHVjdCJdLCJuYW1lcyI6WyJEYXNoYm9hcmQiLCJkYXRhIiwic2V0RGF0YSIsInVzZVN0YXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VFZmZlY3QiLCJmZXRjaERhdGEiLCJhcGkiLCJBcGlDbGllbnQiLCJyZXNwb25zZSIsImdldERhc2hib2FyZCIsImNvbnNvbGUiLCJsb2ciLCJvdmVydmlldyIsImFwcHJvdmFsU3RhdHMiLCJkYWlseVN0YXRzIiwiZXJyb3IiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJwYWRkaW5nIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJMb2FkZXIiLCJUZXh0IiwibWFyZ2luVG9wIiwidG9wU2hvcHMiLCJtb3N0UmVkZWVtZWRSZXdhcmRzIiwidG90YWxBcHByb3ZhbHMiLCJzdW1tYXJ5IiwidG90YWxQZW5kaW5nIiwidG90YWxBcHByb3ZlZCIsInBlbmRpbmdQZXJjZW50IiwiYXBwcm92ZWRQZXJjZW50IiwidGltZWxpbmVEYXRhIiwibGVuZ3RoIiwiaGFzQW55QWN0aXZpdHkiLCJzb21lIiwiZCIsImFwcHJvdmVkIiwicGVuZGluZyIsIm1heFZhbHVlIiwiTWF0aCIsIm1heCIsIm1hcCIsImZvckVhY2giLCJpdGVtIiwiaWR4IiwiZGF0ZSIsImJhY2tncm91bmQiLCJtaW5IZWlnaHQiLCJIMSIsIm1hcmdpbkJvdHRvbSIsImRpc3BsYXkiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiZ2FwIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyIiwiYm94U2hhZG93IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwiY29sb3IiLCJ0b3RhbFVzZXJzIiwidG90YWxTaG9wcyIsInRvdGFsVHJhbnNhY3Rpb25zIiwidG90YWxBcHByb3ZhbFJlcXVlc3RzIiwidG90YWxQb2ludHNVc2VkIiwiSDIiLCJib3JkZXJMZWZ0IiwibGFzdDdEYXlzIiwibGFzdDMwRGF5cyIsImp1c3RpZnlDb250ZW50IiwidG9GaXhlZCIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJwb3NpdGlvbiIsInRyYW5zaXRpb24iLCJhbGlnbkl0ZW1zIiwiRnJhZ21lbnQiLCJib3JkZXJCb3R0b20iLCJpbmRleCIsImFwcHJvdmVkSGVpZ2h0IiwicGVuZGluZ0hlaWdodCIsImtleSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4IiwibWF4V2lkdGgiLCJtaW5XaWR0aCIsInRpdGxlIiwidHJhbnNmb3JtIiwid2hpdGVTcGFjZSIsImJvcmRlckNvbGxhcHNlIiwic2hvcCIsInNob3BJZCIsImxpbmVIZWlnaHQiLCJzaG9wTmFtZSIsImxvY2F0aW9uIiwibW9zdFJlcXVlc3RlZFByb2R1Y3RzIiwicHJvZHVjdCIsInByb2R1Y3RJZCIsInByb2R1Y3ROYW1lIiwicmVxdWVzdENvdW50IiwicmV3YXJkIiwicmV3YXJkSWQiLCJyZXdhcmROYW1lIiwicmVkZW1wdGlvbkNvdW50IiwidG90YWxQb2ludHNTcGVudCIsInNsaWNlIiwibWF4UmVkZW1wdGlvbnMiLCJyIiwicGFyc2VJbnQiLCJiYXJXaWR0aCIsInRleHRPdmVyZmxvdyIsInBhZGRpbmdMZWZ0IiwicmVkdWNlIiwic3VtIiwiQXBwcm92ZVByb2R1Y3QiLCJwcm9wcyIsInJlY29yZCIsInJlc291cmNlIiwicG9pbnRWYWx1ZSIsInNldFBvaW50VmFsdWUiLCJwYXJhbXMiLCJzZXRTaG9wSWQiLCJhZGROb3RpY2UiLCJ1c2VOb3RpY2UiLCJoYW5kbGVBcHByb3ZlIiwibWVzc2FnZSIsInR5cGUiLCJyZWNvcmRBY3Rpb24iLCJyZXNvdXJjZUlkIiwiaWQiLCJyZWNvcmRJZCIsImFjdGlvbk5hbWUiLCJub3RpY2UiLCJyZWRpcmVjdFVybCIsIndpbmRvdyIsImhyZWYiLCJNZXNzYWdlQm94IiwidmFyaWFudCIsIkxhYmVsIiwiSW5wdXQiLCJ2YWx1ZSIsIm5hbWUiLCJkaXNhYmxlZCIsInJlcXVpcmVkIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJtaW4iLCJCdXR0b24iLCJvbkNsaWNrIiwiaGlzdG9yeSIsImJhY2siLCJtbCIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQUlBLE1BQU1BLFNBQVMsR0FBR0EsTUFBTTtJQUN0QixNQUFNLENBQUNDLElBQUksRUFBRUMsT0FBTyxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxJQUFJLENBQUM7SUFDdEMsTUFBTSxDQUFDQyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxHQUFHRixjQUFRLENBQUMsSUFBSSxDQUFDO0VBRTVDRyxFQUFBQSxlQUFTLENBQUMsTUFBTTtFQUNkLElBQUEsTUFBTUMsU0FBUyxHQUFHLFlBQVk7UUFDNUIsSUFBSTtFQUNGLFFBQUEsTUFBTUMsR0FBRyxHQUFHLElBQUlDLGlCQUFTLEVBQUU7RUFDM0IsUUFBQSxNQUFNQyxRQUFRLEdBQUcsTUFBTUYsR0FBRyxDQUFDRyxZQUFZLEVBQUU7RUFDekNDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixFQUFFSCxRQUFRLENBQUM7VUFDaERFLE9BQU8sQ0FB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
