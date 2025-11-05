import React, { useState } from 'react';
import { Box, Button, Label, Input, MessageBox } from '@adminjs/design-system';
import { useNotice, ApiClient } from 'adminjs';

const ApproveProduct = (props) => {
  const { record, resource } = props;
  const [pointValue, setPointValue] = useState(record.params.pointValue || 10);
  const [shopId, setShopId] = useState(record.params.shopId || '');
  const [loading, setLoading] = useState(false);
  const addNotice = useNotice();
  const api = new ApiClient();

  const handleApprove = async () => {
    if (!pointValue || pointValue <= 0) {
      addNotice({
        message: 'Please enter a valid point value greater than 0',
        type: 'error',
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
          shopId: shopId || null,
        },
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
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding="xxl">
      <Box marginBottom="xl">
        <MessageBox message="Set the point value for this product and approve it. All users who requested this product will be rewarded." variant="info" />
      </Box>

      <Box marginBottom="xl">
        <Label>Product Name</Label>
        <Input value={record.params.name} disabled />
      </Box>

      <Box marginBottom="xl">
        <Label required>Point Value *</Label>
        <Input
          type="number"
          value={pointValue}
          onChange={(e) => setPointValue(e.target.value)}
          placeholder="Enter point value"
          min="1"
        />
      </Box>

      <Box marginBottom="xl">
        <Label>Shop ID (optional)</Label>
        <Input
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          placeholder="Enter shop UUID or leave empty"
        />
      </Box>

      <Box>
        <Button
          variant="primary"
          onClick={handleApprove}
          disabled={loading}
        >
          {loading ? 'Approving...' : 'Approve Product'}
        </Button>
        <Button
          variant="text"
          onClick={() => window.history.back()}
          ml="default"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ApproveProduct;
