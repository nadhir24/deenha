const { S3Client } = require('@aws-sdk/client-s3');

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || '9f44eca5c8a6dd7bc48de4203794cf51';
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '46758be9100d321e04ce8e94b942b817';
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '46758be9100d321e04ce8e94b942b817';
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'deenha-bucket';

const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
    maxAttempts: 3,
});

module.exports = { r2Client, R2_BUCKET_NAME };
