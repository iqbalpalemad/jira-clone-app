const mongoose = require('mongoose');
const redis    = require('redis');
const util     = require('util');

const client   = redis.createClient({
    host     : "redis-13364.c262.us-east-1-3.ec2.cloud.redislabs.com",
    port     : "13364",
    password : "zGuMkAOg1C7tSqIH4DgzzwRb89JK8MZr"
});

client.on('connect', (err, res) => {
    console.log('redis is connected!');
});

client.on('error', err => {
    console.log(err);
});

client.hget = util.promisify(client.hget);

// create reference for .exec
const exec = mongoose.Query.prototype.exec;

// create new cache function on prototype
mongoose.Query.prototype.cache = function(options = { expire: 60 }) {
    this.useCache = true;
    this.expire = options.expire;
    this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
  
    return this;
}

// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
      return await exec.apply(this, arguments);
    }
  
    const key = JSON.stringify({
      ...this.getQuery(),
      collection: this.mongooseCollection.name
    });
  
    // get cached value from redis
    const cacheValue = await client.hget(this.hashKey, key);
  
    // if cache value is not found, fetch data from mongodb and cache it
    if (!cacheValue) {
      const result = await exec.apply(this, arguments);
      client.hset(this.hashKey, key, JSON.stringify(result));
      client.expire(this.hashKey, this.expire);
  
      console.log('Return data from MongoDB');
      return result;
    }
  
    // return found cachedValue
    const doc = JSON.parse(cacheValue);
    console.log('Return data from Redis');
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
};


module.exports = {
    clearRedisKey(hashKey) {
      client.del(JSON.stringify(hashKey));
    }
  }