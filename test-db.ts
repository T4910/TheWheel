import path from 'path';

// Node 20.6+ native env file loading
try {
    process.loadEnvFile(path.resolve(process.cwd(), '.env'));
} catch (e) {
    console.warn("Could not load .env file directly, assuming env vars are set. Error:", e instanceof Error ? e.message : e);
}

async function testConnection() {
    console.log("Testing database connection...");
    
    // Dynamically import connectToDatabase so it runs AFTER loadEnvFile
    const { connectToDatabase } = await import("./database/mongoose");

    try {
        await connectToDatabase();
        console.log("✅ Successfully connected to the database!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Failed to connect to the database:");
        console.error(error);
        process.exit(1);
    }
}

testConnection();
