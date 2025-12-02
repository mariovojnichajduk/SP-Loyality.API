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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2Rhc2hib2FyZC5qc3giLCIuLi9kaXN0L2FkbWluL2FwcHJvdmUtcHJvZHVjdC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBIMSwgSDIsIFRleHQsIExvYWRlciB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0RGFzaGJvYXJkKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Rhc2hib2FyZCBBUEkgcmVzcG9uc2U6JywgcmVzcG9uc2UpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXNoYm9hcmQgZGF0YTonLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnT3ZlcnZpZXc6JywgcmVzcG9uc2UuZGF0YT8ub3ZlcnZpZXcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBcHByb3ZhbCBTdGF0czonLCByZXNwb25zZS5kYXRhPy5hcHByb3ZhbFN0YXRzKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGFpbHkgU3RhdHM6JywgcmVzcG9uc2UuZGF0YT8uYXBwcm92YWxTdGF0cz8uZGFpbHlTdGF0cyk7XHJcbiAgICAgICAgc2V0RGF0YShyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgZGF0YTonLCBlcnJvcik7XHJcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZmV0Y2hEYXRhKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBpZiAobG9hZGluZykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJveCBwYWRkaW5nPVwieHhsXCIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICA8TG9hZGVyIC8+XHJcbiAgICAgICAgPFRleHQgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMjBweCcgfX0+TG9hZGluZyBzdGF0aXN0aWNzLi4uPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWRhdGEgfHwgIWRhdGEub3ZlcnZpZXcpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxCb3ggcGFkZGluZz1cInh4bFwiPlxyXG4gICAgICAgIDxUZXh0Pk5vIHN0YXRpc3RpY3MgYXZhaWxhYmxlPC9UZXh0PlxyXG4gICAgICA8L0JveD5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IG92ZXJ2aWV3LCB0b3BTaG9wcyA9IFtdLCBtb3N0UmVkZWVtZWRSZXdhcmRzID0gW10sIGFwcHJvdmFsU3RhdHMgfSA9IGRhdGE7XHJcblxyXG4gIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlcyBmb3IgdmlzdWFsaXphdGlvblxyXG4gIGNvbnN0IHRvdGFsQXBwcm92YWxzID1cclxuICAgIChhcHByb3ZhbFN0YXRzPy5zdW1tYXJ5Py50b3RhbFBlbmRpbmcgfHwgMCkgKyAoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxBcHByb3ZlZCB8fCAwKTtcclxuICBjb25zdCBwZW5kaW5nUGVyY2VudCA9XHJcbiAgICB0b3RhbEFwcHJvdmFscyA+IDBcclxuICAgICAgPyAoKGFwcHJvdmFsU3RhdHM/LnN1bW1hcnk/LnRvdGFsUGVuZGluZyB8fCAwKSAvIHRvdGFsQXBwcm92YWxzKSAqIDEwMFxyXG4gICAgICA6IDA7XHJcbiAgY29uc3QgYXBwcm92ZWRQZXJjZW50ID1cclxuICAgIHRvdGFsQXBwcm92YWxzID4gMFxyXG4gICAgICA/ICgoYXBwcm92YWxTdGF0cz8uc3VtbWFyeT8udG90YWxBcHByb3ZlZCB8fCAwKSAvIHRvdGFsQXBwcm92YWxzKSAqIDEwMFxyXG4gICAgICA6IDA7XHJcblxyXG4gIGNvbnN0IHRpbWVsaW5lRGF0YSA9IGFwcHJvdmFsU3RhdHM/LmRhaWx5U3RhdHMgfHwgW107XHJcbiAgY29uc29sZS5sb2coJ1RpbWVsaW5lIGRhdGEgaW4gY29tcG9uZW50OicsIHRpbWVsaW5lRGF0YSk7XHJcbiAgY29uc29sZS5sb2coJ1RpbWVsaW5lIGRhdGEgbGVuZ3RoOicsIHRpbWVsaW5lRGF0YS5sZW5ndGgpO1xyXG4gIGNvbnNvbGUubG9nKCdGaXJzdCBpdGVtOicsIHRpbWVsaW5lRGF0YVswXSk7XHJcbiAgY29uc29sZS5sb2coJ0xhc3QgaXRlbSAoTm92IDUpOicsIHRpbWVsaW5lRGF0YVt0aW1lbGluZURhdGEubGVuZ3RoIC0gMV0pO1xyXG4gIGNvbnN0IGhhc0FueUFjdGl2aXR5ID0gdGltZWxpbmVEYXRhLnNvbWUoKGQpID0+IGQuYXBwcm92ZWQgPiAwIHx8IGQucGVuZGluZyA+IDApO1xyXG4gIGNvbnNvbGUubG9nKCdIYXMgYW55IGFjdGl2aXR5OicsIGhhc0FueUFjdGl2aXR5KTtcclxuICBjb25zdCBtYXhWYWx1ZSA9IE1hdGgubWF4KFxyXG4gICAgLi4udGltZWxpbmVEYXRhLm1hcCgoZCkgPT4gTWF0aC5tYXgoZC5hcHByb3ZlZCB8fCAwLCBkLnBlbmRpbmcgfHwgMCkpLFxyXG4gICAgMSxcclxuICApO1xyXG4gIGNvbnNvbGUubG9nKCdNYXggdmFsdWU6JywgbWF4VmFsdWUpO1xyXG5cclxuICAvLyBMb2cgaXRlbXMgd2l0aCBhY3Rpdml0eVxyXG4gIHRpbWVsaW5lRGF0YS5mb3JFYWNoKChpdGVtLCBpZHgpID0+IHtcclxuICAgIGlmIChpdGVtLmFwcHJvdmVkID4gMCB8fCBpdGVtLnBlbmRpbmcgPiAwKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBJdGVtICR7aWR4fSAoJHtpdGVtLmRhdGV9KTogYXBwcm92ZWQ9JHtpdGVtLmFwcHJvdmVkfSwgcGVuZGluZz0ke2l0ZW0ucGVuZGluZ31gKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggcGFkZGluZz1cInh4bFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICcjZjVmNWY1JywgbWluSGVpZ2h0OiAnMTAwdmgnIH19PlxyXG4gICAgICA8SDEgbWFyZ2luQm90dG9tPVwieHhsXCI+TG95YWxpdHkgUHJvZ3JhbSBEYXNoYm9hcmQ8L0gxPlxyXG5cclxuICAgICAgey8qIE92ZXJhbGwgU3RhdGlzdGljcyBDYXJkcyAqL31cclxuICAgICAgPEJveFxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXHJcbiAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpJyxcclxuICAgICAgICAgIGdhcDogJzIwcHgnLFxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzAwN2JmZicsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVXNlcnMgfHwgMH1cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzY2NicsIGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlRvdGFsIFVzZXJzPC9UZXh0PlxyXG4gICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBmb250U2l6ZTogJzQycHgnLFxyXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICBjb2xvcjogJyMyOGE3NDUnLFxyXG4gICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtvdmVydmlldy50b3RhbFNob3BzIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5Ub3RhbCBTaG9wczwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMTdhMmI4JyxcclxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxUcmFuc2FjdGlvbnMgfHwgMH1cclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzY2NicsIGZvbnRTaXplOiAnMTRweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlRyYW5zYWN0aW9uczwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjZmZjMTA3JyxcclxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxBcHByb3ZhbFJlcXVlc3RzIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cclxuICAgICAgICAgICAgQXBwcm92YWwgUmVxdWVzdHNcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjNmY0MmMxJyxcclxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxQb2ludHNVc2VkIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cclxuICAgICAgICAgICAgVG90YWwgUG9pbnRzIFVzZWRcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICB7LyogQXBwcm92YWwgUmVxdWVzdHMgU3VtbWFyeSAqL31cclxuICAgICAge2FwcHJvdmFsU3RhdHMgJiYgKFxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBtYXJnaW5Cb3R0b209XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5BcHByb3ZhbCBSZXF1ZXN0cyBTdGF0dXM8L0gyPlxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcclxuICAgICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAncmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMTUwcHgsIDFmcikpJyxcclxuICAgICAgICAgICAgICBnYXA6ICcxNXB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZmZmM2NkJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICNmZmMxMDcnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICczMnB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyM4NTY0MDQnIH19PlxyXG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbFBlbmRpbmd9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzg1NjQwNCcsIGZvbnRTaXplOiAnMTJweCcgfX0+UGVuZGluZzwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcGFkZGluZz1cIm1kXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNkNGVkZGEnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6ICc0cHggc29saWQgIzI4YTc0NScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzE1NTcyNCcgfX0+XHJcbiAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5LnRvdGFsQXBwcm92ZWR9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzE1NTcyNCcsIGZvbnRTaXplOiAnMTJweCcgfX0+QXBwcm92ZWQ8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZDFlY2YxJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICMxN2EyYjgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICczMnB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMwYzU0NjAnIH19PlxyXG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS5sYXN0N0RheXN9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzBjNTQ2MCcsIGZvbnRTaXplOiAnMTJweCcgfX0+TGFzdCA3IERheXM8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZTJlM2U1JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICM2Yzc1N2QnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICczMnB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMzODNkNDEnIH19PlxyXG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS5sYXN0MzBEYXlzfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyMzODNkNDEnLCBmb250U2l6ZTogJzEycHgnIH19Pkxhc3QgMzAgRGF5czwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIHsvKiBDaGFydHMgU2VjdGlvbiAqL31cclxuICAgICAge2FwcHJvdmFsU3RhdHMgJiYgdG90YWxBcHByb3ZhbHMgPiAwICYmIChcclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXHJcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICdyZXBlYXQoYXV0by1maXQsIG1pbm1heCg0MDBweCwgMWZyKSknLFxyXG4gICAgICAgICAgICBnYXA6ICcyMHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMzBweCcsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHsvKiBBcHByb3ZhbCBTdGF0dXMgQmFyIENoYXJ0ICovfVxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJtZFwiPkFwcHJvdmFsIFN0YXR1cyBEaXN0cmlidXRpb248L0gyPlxyXG4gICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpblRvcDogJzMwcHgnIH19PlxyXG4gICAgICAgICAgICAgIHsvKiBQZW5kaW5nIEJhciAqL31cclxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyM4NTY0MDQnIH19PlBlbmRpbmc8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyM4NTY0MDQnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLnN1bW1hcnkudG90YWxQZW5kaW5nfSAoe3BlbmRpbmdQZXJjZW50LnRvRml4ZWQoMSl9JSlcclxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc0MHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3BlbmRpbmdQZXJjZW50fSVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZmZjMTA3IDAlLCAjZmZiMzAwIDEwMCUpJyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd3aWR0aCAxcyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgICAgey8qIEFwcHJvdmVkIEJhciAqL31cclxuICAgICAgICAgICAgICA8Qm94IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRXZWlnaHQ6ICc2MDAnLCBjb2xvcjogJyMxNTU3MjQnIH19PkFwcHJvdmVkPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250V2VpZ2h0OiAnNjAwJywgY29sb3I6ICcjMTU1NzI0JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5LnRvdGFsQXBwcm92ZWR9ICh7YXBwcm92ZWRQZXJjZW50LnRvRml4ZWQoMSl9JSlcclxuICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc0MHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke2FwcHJvdmVkUGVyY2VudH0lYCxcclxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgIzI4YTc0NSAwJSwgIzIwYzk5NyAxMDAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnd2lkdGggMXMgZWFzZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICAgIHsvKiBTdW1tYXJ5ICovfVxyXG4gICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzMwcHgnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTVweCcsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxNHB4JywgY29sb3I6ICcjNjY2JyB9fT5Ub3RhbCBSZXF1ZXN0czwvVGV4dD5cclxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjMzMzJyB9fT5cclxuICAgICAgICAgICAgICAgICAge3RvdGFsQXBwcm92YWxzfVxyXG4gICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgIHsvKiBBY3Rpdml0eSBUaW1lbGluZSBDaGFydCAqL31cclxuICAgICAgICAgIHt0aW1lbGluZURhdGEubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibWRcIj5SZWNlbnQgQWN0aXZpdHkgVHJlbmQgKExhc3QgMTQgRGF5cyk8L0gyPlxyXG4gICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgbWFyZ2luVG9wOiAnMzBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICB7IWhhc0FueUFjdGl2aXR5ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc2MHB4IDIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMTZweCcsIGNvbG9yOiAnIzY2NicsIG1hcmdpbkJvdHRvbTogJzEwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgTm8gYWN0aXZpdHkgaW4gdGhlIGxhc3QgMTQgZGF5c1xyXG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzE0cHgnLCBjb2xvcjogJyM5OTknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgQXBwcm92YWwgcmVxdWVzdHMgY3JlYXRlZCBpbiB0aGUgbGFzdCAxNCBkYXlzIHdpbGwgYXBwZWFyIGhlcmVcclxuICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICB7LyogTGVnZW5kICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXA6ICcyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMjBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCb3ggc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAnNXB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnM3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjhhNzQ1JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxMnB4JywgY29sb3I6ICcjNjY2JyB9fT5BcHByb3ZlZDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPEJveCBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6ICc1cHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICczcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmMxMDcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzEycHgnLCBjb2xvcjogJyM2NjYnIH19PlBlbmRpbmc8L1RleHQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qIENoYXJ0ICovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzIwMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAwJyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge3RpbWVsaW5lRGF0YS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXBwcm92ZWRIZWlnaHQgPSAoaXRlbS5hcHByb3ZlZCAvIG1heFZhbHVlKSAqIDE4MDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwZW5kaW5nSGVpZ2h0ID0gKGl0ZW0ucGVuZGluZyAvIG1heFZhbHVlKSAqIDE4MDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGVidWcgbG9nIGZvciBpdGVtcyB3aXRoIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5hcHByb3ZlZCA+IDAgfHwgaXRlbS5wZW5kaW5nID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbmRlcmluZyBiYXIgJHtpbmRleH0gKCR7aXRlbS5kYXRlfSk6IGFwcHJvdmVkIGhlaWdodD0ke2FwcHJvdmVkSGVpZ2h0fXB4LCBwZW5kaW5nIGhlaWdodD0ke3BlbmRpbmdIZWlnaHR9cHhgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnNXB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzE4MHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzMwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke2FwcHJvdmVkSGVpZ2h0fXB4YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiBhcHByb3ZlZEhlaWdodCA+IDAgPyAnNXB4JyA6ICcwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCA0cHggMCAwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2hlaWdodCAwLjVzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgIzFlN2UzNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2BBcHByb3ZlZDogJHtpdGVtLmFwcHJvdmVkfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzMwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3BlbmRpbmdIZWlnaHR9cHhgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IHBlbmRpbmdIZWlnaHQgPiAwID8gJzVweCcgOiAnMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmMxMDcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHggNHB4IDAgMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdoZWlnaHQgMC41cyBlYXNlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGE4MDAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtgUGVuZGluZzogJHtpdGVtLnBlbmRpbmd9YH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICc5cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjOTk5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgtNDVkZWcpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmRhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgey8qIFRhYmxlcyBHcmlkIFNlY3Rpb24gKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxyXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDQwMHB4LCAxZnIpKScsXHJcbiAgICAgICAgICBnYXA6ICcyMHB4JyxcclxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICB7LyogVG9wIFBlcmZvcm1pbmcgU2hvcHMgKi99XHJcbiAgICAgICAge3RvcFNob3BzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJsZ1wiPlRvcCBQZXJmb3JtaW5nIFNob3BzPC9IMj5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyB9fT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsIGJhY2tncm91bmQ6ICcjZjhmOWZhJyB9fT5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlJhbms8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+U2hvcCBOYW1lPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PkxvY2F0aW9uPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cclxuICAgICAgICAgICAgICAgICAgVHJhbnNhY3Rpb25zXHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxyXG4gICAgICAgICAgICAgICAgICBQb2ludHMgR2l2ZW5cclxuICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHt0b3BTaG9wcy5tYXAoKHNob3AsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHJcclxuICAgICAgICAgICAgICAgICAga2V5PXtzaG9wLnNob3BJZCB8fCBpbmRleH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206IGluZGV4IDwgdG9wU2hvcHMubGVuZ3RoIC0gMSA/ICcxcHggc29saWQgI2YwZjBmMCcgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZjhmOWZhJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID09PSAwID8gJyNGRkQ3MDAnIDogaW5kZXggPT09IDEgPyAnI0MwQzBDMCcgOiAnI0NEN0YzMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2luZGV4ICsgMX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PntzaG9wLnNob3BOYW1lIHx8ICdOL0EnfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGNvbG9yOiAnIzY2NicgfX0+e3Nob3AubG9jYXRpb24gfHwgJ04vQSd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzE3YTJiOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG9wLnRvdGFsVHJhbnNhY3Rpb25zIHx8IDB9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2ZjQyYzEnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7c2hvcC50b3RhbFBvaW50c1VzZWQgfHwgMH1cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgey8qIE1vc3QgUmVxdWVzdGVkIFByb2R1Y3RzICovfVxyXG4gICAgICAgIHthcHByb3ZhbFN0YXRzPy5tb3N0UmVxdWVzdGVkUHJvZHVjdHM/Lmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJsZ1wiPk1vc3QgUmVxdWVzdGVkIFByb2R1Y3RzPC9IMj5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyB9fT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsIGJhY2tncm91bmQ6ICcjZjhmOWZhJyB9fT5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlJhbms8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIFByb2R1Y3QgTmFtZVxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cclxuICAgICAgICAgICAgICAgICAgUmVxdWVzdCBDb3VudFxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMubW9zdFJlcXVlc3RlZFByb2R1Y3RzLm1hcCgocHJvZHVjdCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDx0clxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3Byb2R1Y3QucHJvZHVjdElkIHx8IGluZGV4fVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTpcclxuICAgICAgICAgICAgICAgICAgICAgIGluZGV4IDwgYXBwcm92YWxTdGF0cy5tb3N0UmVxdWVzdGVkUHJvZHVjdHMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICcxcHggc29saWQgI2YwZjBmMCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZjhmOWZhJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzI4YTc0NScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2luZGV4ICsgMX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnByb2R1Y3ROYW1lIHx8ICdOL0EnfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMjhhNzQ1JyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3QucmVxdWVzdENvdW50IHx8IDB9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIE1vc3QgQ29sbGVjdGVkIEdpZnRzIFNlY3Rpb24gKi99XHJcbiAgICAgIHttb3N0UmVkZWVtZWRSZXdhcmRzLmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcclxuICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDQwMHB4LCAxZnIpKScsXHJcbiAgICAgICAgICAgIGdhcDogJzIwcHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICczMHB4JyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgey8qIE1vc3QgQ29sbGVjdGVkIEdpZnRzIFRhYmxlICovfVxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJsZ1wiPk1vc3QgQ29sbGVjdGVkIEdpZnRzPC9IMj5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyB9fT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsIGJhY2tncm91bmQ6ICcjZjhmOWZhJyB9fT5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlJhbms8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIFJld2FyZCBOYW1lXHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxyXG4gICAgICAgICAgICAgICAgICBSZWRlbXB0aW9uc1xyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cclxuICAgICAgICAgICAgICAgICAgVG90YWwgUG9pbnRzIFNwZW50XHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7bW9zdFJlZGVlbWVkUmV3YXJkcy5tYXAoKHJld2FyZCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDx0clxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3Jld2FyZC5yZXdhcmRJZCB8fCBpbmRleH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleCA8IG1vc3RSZWRlZW1lZFJld2FyZHMubGVuZ3RoIC0gMSA/ICcxcHggc29saWQgI2YwZjBmMCcgOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaW5kZXggJSAyID09PSAwID8gJ3doaXRlJyA6ICcjZjhmOWZhJyxcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzZmNDJjMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2luZGV4ICsgMX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIGZvbnRXZWlnaHQ6ICc1MDAnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmV3YXJkTmFtZSB8fCAnTi9BJ31cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzE3YTJiOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmVkZW1wdGlvbkNvdW50IHx8IDB9XHJcbiAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTJweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM2ZjQyYzEnLFxyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7cmV3YXJkLnRvdGFsUG9pbnRzU3BlbnQgfHwgMH1cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgey8qIFJlZGVtcHRpb25zIENoYXJ0ICovfVxyXG4gICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJtZFwiPlJlZGVtcHRpb24gRGlzdHJpYnV0aW9uPC9IMj5cclxuICAgICAgICAgICAgPEJveCBzdHlsZT17eyBtYXJnaW5Ub3A6ICczMHB4JyB9fT5cclxuICAgICAgICAgICAgICB7bW9zdFJlZGVlbWVkUmV3YXJkcy5zbGljZSgwLCA1KS5tYXAoKHJld2FyZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heFJlZGVtcHRpb25zID0gTWF0aC5tYXgoXHJcbiAgICAgICAgICAgICAgICAgIC4uLm1vc3RSZWRlZW1lZFJld2FyZHMuc2xpY2UoMCwgNSkubWFwKChyKSA9PiBwYXJzZUludChyLnJlZGVtcHRpb25Db3VudCkgfHwgMCksXHJcbiAgICAgICAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFyV2lkdGggPVxyXG4gICAgICAgICAgICAgICAgICAoKHBhcnNlSW50KHJld2FyZC5yZWRlbXB0aW9uQ291bnQpIHx8IDApIC8gbWF4UmVkZW1wdGlvbnMpICogMTAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgIDxCb3gga2V5PXtyZXdhcmQucmV3YXJkSWQgfHwgaW5kZXh9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNjAwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0OTUwNTcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTRweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6ICc2MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtyZXdhcmQucmV3YXJkTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Jld2FyZC5yZXdhcmROYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFdlaWdodDogJzYwMCcsIGNvbG9yOiAnIzZmNDJjMScsIGZvbnRTaXplOiAnMTRweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZXdhcmQucmVkZW1wdGlvbkNvdW50fSByZWRlbXB0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzMwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7YmFyV2lkdGh9JWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgIzZmNDJjMSAwJSwgIzliNTliNiAxMDAlKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIDFzIGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJzEwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJ3doaXRlJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogJ2JvbGQnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtyZXdhcmQudG90YWxQb2ludHNTcGVudH0gcHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgIHsvKiBTdW1tYXJ5ICovfVxyXG4gICAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzMwcHgnLFxyXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMTVweCcsXHJcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZjhmOWZhJyxcclxuICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICcxNHB4JywgY29sb3I6ICcjNjY2JyB9fT5Ub3RhbCBSZWRlbXB0aW9uczwvVGV4dD5cclxuICAgICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjNmY0MmMxJyB9fT5cclxuICAgICAgICAgICAgICAgICAge21vc3RSZWRlZW1lZFJld2FyZHMucmVkdWNlKFxyXG4gICAgICAgICAgICAgICAgICAgIChzdW0sIHIpID0+IHN1bSArIChwYXJzZUludChyLnJlZGVtcHRpb25Db3VudCkgfHwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcbiAgICAgICAgICA8L0JveD5cclxuICAgICAgICA8L0JveD5cclxuICAgICAgKX1cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBCdXR0b24sIExhYmVsLCBJbnB1dCwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xyXG5pbXBvcnQgeyB1c2VOb3RpY2UsIEFwaUNsaWVudCB9IGZyb20gJ2FkbWluanMnO1xyXG5cclxuY29uc3QgQXBwcm92ZVByb2R1Y3QgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IHJlY29yZCwgcmVzb3VyY2UgfSA9IHByb3BzO1xyXG4gIGNvbnN0IFtwb2ludFZhbHVlLCBzZXRQb2ludFZhbHVlXSA9IHVzZVN0YXRlKHJlY29yZC5wYXJhbXMucG9pbnRWYWx1ZSB8fCAxMCk7XHJcbiAgY29uc3QgW3Nob3BJZCwgc2V0U2hvcElkXSA9IHVzZVN0YXRlKHJlY29yZC5wYXJhbXMuc2hvcElkIHx8ICcnKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgYWRkTm90aWNlID0gdXNlTm90aWNlKCk7XHJcbiAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG5cclxuICBjb25zdCBoYW5kbGVBcHByb3ZlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKCFwb2ludFZhbHVlIHx8IHBvaW50VmFsdWUgPD0gMCkge1xyXG4gICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwb2ludCB2YWx1ZSBncmVhdGVyIHRoYW4gMCcsXHJcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlY29yZEFjdGlvbih7XHJcbiAgICAgICAgcmVzb3VyY2VJZDogcmVzb3VyY2UuaWQsXHJcbiAgICAgICAgcmVjb3JkSWQ6IHJlY29yZC5pZCxcclxuICAgICAgICBhY3Rpb25OYW1lOiAnYXBwcm92ZScsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgcG9pbnRWYWx1ZTogcGFyc2VJbnQocG9pbnRWYWx1ZSksXHJcbiAgICAgICAgICBzaG9wSWQ6IHNob3BJZCB8fCBudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEubm90aWNlKSB7XHJcbiAgICAgICAgYWRkTm90aWNlKHJlc3BvbnNlLmRhdGEubm90aWNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmwpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLmRhdGEucmVkaXJlY3RVcmw7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFkZE5vdGljZSh7XHJcbiAgICAgICAgbWVzc2FnZTogYEVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCxcclxuICAgICAgICB0eXBlOiAnZXJyb3InLFxyXG4gICAgICB9KTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIj5cclxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxyXG4gICAgICAgIDxNZXNzYWdlQm94IG1lc3NhZ2U9XCJTZXQgdGhlIHBvaW50IHZhbHVlIGZvciB0aGlzIHByb2R1Y3QgYW5kIGFwcHJvdmUgaXQuIEFsbCB1c2VycyB3aG8gcmVxdWVzdGVkIHRoaXMgcHJvZHVjdCB3aWxsIGJlIHJld2FyZGVkLlwiIHZhcmlhbnQ9XCJpbmZvXCIgLz5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XHJcbiAgICAgICAgPExhYmVsPlByb2R1Y3QgTmFtZTwvTGFiZWw+XHJcbiAgICAgICAgPElucHV0IHZhbHVlPXtyZWNvcmQucGFyYW1zLm5hbWV9IGRpc2FibGVkIC8+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxyXG4gICAgICAgIDxMYWJlbCByZXF1aXJlZD5Qb2ludCBWYWx1ZSAqPC9MYWJlbD5cclxuICAgICAgICA8SW5wdXRcclxuICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxyXG4gICAgICAgICAgdmFsdWU9e3BvaW50VmFsdWV9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBvaW50VmFsdWUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwb2ludCB2YWx1ZVwiXHJcbiAgICAgICAgICBtaW49XCIxXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieGxcIj5cclxuICAgICAgICA8TGFiZWw+U2hvcCBJRCAob3B0aW9uYWwpPC9MYWJlbD5cclxuICAgICAgICA8SW5wdXRcclxuICAgICAgICAgIHZhbHVlPXtzaG9wSWR9XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNob3BJZChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHNob3AgVVVJRCBvciBsZWF2ZSBlbXB0eVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94PlxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHZhcmlhbnQ9XCJwcmltYXJ5XCJcclxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFwcHJvdmV9XHJcbiAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7bG9hZGluZyA/ICdBcHByb3ZpbmcuLi4nIDogJ0FwcHJvdmUgUHJvZHVjdCd9XHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgdmFyaWFudD1cInRleHRcIlxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93Lmhpc3RvcnkuYmFjaygpfVxyXG4gICAgICAgICAgbWw9XCJkZWZhdWx0XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICBDYW5jZWxcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9Cb3g+XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwcm92ZVByb2R1Y3Q7XHJcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuLi9kaXN0L2FkbWluL2Rhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuRGFzaGJvYXJkID0gRGFzaGJvYXJkXG5pbXBvcnQgQXBwcm92ZVByb2R1Y3QgZnJvbSAnLi4vZGlzdC9hZG1pbi9hcHByb3ZlLXByb2R1Y3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkFwcHJvdmVQcm9kdWN0ID0gQXBwcm92ZVByb2R1Y3QiXSwibmFtZXMiOlsiRGFzaGJvYXJkIiwiZGF0YSIsInNldERhdGEiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlRWZmZWN0IiwiZmV0Y2hEYXRhIiwiYXBpIiwiQXBpQ2xpZW50IiwicmVzcG9uc2UiLCJnZXREYXNoYm9hcmQiLCJjb25zb2xlIiwibG9nIiwib3ZlcnZpZXciLCJhcHByb3ZhbFN0YXRzIiwiZGFpbHlTdGF0cyIsImVycm9yIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwicGFkZGluZyIsInN0eWxlIiwidGV4dEFsaWduIiwiTG9hZGVyIiwiVGV4dCIsIm1hcmdpblRvcCIsInRvcFNob3BzIiwibW9zdFJlZGVlbWVkUmV3YXJkcyIsInRvdGFsQXBwcm92YWxzIiwic3VtbWFyeSIsInRvdGFsUGVuZGluZyIsInRvdGFsQXBwcm92ZWQiLCJwZW5kaW5nUGVyY2VudCIsImFwcHJvdmVkUGVyY2VudCIsInRpbWVsaW5lRGF0YSIsImxlbmd0aCIsImhhc0FueUFjdGl2aXR5Iiwic29tZSIsImQiLCJhcHByb3ZlZCIsInBlbmRpbmciLCJtYXhWYWx1ZSIsIk1hdGgiLCJtYXgiLCJtYXAiLCJmb3JFYWNoIiwiaXRlbSIsImlkeCIsImRhdGUiLCJiYWNrZ3JvdW5kIiwibWluSGVpZ2h0IiwiSDEiLCJtYXJnaW5Cb3R0b20iLCJkaXNwbGF5IiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdhcCIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsImJveFNoYWRvdyIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImNvbG9yIiwidG90YWxVc2VycyIsInRvdGFsU2hvcHMiLCJ0b3RhbFRyYW5zYWN0aW9ucyIsInRvdGFsQXBwcm92YWxSZXF1ZXN0cyIsInRvdGFsUG9pbnRzVXNlZCIsIkgyIiwiYm9yZGVyTGVmdCIsImxhc3Q3RGF5cyIsImxhc3QzMERheXMiLCJqdXN0aWZ5Q29udGVudCIsInRvRml4ZWQiLCJ3aWR0aCIsImhlaWdodCIsIm92ZXJmbG93IiwicG9zaXRpb24iLCJ0cmFuc2l0aW9uIiwiYWxpZ25JdGVtcyIsIkZyYWdtZW50IiwiYm9yZGVyQm90dG9tIiwiaW5kZXgiLCJhcHByb3ZlZEhlaWdodCIsInBlbmRpbmdIZWlnaHQiLCJrZXkiLCJmbGV4RGlyZWN0aW9uIiwiZmxleCIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJ0aXRsZSIsInRyYW5zZm9ybSIsIndoaXRlU3BhY2UiLCJib3JkZXJDb2xsYXBzZSIsInNob3AiLCJzaG9wSWQiLCJsaW5lSGVpZ2h0Iiwic2hvcE5hbWUiLCJsb2NhdGlvbiIsIm1vc3RSZXF1ZXN0ZWRQcm9kdWN0cyIsInByb2R1Y3QiLCJwcm9kdWN0SWQiLCJwcm9kdWN0TmFtZSIsInJlcXVlc3RDb3VudCIsInJld2FyZCIsInJld2FyZElkIiwicmV3YXJkTmFtZSIsInJlZGVtcHRpb25Db3VudCIsInRvdGFsUG9pbnRzU3BlbnQiLCJzbGljZSIsIm1heFJlZGVtcHRpb25zIiwiciIsInBhcnNlSW50IiwiYmFyV2lkdGgiLCJ0ZXh0T3ZlcmZsb3ciLCJwYWRkaW5nTGVmdCIsInJlZHVjZSIsInN1bSIsIkFwcHJvdmVQcm9kdWN0IiwicHJvcHMiLCJyZWNvcmQiLCJyZXNvdXJjZSIsInBvaW50VmFsdWUiLCJzZXRQb2ludFZhbHVlIiwicGFyYW1zIiwic2V0U2hvcElkIiwiYWRkTm90aWNlIiwidXNlTm90aWNlIiwiaGFuZGxlQXBwcm92ZSIsIm1lc3NhZ2UiLCJ0eXBlIiwicmVjb3JkQWN0aW9uIiwicmVzb3VyY2VJZCIsImlkIiwicmVjb3JkSWQiLCJhY3Rpb25OYW1lIiwibm90aWNlIiwicmVkaXJlY3RVcmwiLCJ3aW5kb3ciLCJocmVmIiwiTWVzc2FnZUJveCIsInZhcmlhbnQiLCJMYWJlbCIsIklucHV0IiwidmFsdWUiLCJuYW1lIiwiZGlzYWJsZWQiLCJyZXF1aXJlZCIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwibWluIiwiQnV0dG9uIiwib25DbGljayIsImhpc3RvcnkiLCJiYWNrIiwibWwiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFJQSxNQUFNQSxTQUFTLEdBQUdBLE1BQU07SUFDdEIsTUFBTSxDQUFDQyxJQUFJLEVBQUVDLE9BQU8sQ0FBQyxHQUFHQyxjQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFQyxV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
