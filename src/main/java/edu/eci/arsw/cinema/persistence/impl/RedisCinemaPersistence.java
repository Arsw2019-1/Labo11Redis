/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.persistence.impl;

import edu.eci.arsw.cinema.controllers.ResourceNotFoundException;
import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.model.Movie;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.persistence.CinemaPersitence;
import edu.eci.arsw.cinema.util.RedisMethods;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Component;

/**
 *
 * @author 2098325
 */
@Component("RedisCinemaPersistence")
public class RedisCinemaPersistence implements CinemaPersitence {

    private final Map<String, Cinema> cinemas = new HashMap<>();

    public RedisCinemaPersistence() {

        String functionDate = "2018-12-18 15:30";
        List<CinemaFunction> functions = new ArrayList<>();
        CinemaFunction funct1 = new CinemaFunction(new Movie("SuperHeroes Movie", "Action"), functionDate);
        CinemaFunction funct2 = new CinemaFunction(new Movie("The Night", "Horror"), functionDate);
        functions.add(funct1);
        functions.add(funct2);
        Cinema c = new Cinema("cinemaX", functions);
        cinemas.put("cinemaX", c);

        functions = new ArrayList<>();
        funct1 = new CinemaFunction(new Movie("The Enigma", "Love"), functionDate);
        funct2 = new CinemaFunction(new Movie("SuperHeroes Movie", "Action"), functionDate);
        functions.add(funct1);

        functions.add(funct2);
        c = new Cinema("cinemaY", functions);
        cinemas.put("cinemaY", c);

    }

    @Override
    public void buyTicket(int row, int col, String cinema, String date, String movieName) throws CinemaException {
        try {
            Cinema ci = getCinema(cinema);
            List<CinemaFunction> f = ci.getFunctions();
            for (CinemaFunction cf : f) {
                if (cf.getMovie().getName().equals(movieName)) {
                    if (cf.getDate().equals(date)) {
                        RedisMethods.buyTicket(row, col, cinema, cf);
                        break;
                    }
                }
            }

        } catch (CinemaPersistenceException ex) {
            Logger.getLogger(InMemoryCinemaPersistence.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(RedisCinemaPersistence.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ResourceNotFoundException ex) {
            Logger.getLogger(RedisCinemaPersistence.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    @Override
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date) throws CinemaPersistenceException, CinemaException {
        List<CinemaFunction> result = new ArrayList<>();
        Cinema cine = getCinema(cinema);
        List<CinemaFunction> f = cine.getFunctions();
        for (CinemaFunction cf : f) {
            if (cf.getDate().equals(date)) {
                result.add(cf);
            }
        }
        if (result.isEmpty()) {
            throw new CinemaException("Funciones de cinema vacias");
        }
        return result;
    }

    @Override
    public void saveCinema(Cinema c) throws CinemaPersistenceException {
        if (cinemas.containsKey(c.getName())) {
            throw new CinemaPersistenceException("The given cinema already exists: " + c.getName());
        } else {
            cinemas.put(c.getName(), c);
        }
    }

    @Override
    public Cinema getCinema(String name) throws CinemaPersistenceException {
        return cinemas.get(name);
    }

    public Map<String, Cinema> getCinemas() {
        return cinemas;
    }

    public CinemaFunction getFunctionbyCinemaAndDateAndMovie(String cinema, String date, String Movie)
            throws CinemaPersistenceException, CinemaException {
        CinemaFunction result;
        Cinema cine = getCinema(cinema);
        List<CinemaFunction> f = cine.getFunctions();
        for (CinemaFunction cf : f) {
            if (cf.getDate().equals(date) && cf.getMovie().getName().equals(Movie)) {
                return cf;
            }
        }
        throw new CinemaException("No existe la pelicula con esos argumentos");
    }

    public void addFunctionToCinema(CinemaFunction cf, String cinema) throws CinemaPersistenceException {
        Cinema c = getCinema(cinema);
        //c.addFunction(cf);
    }

    public void updateCinemaFunction(CinemaFunction c, String name) throws CinemaPersistenceException {

        Cinema cine = getCinema(name);
        List<CinemaFunction>g=cine.getFunctions();
        g.add(c);
        cine.setSchedule(g);
    }

    @Override
    public Collection<Cinema> getCinemaValues() throws CinemaPersistenceException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Movie> getListMovies(Cinema cinema, String date, Object factor) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Cinema> getAllCinema() throws CinemaPersistenceException {
        List<Cinema> prueba = new ArrayList<Cinema>();
        Iterator it = cinemas.keySet().iterator();
        while (it.hasNext()) {
            String key = (String) it.next();
            //System.out.println("Clave: " + key + " -> Valor: " + cinemas.get(key));
            prueba.add(cinemas.get(key));
        }
        return prueba;

    }


}
