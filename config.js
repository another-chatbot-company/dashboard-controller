const freshdeskAPIKey = process.env.FRESHDESK_API_KEY;
const freshDeskURL = process.env.FRESHDESK_URL
const mongoDBUser = process.env.MONGO_ATLAS_USER;
const mongoDBPassword = process.env.MONGO_ATLAS_PASSWORD;
const mongoDBURL = 'mongodb://'+mongoDBUser+':'+mongoDBPassword+'@fepwebcluster-shard-00-00-xqofp.mongodb.net:27017,fepwebcluster-shard-00-01-xqofp.mongodb.net:27017,fepwebcluster-shard-00-02-xqofp.mongodb.net:27017/test?ssl=true&replicaSet=FEPWebCluster-shard-0&authSource=admin'
