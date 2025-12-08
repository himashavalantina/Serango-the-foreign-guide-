const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection string - Update this with your correct credentials
const MONGODB_URI = 'mongodb+srv://himasha:hima123456@cluster0.ko8ohua.mongodb.net/serango?retryWrites=true&w=majority&authMechanism=SCRAM-SHA-256&authSource=admin';

let db;

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db('serango');
        console.log('✅ Connected to MongoDB Atlas');
        return true;
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        return false;
    }
}

// Test MongoDB connection
app.get('/api/test-connection', async (req, res) => {
    try {
        if (!db) {
            const connected = await connectToMongoDB();
            if (!connected) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to connect to MongoDB Atlas',
                    error: 'Authentication failed - please check your credentials'
                });
            }
        }
        
        // Test the connection
        await db.collection('users').findOne({});
        res.json({ 
            success: true, 
            message: 'Successfully connected to MongoDB Atlas!' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'MongoDB connection test failed',
            error: error.message
        });
    }
});

// Get all collections and their counts
app.get('/api/collections', async (req, res) => {
    try {
        if (!db) {
            const connected = await connectToMongoDB();
            if (!connected) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to connect to MongoDB' 
                });
            }
        }
        
        const collections = ['users', 'destinations', 'trips', 'reviews', 'notifications', 'disputes', 'messages'];
        const counts = {};
        
        for (const collection of collections) {
            try {
                counts[collection] = await db.collection(collection).countDocuments();
            } catch (error) {
                counts[collection] = 0;
            }
        }
        
        res.json({ success: true, collections: counts });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to get collection counts',
            error: error.message 
        });
    }
});

// Clear all data
app.post('/api/clear-data', async (req, res) => {
    try {
        if (!db) {
            const connected = await connectToMongoDB();
            if (!connected) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to connect to MongoDB' 
                });
            }
        }
        
        const collections = ['users', 'destinations', 'trips', 'reviews', 'notifications', 'disputes', 'messages'];
        const results = {};
        
        for (const collection of collections) {
            try {
                const result = await db.collection(collection).deleteMany({});
                results[collection] = result.deletedCount;
            } catch (error) {
                results[collection] = 0;
            }
        }
        
        res.json({ 
            success: true, 
            message: 'All data cleared successfully',
            deletedCounts: results 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to clear data',
            error: error.message 
        });
    }
});

// Add sample users
app.post('/api/add-users', async (req, res) => {
    try {
        if (!db) {
            const connected = await connectToMongoDB();
            if (!connected) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to connect to MongoDB' 
                });
            }
        }
        
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const users = [
            {
                email: 'admin@serango.com',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                phone: '+94771234567',
                role: 'ADMIN',
                isActive: true,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                adminProfile: {
                    permissions: ['manage_users', 'manage_destinations', 'manage_disputes'],
                    department: 'Operations'
                }
            },
            {
                email: 'guide1@serango.com',
                password: hashedPassword,
                firstName: 'Saman',
                lastName: 'Perera',
                phone: '+94771234568',
                role: 'GUIDE',
                isActive: true,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                guideProfile: {
                    bio: 'Experienced tour guide specializing in cultural heritage tours',
                    location: 'Colombo, Sri Lanka',
                    languages: ['English', 'Sinhala', 'Tamil'],
                    certifications: ['Tour Guide License', 'First Aid Certified'],
                    specialties: ['Cultural Heritage', 'Wildlife Tours', 'Adventure Tours'],
                    experienceYears: 8,
                    averageRating: 4.8,
                    totalReviews: 45,
                    totalEarnings: 12500.00,
                    isVerified: true,
                    documentUrls: ['https://example.com/license.pdf']
                }
            },
            {
                email: 'tourist1@serango.com',
                password: hashedPassword,
                firstName: 'John',
                lastName: 'Smith',
                phone: '+1234567890',
                role: 'TOURIST',
                isActive: true,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                touristProfile: {
                    bio: 'Travel enthusiast from USA',
                    location: 'New York, USA',
                    interests: ['Culture', 'History', 'Photography'],
                    totalTrips: 3,
                    totalSpent: 2500.00
                }
            }
        ];
        
        const result = await db.collection('users').insertMany(users);
        
        res.json({ 
            success: true, 
            message: `Successfully added ${result.insertedCount} users`,
            insertedCount: result.insertedCount 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add users',
            error: error.message 
        });
    }
});

// Add sample destinations
app.post('/api/add-destinations', async (req, res) => {
    try {
        if (!db) {
            const connected = await connectToMongoDB();
            if (!connected) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to connect to MongoDB' 
                });
            }
        }
        
        const destinations = [
            {
                name: 'Sigiriya Rock Fortress',
                country: 'Sri Lanka',
                description: 'Ancient rock fortress and palace ruins with stunning frescoes and panoramic views',
                images: [
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
                ],
                heroImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
                sustainabilityScore: 85,
                isTrending: true,
                isFeatured: true,
                availableGuides: 12,
                averagePrice: 150.00,
                totalTrips: 45,
                popularActivities: ['Historical Tours', 'Photography', 'Sunset Views'],
                bestTimeToVisit: ['December', 'January', 'February', 'March'],
                climate: 'Tropical',
                currency: 'LKR',
                language: 'Sinhala, Tamil, English',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Yala National Park',
                country: 'Sri Lanka',
                description: 'Premier wildlife sanctuary famous for leopards, elephants, and diverse birdlife',
                images: [
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
                    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'
                ],
                heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200',
                sustainabilityScore: 92,
                isTrending: true,
                isFeatured: true,
                availableGuides: 8,
                averagePrice: 200.00,
                totalTrips: 38,
                popularActivities: ['Wildlife Safari', 'Bird Watching', 'Photography'],
                bestTimeToVisit: ['February', 'March', 'April', 'May'],
                climate: 'Dry Zone',
                currency: 'LKR',
                language: 'Sinhala, English',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        
        const result = await db.collection('destinations').insertMany(destinations);
        
        res.json({ 
            success: true, 
            message: `Successfully added ${result.insertedCount} destinations`,
            insertedCount: result.insertedCount 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add destinations',
            error: error.message 
        });
    }
});

