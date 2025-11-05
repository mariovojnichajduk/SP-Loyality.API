# Receipt Processing Module

This module provides functionality to extract product information from Serbian fiscal receipts (suf.purs.gov.rs).

## API Endpoint

### POST /receipts/process

Processes a Serbian fiscal receipt URL and extracts product information.

#### Request Body

```json
{
  "receiptUrl": "https://suf.purs.gov.rs/v/?vl=A000WEc3V0NTTTRYRzdXQ1M6..."
}
```

#### Response

```json
{
  "products": [
    {
      "product": "Coca Cola 0.5L",
      "quantity": 2,
      "unitPrice": 150.00,
      "totalPrice": 300.00
    },
    {
      "product": "Hleb beli",
      "quantity": 1,
      "unitPrice": 89.99,
      "totalPrice": 89.99
    }
  ],
  "totalAmount": 389.99,
  "receiptDate": "2025-11-05T12:30:00",
  "storeName": "Maxi - Beograd"
}
```

## How It Works

The service uses a two-tier approach to extract receipt data:

1. **API Fetching (Primary)**: First attempts to fetch data from the JSON API endpoint at `https://suf.purs.gov.rs/api/v/`
2. **HTML Scraping (Fallback)**: If the API fails, falls back to HTML scraping of the receipt page

## Implementation Details

### Service Layer (`receipts.service.ts`)

- Validates receipt URLs from suf.purs.gov.rs domain
- Extracts the `vl` parameter from the URL
- Attempts API fetch first, then HTML scraping as fallback
- Supports multiple field name variations (Serbian/English)
- Handles parsing errors gracefully

### Supported Fields

The parser attempts to extract:
- Product names (naziv, name, description, opis, artikal)
- Quantities (kolicina, quantity, qty, amount)
- Unit prices (jedinicnaCena, cena, unitPrice, price)
- Total prices (ukupno, total, iznos, totalPrice)
- Receipt metadata (store name, date, total amount)

## Dependencies

- `axios` - HTTP client for fetching receipt data
- `cheerio` - HTML parsing library for fallback scraping
- `class-validator` - DTO validation
- `@nestjs/swagger` - API documentation

## Example Usage

```bash
curl -X POST http://localhost:3000/receipts/process \
  -H "Content-Type: application/json" \
  -d '{
    "receiptUrl": "https://suf.purs.gov.rs/v/?vl=A000WEc3V0NTTTRYRzdXQ1M6..."
  }'
```

## Error Handling

The endpoint returns appropriate HTTP status codes:

- `200 OK` - Receipt processed successfully
- `400 Bad Request` - Invalid receipt URL or missing parameters
- `404 Not Found` - Receipt not found
- `422 Unprocessable Entity` - Receipt format not supported or no products found
- `502 Bad Gateway` - Failed to fetch receipt data from external service
- `500 Internal Server Error` - Unexpected server error

## Notes

- The actual structure of the receipt data may vary depending on the Serbian tax administration's implementation
- The HTML scraping fallback may need adjustments based on the actual HTML structure
- Consider adding rate limiting to prevent abuse
- For production use, consider caching receipt data to reduce external API calls
