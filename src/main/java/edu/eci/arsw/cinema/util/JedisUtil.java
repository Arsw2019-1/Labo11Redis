package edu.eci.arsw.cinema.util;

import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.ResourceBundle;

public class JedisUtil {
    private  static JedisPool pool;

    static {
        ResourceBundle bundle = ResourceBundle.getBundle("jedis");

        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(Integer.valueOf(bundle
                .getString("redis.pool.maxActive")));
        config.setMaxIdle(Integer.valueOf(bundle
                .getString("redis.pool.maxIdle")));
        config.setMaxWaitMillis(Long.valueOf(bundle.getString("redis.pool.maxWait")));
        config.setTestOnBorrow(Boolean.valueOf(bundle
                .getString("redis.pool.testOnBorrow")));
        config.setTestOnReturn(Boolean.valueOf(bundle
                .getString("redis.pool.testOnReturn")));
        pool = new JedisPool(config, bundle.getString("redis.192.168.56.102"),
                Integer.valueOf(bundle.getString("redis.6379")));
    }

    public static JedisPool getPool(){
        return pool;
    }
    public static void closePool(){
        if(!pool.isClosed()) pool.destroy();
    }
}