// Serve a simple HTML interface
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>SeranGo Test Data Manager</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; }
            button:hover { background: #0056b3; }
            button:disabled { background: #ccc; cursor: not-allowed; }
            .status { margin: 10px 0; padding: 10px; border-radius: 5px; }
            .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
            .info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
            .credentials { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🏝️ SeranGo Test Data Manager</h1>
            
            <div class="credentials">
                <h3>🔑 Test User Credentials</h3>
                <p><strong>Admin:</strong> admin@serango.com / password123</p>
                <p><strong>Guide:</strong> guide1@serango.com / password123</p>
                <p><strong>Tourist:</strong> tourist1@serango.com / password123</p>
            </div>
            
            <div class="section">
                <h3>🔌 Connection Status</h3>
                <button onclick="testConnection()">Test MongoDB Connection</button>
                <div id="connectionStatus"></div>
            </div>
            
            <div class="section">
                <h3>📊 Database Status</h3>
                <button onclick="getCollections()">Check Collections</button>
                <div id="collectionsStatus"></div>
            </div>
            
            <div class="section">
                <h3>🧹 Clear Data</h3>
                <button onclick="clearData()" style="background: #dc3545;">Clear All Data</button>
                <div id="clearStatus"></div>
            </div>
            
            <div class="section">
                <h3>➕ Add Test Data</h3>
                <button onclick="addUsers()">Add Users</button>
                <button onclick="addDestinations()">Add Destinations</button>
                <div id="addStatus"></div>
            </div>
        </div>
        
        <script>
            async function testConnection() {
                const statusDiv = document.getElementById('connectionStatus');
                statusDiv.innerHTML = '<div class="info">Testing connection...</div>';
                
                try {
                    const response = await fetch('/api/test-connection');
                    const data = await response.json();
                    
                    if (data.success) {
                        statusDiv.innerHTML = '<div class="success">✅ ' + data.message + '</div>';
                    } else {
                        statusDiv.innerHTML = '<div class="error">❌ ' + data.message + '</div>';
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<div class="error">❌ Connection failed: ' + error.message + '</div>';
                }
            }
            
            async function getCollections() {
                const statusDiv = document.getElementById('collectionsStatus');
                statusDiv.innerHTML = '<div class="info">Loading collections...</div>';
                
                try {
                    const response = await fetch('/api/collections');
                    const data = await response.json();
                    
                    if (data.success) {
                        let html = '<div class="success">📊 Collection Counts:</div><ul>';
                        for (const [collection, count] of Object.entries(data.collections)) {
                            html += '<li><strong>' + collection + ':</strong> ' + count + ' documents</li>';
                        }
                        html += '</ul>';
                        statusDiv.innerHTML = html;
                    } else {
                        statusDiv.innerHTML = '<div class="error">❌ ' + data.message + '</div>';
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<div class="error">❌ Failed to get collections: ' + error.message + '</div>';
                }
            }
            
            async function clearData() {
                if (!confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                    return;
                }
                
                const statusDiv = document.getElementById('clearStatus');
                statusDiv.innerHTML = '<div class="info">Clearing data...</div>';
                
                try {
                    const response = await fetch('/api/clear-data', { method: 'POST' });
                    const data = await response.json();
                    
                    if (data.success) {
                        statusDiv.innerHTML = '<div class="success">✅ ' + data.message + '</div>';
                    } else {
                        statusDiv.innerHTML = '<div class="error">❌ ' + data.message + '</div>';
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<div class="error">❌ Failed to clear data: ' + error.message + '</div>';
                }
            }
            
            async function addUsers() {
                const statusDiv = document.getElementById('addStatus');
                statusDiv.innerHTML = '<div class="info">Adding users...</div>';
                
                try {
                    const response = await fetch('/api/add-users', { method: 'POST' });
                    const data = await response.json();
                    
                    if (data.success) {
                        statusDiv.innerHTML = '<div class="success">✅ ' + data.message + '</div>';
                    } else {
                        statusDiv.innerHTML = '<div class="error">❌ ' + data.message + '</div>';
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<div class="error">❌ Failed to add users: ' + error.message + '</div>';
                }
            }
            
            async function addDestinations() {
                const statusDiv = document.getElementById('addStatus');
                statusDiv.innerHTML = '<div class="info">Adding destinations...</div>';
                
                try {
                    const response = await fetch('/api/add-destinations', { method: 'POST' });
                    const data = await response.json();
                    
                    if (data.success) {
                        statusDiv.innerHTML = '<div class="success">✅ ' + data.message + '</div>';
                    } else {
                        statusDiv.innerHTML = '<div class="error">❌ ' + data.message + '</div>';
                    }
                } catch (error) {
                    statusDiv.innerHTML = '<div class="error">❌ Failed to add destinations: ' + error.message + '</div>';
                }
            }
        </script>
    </body>
    </html>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 SeranGo Test Data Manager running on http://localhost:${PORT}`);
    console.log('📝 Use this interface to manage your MongoDB Atlas test data');
});
