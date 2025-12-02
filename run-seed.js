const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runSeed() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'SP-Loyality.DB',
  });

  try {
    console.log('Connecting to database...');
    await client.connect();

    console.log('Reading seed file...');
    const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

    console.log('Running seed...');
    await client.query(seedSQL);

    console.log('\n✅ Seed completed successfully!\n');
    console.log('Demo accounts:');
    console.log('  📧 user@demo.com / userdemo (500 points)');
    console.log('  📧 admin@demo.com / userdemo (150 points)');
    console.log('\nAdditional users (all password: userdemo):');
    console.log('  - marko.petrovic@demo.com (320 points)');
    console.log('  - ana.jovanovic@demo.com (275 points)');
    console.log('  - stefan.nikolic@demo.com (180 points)');
    console.log('  - milica.stojanovic@demo.com (95 points)');
    console.log('  - nikola.djordjevic@demo.com (420 points)');
    console.log('  - jovana.ilic@demo.com (55 points)');
    console.log('\n16 shops, 12 rewards, 35+ products seeded!');

  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSeed();
