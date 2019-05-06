/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.util;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.eci.arsw.cinema.controllers.ResourceNotFoundException;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.persistence.CinemaException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Response;
import redis.clients.jedis.Transaction;

/**
 *
 * @author 2098325
 */
public class RedisMethods {

    JedisUtil jd;

    public void saveToREDIS(String key, String data) {
        Jedis jedis = JedisUtil.getPool().getResource();
        jedis.watch(key);
        Transaction t1 = jedis.multi();
        t1.set(key, data);
        t1.exec();
        //Operaciones	    

        jedis.close();

    }

    public static String getFromREDIS(String key) {
        boolean intentar = true;
        String content = "";
        while (intentar) {
            Jedis jedis = JedisUtil.getPool().getResource();
            jedis.watch(key);
            Transaction t = jedis.multi();
            Response<String> data = t.get(key);
            List<Object> result = t.exec();
            if (result.size() > 0) {
                intentar = false;
                content = data.get();
                jedis.close();
            }
        }
        return content;
    }

    public static List<List<AtomicBoolean>> buyTicket(int row, int col, String cinema, CinemaFunction cinemaf) throws CinemaException, IOException, ResourceNotFoundException {
        String key = cinema + cinemaf.getDate() + cinemaf.getMovie().getName();
        String json = getFromREDIS(key);
        ObjectMapper mapper = new ObjectMapper();
        try {
            List<List<AtomicBoolean>> obj = mapper.readValue(json, mapper.getTypeFactory().constructCollectionType(ArrayList.class, ArrayList.class));
            cinemaf.setSeats(obj);
            cinemaf.buyTicket(row, col);
            return obj;
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static List<List<AtomicBoolean>> getSeatsREDIS(String cinema, CinemaFunction cinemaf) throws CinemaException {
        String key = cinema + cinemaf.getDate() + cinemaf.getMovie().getName();
        List<List<AtomicBoolean>> obj=null;
        String json = getFromREDIS(key);
        ObjectMapper mapper = new ObjectMapper();
        try {
            obj = mapper.readValue(json, mapper.getTypeFactory().constructCollectionType(ArrayList.class, ArrayList.class));
            return obj;
        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return obj;
    }
}
