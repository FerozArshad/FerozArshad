const http = require('http');

const port = process.env.PORT || 3000;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Under Maintenance | Feroz Arshad</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0a0a0a;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            background-image: radial-gradient(circle at 50% 0%, #2a2a2a 0%, #0a0a0a 70%);
        }
        .container {
            max-width: 600px;
            padding: 40px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 800;
            letter-spacing: -1px;
        }
        p {
            font-size: 1.2rem;
            color: #a0a0a0;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .loader {
            width: 48px;
            height: 48px;
            border: 3px solid #333;
            border-bottom-color: #fff;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="loader"></span>
        <h1>System Architecture Upgrade</h1>
        <p>We are currently performing deep infrastructural upgrades to our server architecture to ensure maximum performance and stability.</p>
        <p style="font-size: 0.9rem; color: #666;">Will be back online shortly.</p>
    </div>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(503, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
    });
    res.end(html);
});

server.listen(port, () => {
    console.log(`Maintenance server running on port ${port}`);
});
