module.exports = {
    freshdeskAPIKey: process.env.FRESHDESK_API_KEY,
    freshDeskURL : process.env.FRESHDESK_URL,
    mongoDBURL : 'mongodb://'+process.env.MONGO_ATLAS_USER+':'+process.env.MONGO_ATLAS_PASSWORD+'@fepwebcluster-shard-00-00-xqofp.mongodb.net:27017,fepwebcluster-shard-00-01-xqofp.mongodb.net:27017,fepwebcluster-shard-00-02-xqofp.mongodb.net:27017/test?ssl=true&replicaSet=FEPWebCluster-shard-0&authSource=admin',
}