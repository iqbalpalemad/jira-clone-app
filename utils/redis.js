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
mongoose.Query.prototype.cache = function(type = "single") {
    this.useCache = true;
    this.expire   = 60;
    this.hashKey  = JSON.stringify(this.mongooseCollection.name);
    if(type == "multiple"){
      this.hashKey = JSON.stringify(this.mongooseCollection.name + "_multiple");
    }
    this.type     = type;
    return this;
}

// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
      return await exec.apply(this, arguments);
    }

    let key_base = "";
    let collection_name = this.mongooseCollection.name;

    if(typeof this.getQuery()._id !== "undefined"){
        key_base = this.getQuery()._id;
    }

    if(typeof this.getQuery().email !== "undefined"){
      key_base = this.getQuery().email;
    }

    if(this.type == "multiple"){
      key_base        = this.getQuery()
      collection_name = collection_name + "_multiple"
    }

  
    let key = JSON.stringify({
      key : key_base,
      collection: collection_name
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

exports.clearRedisHashSet = (hashKey) => {
        hashKey = hashKey + "_multiple"
        console.log("clearing multiple key : " + hashKey)
        client.del(JSON.stringify(hashKey));
}

exports.clearRedisHashKey = (hashKey,id) => {
  let key = JSON.stringify({
      key : id,
      collection: hashKey
  });
  hashKey = JSON.stringify(hashKey)
  console.log("clearing  key from "  + hashKey + "  key : " + key)
  client.hdel(hashKey,key,(err,result) =>{
    console.log(err);
    console.log(result);
  });

}