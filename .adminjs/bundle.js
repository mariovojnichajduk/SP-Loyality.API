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
      approvalStats
    } = data;
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
        background: '#f8d7da',
        borderRadius: '6px',
        borderLeft: '4px solid #dc3545',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#721c24'
      }
    }, approvalStats.summary.totalRejected), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
      style: {
        color: '#721c24',
        fontSize: '12px'
      }
    }, "Rejected")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
    }, "Last 30 Days")))), topShops.length > 0 && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
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
    }, product.requestCount || 0)))))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2Rhc2hib2FyZC5qc3giLCIuLi9kaXN0L2FkbWluL2FwcHJvdmUtcHJvZHVjdC5qc3giLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQm94LCBIMSwgSDIsIFRleHQsIExvYWRlciwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgQXBpQ2xpZW50IH0gZnJvbSAnYWRtaW5qcyc7XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYXBpID0gbmV3IEFwaUNsaWVudCgpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLmdldERhc2hib2FyZCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXNoYm9hcmQgQVBJIHJlc3BvbnNlOicsIHJlc3BvbnNlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGFzaGJvYXJkIGRhdGE6JywgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ092ZXJ2aWV3OicsIHJlc3BvbnNlLmRhdGE/Lm92ZXJ2aWV3KTtcclxuICAgICAgICBzZXREYXRhKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhc2hib2FyZCBkYXRhOicsIGVycm9yKTtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmZXRjaERhdGEoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGlmIChsb2FkaW5nKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxyXG4gICAgICAgIDxMb2FkZXIgLz5cclxuICAgICAgICA8VGV4dCBzdHlsZT17eyBtYXJnaW5Ub3A6ICcyMHB4JyB9fT5Mb2FkaW5nIHN0YXRpc3RpY3MuLi48L1RleHQ+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmICghZGF0YSB8fCAhZGF0YS5vdmVydmlldykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPEJveCBwYWRkaW5nPVwieHhsXCI+XHJcbiAgICAgICAgPFRleHQ+Tm8gc3RhdGlzdGljcyBhdmFpbGFibGU8L1RleHQ+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgb3ZlcnZpZXcsIHRvcFNob3BzID0gW10sIGFwcHJvdmFsU3RhdHMgfSA9IGRhdGE7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Qm94IHBhZGRpbmc9XCJ4eGxcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAnI2Y1ZjVmNScsIG1pbkhlaWdodDogJzEwMHZoJyB9fT5cclxuICAgICAgPEgxIG1hcmdpbkJvdHRvbT1cInh4bFwiPlNQIExveWFsdHkgRGFzaGJvYXJkPC9IMT5cclxuXHJcbiAgICAgIHsvKiBPdmVyYWxsIFN0YXRpc3RpY3MgQ2FyZHMgKi99XHJcbiAgICAgIDxCb3hcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxyXG4gICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKScsXHJcbiAgICAgICAgICBnYXA6ICcyMHB4JyxcclxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzMwcHgnLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBmb250U2l6ZTogJzQycHgnLFxyXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICBjb2xvcjogJyMwMDdiZmYnLFxyXG4gICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzhweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtvdmVydmlldy50b3RhbFVzZXJzIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5Ub3RhbCBVc2VyczwvVGV4dD5cclxuICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICc0MnB4JyxcclxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgY29sb3I6ICcjMjhhNzQ1JyxcclxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc4cHgnLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7b3ZlcnZpZXcudG90YWxTaG9wcyB8fCAwfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+VG90YWwgU2hvcHM8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzE3YTJiOCcsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsVHJhbnNhY3Rpb25zIHx8IDB9XHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM2NjYnLCBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5UcmFuc2FjdGlvbnM8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnI2ZmYzEwNycsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsQXBwcm92YWxSZXF1ZXN0cyB8fCAwfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+XHJcbiAgICAgICAgICAgIEFwcHJvdmFsIFJlcXVlc3RzXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiAnNDJweCcsXHJcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzZmNDJjMScsXHJcbiAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge292ZXJ2aWV3LnRvdGFsUG9pbnRzVXNlZCB8fCAwfVxyXG4gICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNjY2JywgZm9udFNpemU6ICcxNHB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+XHJcbiAgICAgICAgICAgIFRvdGFsIFBvaW50cyBVc2VkXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgey8qIEFwcHJvdmFsIFJlcXVlc3RzIFN1bW1hcnkgKi99XHJcbiAgICAgIHthcHByb3ZhbFN0YXRzICYmIChcclxuICAgICAgICA8Qm94XHJcbiAgICAgICAgICBwYWRkaW5nPVwibGdcIlxyXG4gICAgICAgICAgbWFyZ2luQm90dG9tPVwibGdcIlxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3doaXRlJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlMGUwZTAnLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEgyIG1hcmdpbkJvdHRvbT1cImxnXCI+QXBwcm92YWwgUmVxdWVzdHMgU3RhdHVzPC9IMj5cclxuICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXHJcbiAgICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpdCwgbWlubWF4KDE1MHB4LCAxZnIpKScsXHJcbiAgICAgICAgICAgICAgZ2FwOiAnMTVweCcsXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwYWRkaW5nPVwibWRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZjNjZCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjZmZjMTA3JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjODU2NDA0JyB9fT5cclxuICAgICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLnN1bW1hcnkudG90YWxQZW5kaW5nfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyM4NTY0MDQnLCBmb250U2l6ZTogJzEycHgnIH19PlBlbmRpbmc8L1RleHQ+XHJcbiAgICAgICAgICAgIDwvQm94PlxyXG5cclxuICAgICAgICAgICAgPEJveFxyXG4gICAgICAgICAgICAgIHBhZGRpbmc9XCJtZFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjZDRlZGRhJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzZweCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnNHB4IHNvbGlkICMyOGE3NDUnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgZm9udFNpemU6ICczMnB4JywgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJyMxNTU3MjQnIH19PlxyXG4gICAgICAgICAgICAgICAge2FwcHJvdmFsU3RhdHMuc3VtbWFyeS50b3RhbEFwcHJvdmVkfVxyXG4gICAgICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBjb2xvcjogJyMxNTU3MjQnLCBmb250U2l6ZTogJzEycHgnIH19PkFwcHJvdmVkPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuXHJcbiAgICAgICAgICAgIDxCb3hcclxuICAgICAgICAgICAgICBwYWRkaW5nPVwibWRcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZDdkYScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzRweCBzb2xpZCAjZGMzNTQ1JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjNzIxYzI0JyB9fT5cclxuICAgICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLnN1bW1hcnkudG90YWxSZWplY3RlZH1cclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjNzIxYzI0JywgZm9udFNpemU6ICcxMnB4JyB9fT5SZWplY3RlZDwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcGFkZGluZz1cIm1kXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNkMWVjZjEnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6ICc0cHggc29saWQgIzE3YTJiOCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzBjNTQ2MCcgfX0+XHJcbiAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5Lmxhc3Q3RGF5c31cclxuICAgICAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgICAgICAgPFRleHQgc3R5bGU9e3sgY29sb3I6ICcjMGM1NDYwJywgZm9udFNpemU6ICcxMnB4JyB9fT5MYXN0IDcgRGF5czwvVGV4dD5cclxuICAgICAgICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICAgICAgICA8Qm94XHJcbiAgICAgICAgICAgICAgcGFkZGluZz1cIm1kXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNlMmUzZTUnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNnB4JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckxlZnQ6ICc0cHggc29saWQgIzZjNzU3ZCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8VGV4dCBzdHlsZT17eyBmb250U2l6ZTogJzMycHgnLCBmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnIzM4M2Q0MScgfX0+XHJcbiAgICAgICAgICAgICAgICB7YXBwcm92YWxTdGF0cy5zdW1tYXJ5Lmxhc3QzMERheXN9XHJcbiAgICAgICAgICAgICAgPC9UZXh0PlxyXG4gICAgICAgICAgICAgIDxUZXh0IHN0eWxlPXt7IGNvbG9yOiAnIzM4M2Q0MScsIGZvbnRTaXplOiAnMTJweCcgfX0+TGFzdCAzMCBEYXlzPC9UZXh0PlxyXG4gICAgICAgICAgICA8L0JveD5cclxuICAgICAgICAgIDwvQm94PlxyXG4gICAgICAgIDwvQm94PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgey8qIFRvcCBQZXJmb3JtaW5nIFNob3BzICovfVxyXG4gICAgICB7dG9wU2hvcHMubGVuZ3RoID4gMCAmJiAoXHJcbiAgICAgICAgPEJveFxyXG4gICAgICAgICAgcGFkZGluZz1cImxnXCJcclxuICAgICAgICAgIG1hcmdpbkJvdHRvbT1cImxnXCJcclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjZTBlMGUwJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxIMiBtYXJnaW5Cb3R0b209XCJsZ1wiPlRvcCBQZXJmb3JtaW5nIFNob3BzPC9IMj5cclxuICAgICAgICAgIDx0YWJsZSBzdHlsZT17eyB3aWR0aDogJzEwMCUnLCBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyB9fT5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0ciBzdHlsZT17eyBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RlZTJlNicsIGJhY2tncm91bmQ6ICcjZjhmOWZhJyB9fT5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlJhbms8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAnbGVmdCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+U2hvcCBOYW1lPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PkxvY2F0aW9uPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ3JpZ2h0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5cclxuICAgICAgICAgICAgICAgICAgVHJhbnNhY3Rpb25zXHJcbiAgICAgICAgICAgICAgICA8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgdGV4dEFsaWduOiAncmlnaHQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxyXG4gICAgICAgICAgICAgICAgICBQb2ludHMgVXNlZFxyXG4gICAgICAgICAgICAgICAgPC90aD5cclxuICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAge3RvcFNob3BzLm1hcCgoc2hvcCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDx0clxyXG4gICAgICAgICAgICAgICAgICBrZXk9e3Nob3Auc2hvcElkIHx8IGluZGV4fVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogaW5kZXggPCB0b3BTaG9wcy5sZW5ndGggLSAxID8gJzFweCBzb2xpZCAjZjBmMGYwJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpbmRleCAlIDIgPT09IDAgPyAnd2hpdGUnIDogJyNmOGY5ZmEnLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMjhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPT09IDAgPyAnI0ZGRDcwMCcgOiBpbmRleCA9PT0gMSA/ICcjQzBDMEMwJyA6ICcjQ0Q3RjMyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcyOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aW5kZXggKyAxfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgZm9udFdlaWdodDogJzUwMCcgfX0+e3Nob3Auc2hvcE5hbWUgfHwgJ04vQSd9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPXt7IHBhZGRpbmc6ICcxMnB4JywgY29sb3I6ICcjNjY2JyB9fT57c2hvcC5sb2NhdGlvbiB8fCAnTi9BJ308L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGRcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMTdhMmI4JyxcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3AudG90YWxUcmFuc2FjdGlvbnMgfHwgMH1cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzZmNDJjMScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG9wLnRvdGFsUG9pbnRzVXNlZCB8fCAwfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICB7LyogTW9zdCBSZXF1ZXN0ZWQgUHJvZHVjdHMgKi99XHJcbiAgICAgIHthcHByb3ZhbFN0YXRzPy5tb3N0UmVxdWVzdGVkUHJvZHVjdHM/Lmxlbmd0aCA+IDAgJiYgKFxyXG4gICAgICAgIDxCb3hcclxuICAgICAgICAgIHBhZGRpbmc9XCJsZ1wiXHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2UwZTBlMCcsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8SDIgbWFyZ2luQm90dG9tPVwibGdcIj5Nb3N0IFJlcXVlc3RlZCBQcm9kdWN0czwvSDI+XHJcbiAgICAgICAgICA8dGFibGUgc3R5bGU9e3sgd2lkdGg6ICcxMDAlJywgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScgfX0+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICA8dHIgc3R5bGU9e3sgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZWUyZTYnLCBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScgfX0+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdsZWZ0JywgY29sb3I6ICcjNDk1MDU3JyB9fT5SYW5rPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcsIHRleHRBbGlnbjogJ2xlZnQnLCBjb2xvcjogJyM0OTUwNTcnIH19PlxyXG4gICAgICAgICAgICAgICAgICBQcm9kdWN0IE5hbWVcclxuICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCB0ZXh0QWxpZ246ICdyaWdodCcsIGNvbG9yOiAnIzQ5NTA1NycgfX0+XHJcbiAgICAgICAgICAgICAgICAgIFJlcXVlc3QgQ291bnRcclxuICAgICAgICAgICAgICAgIDwvdGg+XHJcbiAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHthcHByb3ZhbFN0YXRzLm1vc3RSZXF1ZXN0ZWRQcm9kdWN0cy5tYXAoKHByb2R1Y3QsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8dHJcclxuICAgICAgICAgICAgICAgICAga2V5PXtwcm9kdWN0LnByb2R1Y3RJZCB8fCBpbmRleH1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJCb3R0b206XHJcbiAgICAgICAgICAgICAgICAgICAgICBpbmRleCA8IGFwcHJvdmFsU3RhdHMubW9zdFJlcXVlc3RlZFByb2R1Y3RzLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnMXB4IHNvbGlkICNmMGYwZjAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGluZGV4ICUgMiA9PT0gMCA/ICd3aGl0ZScgOiAnI2Y4ZjlmYScsXHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT17eyBwYWRkaW5nOiAnMTJweCcgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyOGE3NDUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzI4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpbmRleCArIDF9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgcGFkZGluZzogJzEycHgnLCBmb250V2VpZ2h0OiAnNTAwJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5wcm9kdWN0TmFtZSB8fCAnTi9BJ31cclxuICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgPHRkXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzI4YTc0NScsXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LnJlcXVlc3RDb3VudCB8fCAwfVxyXG4gICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9Cb3g+XHJcbiAgICAgICl9XHJcbiAgICA8L0JveD5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBMYWJlbCwgSW5wdXQsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcclxuaW1wb3J0IHsgdXNlTm90aWNlLCBBcGlDbGllbnQgfSBmcm9tICdhZG1pbmpzJztcclxuXHJcbmNvbnN0IEFwcHJvdmVQcm9kdWN0ID0gKHByb3BzKSA9PiB7XHJcbiAgY29uc3QgeyByZWNvcmQsIHJlc291cmNlIH0gPSBwcm9wcztcclxuICBjb25zdCBbcG9pbnRWYWx1ZSwgc2V0UG9pbnRWYWx1ZV0gPSB1c2VTdGF0ZShyZWNvcmQucGFyYW1zLnBvaW50VmFsdWUgfHwgMTApO1xyXG4gIGNvbnN0IFtzaG9wSWQsIHNldFNob3BJZF0gPSB1c2VTdGF0ZShyZWNvcmQucGFyYW1zLnNob3BJZCB8fCAnJyk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGFkZE5vdGljZSA9IHVzZU5vdGljZSgpO1xyXG4gIGNvbnN0IGFwaSA9IG5ldyBBcGlDbGllbnQoKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQXBwcm92ZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmICghcG9pbnRWYWx1ZSB8fCBwb2ludFZhbHVlIDw9IDApIHtcclxuICAgICAgYWRkTm90aWNlKHtcclxuICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgcG9pbnQgdmFsdWUgZ3JlYXRlciB0aGFuIDAnLFxyXG4gICAgICAgIHR5cGU6ICdlcnJvcicsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5yZWNvcmRBY3Rpb24oe1xyXG4gICAgICAgIHJlc291cmNlSWQ6IHJlc291cmNlLmlkLFxyXG4gICAgICAgIHJlY29yZElkOiByZWNvcmQuaWQsXHJcbiAgICAgICAgYWN0aW9uTmFtZTogJ2FwcHJvdmUnLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHBvaW50VmFsdWU6IHBhcnNlSW50KHBvaW50VmFsdWUpLFxyXG4gICAgICAgICAgc2hvcElkOiBzaG9wSWQgfHwgbnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLm5vdGljZSkge1xyXG4gICAgICAgIGFkZE5vdGljZShyZXNwb25zZS5kYXRhLm5vdGljZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLnJlZGlyZWN0VXJsKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS5kYXRhLnJlZGlyZWN0VXJsO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhZGROb3RpY2Uoe1xyXG4gICAgICAgIG1lc3NhZ2U6IGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWAsXHJcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcclxuICAgICAgfSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEJveCBwYWRkaW5nPVwieHhsXCI+XHJcbiAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieGxcIj5cclxuICAgICAgICA8TWVzc2FnZUJveCBtZXNzYWdlPVwiU2V0IHRoZSBwb2ludCB2YWx1ZSBmb3IgdGhpcyBwcm9kdWN0IGFuZCBhcHByb3ZlIGl0LiBBbGwgdXNlcnMgd2hvIHJlcXVlc3RlZCB0aGlzIHByb2R1Y3Qgd2lsbCBiZSByZXdhcmRlZC5cIiB2YXJpYW50PVwiaW5mb1wiIC8+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveCBtYXJnaW5Cb3R0b209XCJ4bFwiPlxyXG4gICAgICAgIDxMYWJlbD5Qcm9kdWN0IE5hbWU8L0xhYmVsPlxyXG4gICAgICAgIDxJbnB1dCB2YWx1ZT17cmVjb3JkLnBhcmFtcy5uYW1lfSBkaXNhYmxlZCAvPlxyXG4gICAgICA8L0JveD5cclxuXHJcbiAgICAgIDxCb3ggbWFyZ2luQm90dG9tPVwieGxcIj5cclxuICAgICAgICA8TGFiZWwgcmVxdWlyZWQ+UG9pbnQgVmFsdWUgKjwvTGFiZWw+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgIHZhbHVlPXtwb2ludFZhbHVlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQb2ludFZhbHVlKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcG9pbnQgdmFsdWVcIlxyXG4gICAgICAgICAgbWluPVwiMVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9Cb3g+XHJcblxyXG4gICAgICA8Qm94IG1hcmdpbkJvdHRvbT1cInhsXCI+XHJcbiAgICAgICAgPExhYmVsPlNob3AgSUQgKG9wdGlvbmFsKTwvTGFiZWw+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICB2YWx1ZT17c2hvcElkfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTaG9wSWQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzaG9wIFVVSUQgb3IgbGVhdmUgZW1wdHlcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvQm94PlxyXG5cclxuICAgICAgPEJveD5cclxuICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXHJcbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBcHByb3ZlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2xvYWRpbmd9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge2xvYWRpbmcgPyAnQXBwcm92aW5nLi4uJyA6ICdBcHByb3ZlIFByb2R1Y3QnfVxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDxCdXR0b25cclxuICAgICAgICAgIHZhcmlhbnQ9XCJ0ZXh0XCJcclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHdpbmRvdy5oaXN0b3J5LmJhY2soKX1cclxuICAgICAgICAgIG1sPVwiZGVmYXVsdFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDwvQm94PlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcHJvdmVQcm9kdWN0O1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi4vZGlzdC9hZG1pbi9kYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkRhc2hib2FyZCA9IERhc2hib2FyZFxuaW1wb3J0IEFwcHJvdmVQcm9kdWN0IGZyb20gJy4uL2Rpc3QvYWRtaW4vYXBwcm92ZS1wcm9kdWN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BcHByb3ZlUHJvZHVjdCA9IEFwcHJvdmVQcm9kdWN0Il0sIm5hbWVzIjpbIkRhc2hib2FyZCIsImRhdGEiLCJzZXREYXRhIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInVzZUVmZmVjdCIsImZldGNoRGF0YSIsImFwaSIsIkFwaUNsaWVudCIsInJlc3BvbnNlIiwiZ2V0RGFzaGJvYXJkIiwiY29uc29sZSIsImxvZyIsIm92ZXJ2aWV3IiwiZXJyb3IiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJwYWRkaW5nIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJMb2FkZXIiLCJUZXh0IiwibWFyZ2luVG9wIiwidG9wU2hvcHMiLCJhcHByb3ZhbFN0YXRzIiwiYmFja2dyb3VuZCIsIm1pbkhlaWdodCIsIkgxIiwibWFyZ2luQm90dG9tIiwiZGlzcGxheSIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJnYXAiLCJib3JkZXJSYWRpdXMiLCJib3JkZXIiLCJib3hTaGFkb3ciLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJjb2xvciIsInRvdGFsVXNlcnMiLCJ0b3RhbFNob3BzIiwidG90YWxUcmFuc2FjdGlvbnMiLCJ0b3RhbEFwcHJvdmFsUmVxdWVzdHMiLCJ0b3RhbFBvaW50c1VzZWQiLCJIMiIsImJvcmRlckxlZnQiLCJzdW1tYXJ5IiwidG90YWxQZW5kaW5nIiwidG90YWxBcHByb3ZlZCIsInRvdGFsUmVqZWN0ZWQiLCJsYXN0N0RheXMiLCJsYXN0MzBEYXlzIiwibGVuZ3RoIiwid2lkdGgiLCJib3JkZXJDb2xsYXBzZSIsImJvcmRlckJvdHRvbSIsIm1hcCIsInNob3AiLCJpbmRleCIsImtleSIsInNob3BJZCIsImhlaWdodCIsImxpbmVIZWlnaHQiLCJzaG9wTmFtZSIsImxvY2F0aW9uIiwibW9zdFJlcXVlc3RlZFByb2R1Y3RzIiwicHJvZHVjdCIsInByb2R1Y3RJZCIsInByb2R1Y3ROYW1lIiwicmVxdWVzdENvdW50IiwiQXBwcm92ZVByb2R1Y3QiLCJwcm9wcyIsInJlY29yZCIsInJlc291cmNlIiwicG9pbnRWYWx1ZSIsInNldFBvaW50VmFsdWUiLCJwYXJhbXMiLCJzZXRTaG9wSWQiLCJhZGROb3RpY2UiLCJ1c2VOb3RpY2UiLCJoYW5kbGVBcHByb3ZlIiwibWVzc2FnZSIsInR5cGUiLCJyZWNvcmRBY3Rpb24iLCJyZXNvdXJjZUlkIiwiaWQiLCJyZWNvcmRJZCIsImFjdGlvbk5hbWUiLCJwYXJzZUludCIsIm5vdGljZSIsInJlZGlyZWN0VXJsIiwid2luZG93IiwiaHJlZiIsIk1lc3NhZ2VCb3giLCJ2YXJpYW50IiwiTGFiZWwiLCJJbnB1dCIsInZhbHVlIiwibmFtZSIsImRpc2FibGVkIiwicmVxdWlyZWQiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsIm1pbiIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJoaXN0b3J5IiwiYmFjayIsIm1sIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBSUEsTUFBTUEsU0FBUyxHQUFHQSxNQUFNO0lBQ3RCLE1BQU0sQ0FBQ0MsSUFBSSxFQUFFQyxPQUFPLENBQUMsR0FBR0MsY0FBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxNQUFNLENBQUNDLE9BQU8sRUFBRUMsVUFBVSxDQUFDLEdBQUdGLGNBQVEsQ0FBQyxJQUFJLENBQUM7RUFFNUNHLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0VBQ2QsSUFBQSxNQUFNQyxTQUFTLEdBQUcsWUFBWTtRQUM1QixJQUFJO0VBQ0YsUUFBQSxNQUFNQyxHQUFHLEdBQUcsSUFBSUMsaUJBQVMsRUFBRTtFQUMzQixRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNRixHQUFHLENBQUNHLFlBQVksRUFBRTtFQUN6Q0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMseUJBQXlCLEVBQUVILFFBQVEsQ0FBQztVQUNoREUsT0FBTyxDQUFD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
